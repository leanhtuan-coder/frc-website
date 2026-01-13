"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Download, Search, LogOut, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface Submission {
  id: string
  refCode: string
  mode: string
  createdAt: string
  applicants: Array<{
    id: string
    fullName: string
    email: string
    phone: string
    school: string | null
    major: string | null
    studentIdMajor: string | null
    gender: string | null
    facebook: string | null
    reason: string | null
    dob: string
    isLeader: boolean
  }>
  team?: {
    teamName: string
  }
  surveySource: string | null
  preferredDepartment1: string | null
  preferredDepartment2: string | null
  timePerWeek: string | null
  expectations: string | null
  commitmentLevel: number | null
  techExperience: string | null
  techSkills: string | null
  techProjects: string | null
  techExpectations: string | null
  commExperience: string | null
  commSkills: string | null
  commPortfolio: string | null
  commExpectations: string | null
  financeExperience: string | null
  financeSkills: string | null
  financeExpectations: string | null
  eventExperience: string | null
  eventSkills: string | null
  eventExpectations: string | null
  surveySkills: string | null
  surveyTimeSlots: string | null
  notes: string | null
}

interface SubmissionDetail extends Submission {
  applicants: Array<{
    id: string
    fullName: string
    email: string
    phone: string
    school: string | null
    major: string | null
    studentIdMajor: string | null
    gender: string | null
    facebook: string | null
    reason: string | null
    dob: string
    isLeader: boolean
  }>
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetail | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const token = sessionStorage.getItem("admin_token")
    if (token) {
      setIsAuthenticated(true)
      loadSubmissions()
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/admin/list?page=1&pageSize=20", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (response.ok) {
        setIsAuthenticated(true)
        sessionStorage.setItem("admin_token", password)
        loadSubmissions()
        toast({
          title: "Đăng nhập thành công",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Sai mật khẩu",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi đăng nhập",
      })
    }
  }

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem("admin_token")
      const response = await fetch(
        `/api/admin/list?page=${page}&pageSize=20&query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        setTotalPages(data.pagination.totalPages)
      } else {
        if (response.status === 401) {
          setIsAuthenticated(false)
          sessionStorage.removeItem("admin_token")
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi tải dữ liệu",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions()
    }
  }, [page, query, isAuthenticated])

  const handleExport = async () => {
    try {
      const token = sessionStorage.getItem("admin_token")
      const response = await fetch("/api/admin/export", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `dang-ky-${new Date().toISOString().split("T")[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast({
          title: "Xuất file Excel thành công",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi xuất file",
      })
    }
  }

  const handleViewDetail = async (submissionId: string) => {
    setLoadingDetail(true)
    setDetailDialogOpen(true)
    try {
      const token = sessionStorage.getItem("admin_token")
      const response = await fetch(`/api/admin/detail?id=${submissionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSelectedSubmission(data.submission)
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải chi tiết đơn đăng ký",
        })
        setDetailDialogOpen(false)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi tải chi tiết",
      })
      setDetailDialogOpen(false)
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_token")
    setPassword("")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Đăng nhập
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý đăng ký</h1>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, email, mã đăng ký..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="text-center py-8">Đang tải...</div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card 
                key={submission.id} 
                className="p-5 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500 bg-white"
                onClick={() => handleViewDetail(submission.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-xl text-gray-800">
                        Mã: {submission.refCode}
                      </h3>
                      <Eye className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1.5">
                      {new Date(submission.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {submission.applicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="border-l-2 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg"
                    >
                      <p className="font-semibold text-gray-800">{applicant.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1">{applicant.email}</p>
                      <p className="text-sm text-gray-600">{applicant.phone}</p>
                      {applicant.studentIdMajor && (
                        <p className="text-sm text-blue-600 font-medium mt-1">
                          {applicant.studentIdMajor}
                        </p>
                      )}
                      {(applicant.school || applicant.major) && (
                        <p className="text-sm text-gray-500 mt-1">
                          {[applicant.school, applicant.major].filter(Boolean).join(" • ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {submission.surveySource && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="text-blue-500">Nguồn:</span> {submission.surveySource}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl font-bold text-blue-600">
                Chi tiết đơn đăng ký: {selectedSubmission?.refCode}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-2">
                Ngày đăng ký: {selectedSubmission && new Date(selectedSubmission.createdAt).toLocaleString("vi-VN")}
              </DialogDescription>
            </DialogHeader>
            {loadingDetail ? (
              <div className="text-center py-8">Đang tải...</div>
            ) : selectedSubmission ? (
              <div className="space-y-6 mt-4">
                {/* Thông tin người đăng ký */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200 text-gray-800">Thông tin người đăng ký</h3>
                  <div className="space-y-4">
                    {selectedSubmission.applicants.map((applicant, idx) => (
                      <Card key={applicant.id} className="p-5 bg-gray-50 border border-gray-200 shadow-sm">
                        <h4 className="font-semibold mb-4 text-blue-700 flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">
                            {idx + 1}
                          </span>
                          Người đăng ký {idx + 1}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-600 block">Họ và tên:</span>
                            <span className="text-gray-800">{applicant.fullName}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-600 block">Email:</span>
                            <span className="text-gray-800 break-all">{applicant.email}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-600 block">Số điện thoại:</span>
                            <span className="text-gray-800">{applicant.phone}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-600 block">Ngày sinh:</span>
                            <span className="text-gray-800">{new Date(applicant.dob).toLocaleDateString("vi-VN")}</span>
                          </div>
                          {applicant.gender && (
                            <div className="space-y-1">
                              <span className="font-semibold text-gray-600 block">Giới tính:</span>
                              <span className="text-gray-800">{applicant.gender}</span>
                            </div>
                          )}
                          {applicant.studentIdMajor && (
                            <div className="col-span-2 space-y-1">
                              <span className="font-semibold text-gray-600 block">Mã số sinh viên - Chuyên ngành:</span>
                              <span className="text-blue-700 font-medium">{applicant.studentIdMajor}</span>
                            </div>
                          )}
                          {applicant.school && (
                            <div className="space-y-1">
                              <span className="font-semibold text-gray-600 block">Trường:</span>
                              <span className="text-gray-800">{applicant.school}</span>
                            </div>
                          )}
                          {applicant.major && (
                            <div className="space-y-1">
                              <span className="font-semibold text-gray-600 block">Chuyên ngành:</span>
                              <span className="text-gray-800">{applicant.major}</span>
                            </div>
                          )}
                          {applicant.facebook && (
                            <div className="col-span-2 space-y-1">
                              <span className="font-semibold text-gray-600 block">Facebook:</span>
                              <a href={applicant.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all">
                                {applicant.facebook}
                              </a>
                            </div>
                          )}
                          {applicant.reason && (
                            <div className="col-span-2 space-y-1">
                              <span className="font-semibold text-gray-600 block">Lý do tham gia:</span>
                              <p className="mt-2 text-gray-700 bg-white p-3 rounded-lg border border-gray-200">{applicant.reason}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Thông tin chung */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200 text-gray-800">Thông tin chung</h3>
                  <Card className="p-5 bg-gray-50 border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedSubmission.preferredDepartment1 && (
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-600 block">Ban ưu tiên 1:</span>
                          <span className="text-blue-700 font-medium">{selectedSubmission.preferredDepartment1}</span>
                        </div>
                      )}
                      {selectedSubmission.preferredDepartment2 && (
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-600 block">Ban ưu tiên 2:</span>
                          <span className="text-blue-700 font-medium">{selectedSubmission.preferredDepartment2}</span>
                        </div>
                      )}
                      {selectedSubmission.timePerWeek && (
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-600 block">Thời gian/tuần:</span>
                          <span className="text-gray-800">{selectedSubmission.timePerWeek}</span>
                        </div>
                      )}
                      {selectedSubmission.commitmentLevel !== null && selectedSubmission.commitmentLevel !== undefined && (
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-600 block">Mức độ cam kết:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{selectedSubmission.commitmentLevel}/5</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    i < selectedSubmission.commitmentLevel!
                                      ? "bg-yellow-400"
                                      : "bg-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedSubmission.expectations && (
                        <div className="col-span-2 space-y-1">
                          <span className="font-semibold text-gray-600 block">Mong muốn:</span>
                          <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-gray-200">{selectedSubmission.expectations}</p>
                        </div>
                      )}
                      {selectedSubmission.surveySource && (
                        <div className="col-span-2 space-y-1">
                          <span className="font-semibold text-gray-600 block">Nguồn:</span>
                          <span className="text-gray-800">{selectedSubmission.surveySource}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Ban chuyên môn */}
                {(selectedSubmission.techExperience || selectedSubmission.techSkills || selectedSubmission.techProjects || selectedSubmission.techExpectations) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 pb-2 border-b border-blue-300 text-blue-700">
                      Ban chuyên môn
                    </h3>
                    <Card className="p-5 bg-blue-50 border border-blue-200 shadow-sm">
                      <div className="space-y-4 text-sm">
                        {selectedSubmission.techExperience && (
                          <div>
                            <span className="font-semibold text-blue-700">Kinh nghiệm:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-blue-100">{selectedSubmission.techExperience}</p>
                          </div>
                        )}
                        {selectedSubmission.techSkills && (
                          <div>
                            <span className="font-semibold text-blue-700">Kỹ năng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-blue-100">{selectedSubmission.techSkills}</p>
                          </div>
                        )}
                        {selectedSubmission.techProjects && (
                          <div>
                            <span className="font-semibold text-blue-700">Dự án:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-blue-100">{selectedSubmission.techProjects}</p>
                          </div>
                        )}
                        {selectedSubmission.techExpectations && (
                          <div>
                            <span className="font-semibold text-blue-700">Kỳ vọng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-blue-100">{selectedSubmission.techExpectations}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Ban Truyền thông */}
                {(selectedSubmission.commExperience || selectedSubmission.commSkills || selectedSubmission.commPortfolio || selectedSubmission.commExpectations) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 pb-2 border-b border-green-300 text-green-700">
                      Ban Truyền thông
                    </h3>
                    <Card className="p-5 bg-green-50 border border-green-200 shadow-sm">
                      <div className="space-y-4 text-sm">
                        {selectedSubmission.commExperience && (
                          <div>
                            <span className="font-semibold text-green-700">Kinh nghiệm:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-green-100">{selectedSubmission.commExperience}</p>
                          </div>
                        )}
                        {selectedSubmission.commSkills && (
                          <div>
                            <span className="font-semibold text-green-700">Kỹ năng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-green-100">{selectedSubmission.commSkills}</p>
                          </div>
                        )}
                        {selectedSubmission.commPortfolio && (
                          <div>
                            <span className="font-semibold text-green-700">Portfolio:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-green-100">{selectedSubmission.commPortfolio}</p>
                          </div>
                        )}
                        {selectedSubmission.commExpectations && (
                          <div>
                            <span className="font-semibold text-green-700">Kỳ vọng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-green-100">{selectedSubmission.commExpectations}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Ban Tài chính */}
                {(selectedSubmission.financeExperience || selectedSubmission.financeSkills || selectedSubmission.financeExpectations) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 pb-2 border-b border-amber-300 text-amber-700">
                      Ban Tài chính - Đối ngoại
                    </h3>
                    <Card className="p-5 bg-amber-50 border border-amber-200 shadow-sm">
                      <div className="space-y-4 text-sm">
                        {selectedSubmission.financeExperience && (
                          <div>
                            <span className="font-semibold text-amber-700">Kinh nghiệm:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-amber-100">{selectedSubmission.financeExperience}</p>
                          </div>
                        )}
                        {selectedSubmission.financeSkills && (
                          <div>
                            <span className="font-semibold text-amber-700">Kỹ năng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-amber-100">{selectedSubmission.financeSkills}</p>
                          </div>
                        )}
                        {selectedSubmission.financeExpectations && (
                          <div>
                            <span className="font-semibold text-amber-700">Kỳ vọng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-amber-100">{selectedSubmission.financeExpectations}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Ban Văn hóa - Sự kiện */}
                {(selectedSubmission.eventExperience || selectedSubmission.eventSkills || selectedSubmission.eventExpectations) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 pb-2 border-b border-purple-300 text-purple-700">
                      Ban Văn hóa - Sự kiện
                    </h3>
                    <Card className="p-5 bg-purple-50 border border-purple-200 shadow-sm">
                      <div className="space-y-4 text-sm">
                        {selectedSubmission.eventExperience && (
                          <div>
                            <span className="font-semibold text-purple-700">Kinh nghiệm:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-purple-100">{selectedSubmission.eventExperience}</p>
                          </div>
                        )}
                        {selectedSubmission.eventSkills && (
                          <div>
                            <span className="font-semibold text-purple-700">Kỹ năng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-purple-100">{selectedSubmission.eventSkills}</p>
                          </div>
                        )}
                        {selectedSubmission.eventExpectations && (
                          <div>
                            <span className="font-semibold text-purple-700">Kỳ vọng:</span>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-purple-100">{selectedSubmission.eventExpectations}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Thông tin bổ sung (legacy) */}
                {(selectedSubmission.surveySkills || selectedSubmission.surveyTimeSlots || selectedSubmission.notes) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 border-b pb-2">Thông tin bổ sung</h3>
                    <Card className="p-4">
                      <div className="space-y-3 text-sm">
                        {selectedSubmission.surveySkills && (
                          <div>
                            <span className="font-medium">Kỹ năng (cũ):</span>
                            <p className="mt-1 text-gray-700">
                              {(() => {
                                try {
                                  const parsed = JSON.parse(selectedSubmission.surveySkills)
                                  return Array.isArray(parsed) ? parsed.join(", ") : selectedSubmission.surveySkills
                                } catch {
                                  return selectedSubmission.surveySkills
                                }
                              })()}
                            </p>
                          </div>
                        )}
                        {selectedSubmission.surveyTimeSlots && (
                          <div>
                            <span className="font-medium">Thời gian (cũ):</span>
                            <p className="mt-1 text-gray-700">
                              {(() => {
                                try {
                                  const parsed = JSON.parse(selectedSubmission.surveyTimeSlots)
                                  return Array.isArray(parsed) ? parsed.join(", ") : selectedSubmission.surveyTimeSlots
                                } catch {
                                  return selectedSubmission.surveyTimeSlots
                                }
                              })()}
                            </p>
                          </div>
                        )}
                        {selectedSubmission.notes && (
                          <div>
                            <span className="font-medium">Ghi chú:</span>
                            <p className="mt-1 text-gray-700 whitespace-pre-wrap">{selectedSubmission.notes}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ) : null}
          </DialogContent>
        </Dialog>

        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Trước
          </Button>
          <span className="flex items-center px-4">
            Trang {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  )
}

