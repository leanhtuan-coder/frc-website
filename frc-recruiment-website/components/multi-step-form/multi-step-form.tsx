"use client"

import { useState, useEffect, useMemo, useCallback, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dynamic from "next/dynamic"
import { FormProgress } from "./progress"
import { individualFormSchema, teamFormSchema, type IndividualFormData, type TeamFormData } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Lazy load step components for better performance
const Step1Individual = dynamic(() => import("./step-1-individual").then(mod => ({ default: mod.Step1Individual })), { ssr: false })
const Step1Team = dynamic(() => import("./step-1-team").then(mod => ({ default: mod.Step1Team })), { ssr: false })
const Step2Department = dynamic(() => import("./step-2-department").then(mod => ({ default: mod.Step2Department })), { ssr: false })
const Step3Department = dynamic(() => import("./step-3-department").then(mod => ({ default: mod.Step3Department })), { ssr: false })
const Step2 = dynamic(() => import("./step-2").then(mod => ({ default: mod.Step2 })), { ssr: false })
const Step3 = dynamic(() => import("./step-3").then(mod => ({ default: mod.Step3 })), { ssr: false })

interface MultiStepFormProps {
  onSuccess?: () => void
}

export function MultiStepForm({ onSuccess }: MultiStepFormProps = {}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [refCode, setRefCode] = useState<string>("")
  const [teamMode, setTeamMode] = useState(false)
  const [isLoadingConfig, setIsLoadingConfig] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch config only once
  useEffect(() => {
    let isMounted = true
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setTeamMode(data.teamMode || false)
          setIsLoadingConfig(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setTeamMode(false)
          setIsLoadingConfig(false)
        }
      })
    
    return () => {
      isMounted = false
    }
  }, [])

  // Create form instances - always create both for consistency
  const individualForm = useForm<IndividualFormData>({
    resolver: zodResolver(individualFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      mode: "INDIVIDUAL",
      consentTruth: false,
      consentRules: false,
      consentData: false,
      commitmentLevel: 3,
    },
  })

  const teamForm = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      mode: "TEAM",
      consentTruth: false,
      consentRules: false,
      consentData: false,
      surveySkills: [],
      surveyTimeSlots: [],
    },
  })

  // Memoize which form to use
  const form = useMemo(() => {
    return teamMode ? teamForm : individualForm
  }, [teamMode, teamForm, individualForm])

  // Memoize validation fields for each step
  const stepValidationFields = useMemo(() => {
    if (teamMode) {
      return {
        1: ["teamName", "member1.fullName", "member1.dob", "member1.email", "member1.phone", "member1.school", "member1.major", "member2.fullName", "member2.dob", "member2.email", "member2.phone", "member2.school", "member2.major"] as any,
        2: [] as any,
        3: [] as any,
        4: ["consentTruth", "consentRules", "consentData"] as any,
      }
    } else {
      return {
        1: ["fullName", "email", "gender", "phone", "dob", "studentIdMajor", "surveySource", "reason", "timePerWeek", "expectations", "commitmentLevel"] as any,
        2: ["preferredDepartment1"] as any,
        3: [] as any,
        4: ["consentTruth", "consentRules", "consentData"] as any,
      }
    }
  }, [teamMode])

  const nextStep = useCallback(async () => {
    const fieldsToValidate = stepValidationFields[currentStep as keyof typeof stepValidationFields]
    
    let isValid = true
    if (fieldsToValidate.length > 0) {
      isValid = await form.trigger(fieldsToValidate)
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
      })
    }
  }, [currentStep, form, stepValidationFields, toast])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Add captcha token before submit
  useEffect(() => {
    if (currentStep === 4 && !isLoadingConfig) {
      if (teamMode) {
        const currentToken = teamForm.getValues("captchaToken" as any)
        if (!currentToken) {
          teamForm.setValue("captchaToken" as any, "dev-bypass")
        }
      } else {
        const currentToken = individualForm.getValues("captchaToken" as any)
        if (!currentToken) {
          individualForm.setValue("captchaToken" as any, "dev-bypass")
        }
      }
    }
  }, [currentStep, teamMode, individualForm, teamForm, isLoadingConfig])

  const onSubmit = async (data: IndividualFormData | TeamFormData) => {
    setIsSubmitting(true)

    try {
      if (currentStep !== 4) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Vui lòng hoàn thành tất cả các bước",
        })
        setIsSubmitting(false)
        return
      }

      const allFieldsValid = await form.trigger()
      if (!allFieldsValid) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Vui lòng điền đầy đủ tất cả thông tin bắt buộc",
        })
        setIsSubmitting(false)
        return
      }

      if (!data.captchaToken) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Vui lòng hoàn thành xác minh",
        })
        setIsSubmitting(false)
        return
      }

      console.log("📤 Submitting form...")
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      let response
      try {
        console.log("📡 Sending request to /api/register...")
        response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        console.log("📥 Response received:", response.status, response.statusText)
      } catch (error: any) {
        clearTimeout(timeoutId)
        console.error("❌ Fetch error:", error)
        if (error.name === 'AbortError') {
          throw new Error("Request timeout. Vui lòng thử lại.")
        }
        throw new Error(`Lỗi kết nối: ${error.message || "Không thể kết nối đến server"}`)
      }

      let result
      try {
        result = await response.json()
        console.log("✅ Response parsed:", result)
      } catch (e) {
        console.error("❌ Failed to parse response:", e)
        const text = await response.text()
        console.error("Response text:", text)
        throw new Error("Không thể đọc phản hồi từ server")
      }

      if (!response.ok) {
        console.error("❌ API returned error:", response.status, result)
        throw new Error(result.error || `Đã xảy ra lỗi khi đăng ký (${response.status})`)
      }

      if (!result.refCode) {
        console.error("❌ No refCode in response:", result)
        throw new Error("Không nhận được mã đăng ký từ server")
      }

      console.log("✅ Registration successful, refCode:", result.refCode)
      
      setRefCode(result.refCode)
      setIsSuccess(true)
      setIsSubmitting(false)
    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.",
      })
      setIsSubmitting(false)
    }
  }

  // All hooks must be called before any conditional returns
  // Show loading while determining form type
  if (isLoadingConfig) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải form...</p>
        </div>
      </div>
    )
  }

  // Show success screen if submission was successful
  if (isSuccess) {
    const clubName = process.env.NEXT_PUBLIC_CLUB_NAME || "FPTU Robotics Club (FRC)"
    return (
      <div className="bg-transparent py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đăng ký thành công!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Cảm ơn bạn đã đăng ký tham gia <strong>{clubName}</strong>!
          </p>
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Mã đăng ký của bạn:</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{refCode}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-base text-gray-700 mb-2">
              <strong>Đơn đăng ký của bạn đã được gửi thành công!</strong>
            </p>
            <p className="text-sm text-gray-600">
              Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn. Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất. Vui lòng kiểm tra email và giữ mã đăng ký này để tra cứu sau.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                Về trang chủ
              </Button>
            </Link>
            {onSuccess && (
              <Button
                variant="outline"
                onClick={() => {
                  onSuccess()
                }}
                className="w-full sm:w-auto"
              >
                Đóng
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-transparent">
      <FormProgress currentStep={currentStep} />

      {teamMode ? (
        <Form {...teamForm}>
          <form onSubmit={teamForm.handleSubmit(onSubmit)} className="space-y-6">
            <div className="transition-opacity duration-300">
              {currentStep === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 1: THÔNG TIN ĐỘI THI
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step1Team form={teamForm} />
                  </Suspense>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 2: CAM KẾT
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step2 form={teamForm as any} />
                  </Suspense>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 3: KHẢO SÁT
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step3 form={teamForm as any} />
                  </Suspense>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 4: XÁC NHẬN
                  </h2>
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Vui lòng kiểm tra lại thông tin và hoàn thành xác minh</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Trước
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Sau
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      ) : (
        <Form {...individualForm}>
          <form onSubmit={individualForm.handleSubmit(onSubmit)} className="space-y-6">
            <div className="transition-opacity duration-300">
              {currentStep === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 1: THÔNG TIN CHUNG
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step1Individual form={individualForm} />
                  </Suspense>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 2: CHỌN BAN ỨNG TUYỂN
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step2Department form={individualForm} />
                  </Suspense>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 3: CÂU HỎI THEO BAN
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step3Department form={individualForm} />
                  </Suspense>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    PHẦN 4: CAM KẾT
                  </h2>
                  <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
                    <Step2 form={individualForm as any} />
                  </Suspense>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Trước
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Sau
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
