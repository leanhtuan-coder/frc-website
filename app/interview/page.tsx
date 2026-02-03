"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, User, Mail, Phone, CheckCircle2, ChevronRight, AlertCircle, Loader2, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface Slot {
    id: string
    startTime: string
    endTime: string
    capacity: number
    _count: {
        registrations: number
    }
}

export const dynamic = "force-static"

export default function InterviewSelectionPage() {
    const [slots, setSlots] = useState<Slot[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        fetchSlots()
    }, [])

    const fetchSlots = async () => {
        try {
            const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
            console.log("Script URL:", scriptUrl ? "Configured" : "MISSING");

            if (!scriptUrl) {
                console.error('Google Script URL not configured');
                toast({
                    title: "Lỗi cấu hình",
                    description: "Chưa cấu hình URL của Google Script. Vui lòng kiểm tra lại environment variables.",
                    variant: "destructive"
                });
                setSlots([]);
                return;
            }

            const response = await fetch(`${scriptUrl}?action=getSlots`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log("Fetched slots:", data.slots?.length || 0);

            if (data.error) {
                throw new Error(data.error);
            }

            setSlots(data.slots || []);
        } catch (error: any) {
            console.error("Fetch slots error:", error);
            toast({
                title: "Lỗi tải dữ liệu",
                description: error.message || "Không thể lấy danh sách lịch phỏng vấn",
                variant: "destructive"
            });
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSlot) {
            toast({
                title: "Chưa chọn lịch",
                description: "Vui lòng chọn một khung giờ phỏng vấn",
                variant: "destructive"
            })
            return
        }

        setSubmitting(true);
        try {
            const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            // Dùng GET để tránh lỗi CORS khi POST tới Google Apps Script từ browser
            const params = new URLSearchParams({
                action: 'registerInterview',
                slotId: selectedSlot,
                ...formData
            });

            const response = await fetch(`${scriptUrl}?${params.toString()}`, {
                method: 'GET',
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error('Đăng ký thất bại');
            }

            const result = await response.json();
            if (result.error) {
                throw new Error(result.error);
            }

            setIsSuccess(true);
        } catch (error: any) {
            toast({
                title: "Lỗi đăng ký",
                description: error.message || "Đã xảy ra lỗi, vui lòng thử lại sau",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    }

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })
    }

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <GlassCard className="max-w-md w-full text-center py-12 px-8">
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="w-20 h-20 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Đăng ký thành công!</h1>
                    <p className="text-gray-600 mb-2">
                        Lịch phỏng vấn của bạn đã được ghi nhận.
                    </p>
                    <p className="text-blue-600 font-semibold mb-6">
                        Địa điểm: Phòng EP - 514, Tòa Epsilon, ĐH FPT Hà Nội
                    </p>
                    <p className="text-slate-500 text-sm mb-8">
                        Chúng mình đã gửi một email xác nhận kèm thông tin chi tiết đến bạn.
                    </p>
                    <Button
                        className="w-full bg-slate-900 hover:bg-slate-800"
                        onClick={() => window.location.reload()}
                    >
                        OK
                    </Button>
                </GlassCard>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-slate-50/50">
            {/* Simple Logo Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <img
                        src="/logo.png"
                        alt="FRC Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <span className="font-bold text-xl text-slate-900">
                        FPTU Robotics Club
                    </span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 uppercase tracking-tight">
                        Chọn lịch phỏng vấn
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-2">
                        Chúc mừng bạn đã vượt qua vòng đơn! Vui lòng chọn một khung giờ phù hợp để chúng mình có thể gặp nhau nhé.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                        <MapPin className="w-4 h-4" />
                        <span>Địa điểm: Phòng EP - 514, Tòa Epsilon, ĐH FPT Hà Nội</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Các khung giờ còn trống
                        </h2>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                <p>Đang tải danh sách...</p>
                            </div>
                        ) : slots.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">Hiện chưa có lịch phỏng vấn nào được mở.</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {slots.map((slot) => {
                                    const isFull = slot._count.registrations >= slot.capacity
                                    const isSelected = selectedSlot === slot.id

                                    return (
                                        <button
                                            key={slot.id}
                                            disabled={isFull}
                                            onClick={() => setSelectedSlot(slot.id)}
                                            className={cn(
                                                "relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group",
                                                isSelected
                                                    ? "border-blue-500 bg-blue-50 shadow-lg"
                                                    : isFull
                                                        ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                                                        : "border-white bg-white hover:border-blue-200 hover:shadow-md"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={cn(
                                                    "text-xs font-bold uppercase tracking-wider",
                                                    isSelected ? "text-blue-600" : "text-blue-500"
                                                )}>
                                                    {formatDate(slot.startTime)}
                                                </span>
                                                {isFull && (
                                                    <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                                                        FULL
                                                    </span>
                                                )}
                                            </div>
                                            <div className={cn(
                                                "text-xl font-bold mb-3",
                                                isSelected ? "text-blue-900" : "text-slate-800"
                                            )}>
                                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                            </div>
                                            <div className="flex items-center text-sm text-slate-500">
                                                <User className="w-3.5 h-3.5 mr-1.5" />
                                                Còn {slot.capacity - slot._count.registrations} / {slot.capacity} chỗ
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <GlassCard className="lg:sticky lg:top-24 border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                Thông tin cá nhân
                            </h2>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và tên</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="fullName"
                                            required
                                            placeholder="Nguyễn Văn A"
                                            className="pl-10 h-11"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="candidate@example.com"
                                            className="pl-10 h-11"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="phone"
                                            required
                                            placeholder="0123456789"
                                            className="pl-10 h-11"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={submitting || !selectedSlot}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl group transition-all"
                                    >
                                        {submitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        ) : (
                                            <>
                                                Xác nhận chọn lịch
                                                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
