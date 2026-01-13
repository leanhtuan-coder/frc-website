import React, { createContext, useContext, useState, ReactNode, FormEvent } from 'react';

// --- Context ---
interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// --- Modal Component ---
const ModalUI = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Close after showing success for a moment
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-background">
          <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">app_registration</span>
            Đăng ký tham gia
          </h3>
          <button
            onClick={onClose}
            className="size-8 rounded-full flex items-center justify-center text-text-secondary hover:bg-surface-border hover:text-text-main transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
              <div className="size-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Đăng ký thành công!</h4>
              <p className="text-text-secondary">Chúng mình sẽ liên hệ với bạn sớm nhất có thể.</p>
            </div>
          ) : (
            <form id="registration-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-bold text-text-main">Họ và tên</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">person</span>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-border bg-background focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/70 text-text-main"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-bold text-text-main">Email liên hệ</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">mail</span>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-border bg-background focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/70 text-text-main"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="interest" className="text-sm font-bold text-text-main">Lĩnh vực quan tâm</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">category</span>
                  <select
                    id="interest"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-border bg-background focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main appearance-none cursor-pointer"
                  >
                    <option value="technical">Ban Kỹ thuật (Technical)</option>
                    <option value="media">Ban Truyền thông (Media)</option>
                    <option value="logistics">Ban Hậu cần (Logistics)</option>
                    <option value="hr">Ban Nhân sự (HR)</option>
                    <option value="other">Khác</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-bold text-text-main">Lời nhắn (Tùy chọn)</label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Chia sẻ thêm về bản thân bạn..."
                  className="w-full px-4 py-2.5 rounded-lg border border-surface-border bg-background focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/70 text-text-main resize-none"
                ></textarea>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="px-6 py-4 bg-background border-t border-surface-border flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg font-bold text-text-secondary hover:bg-surface-border hover:text-text-main transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              form="registration-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
              {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Provider ---
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      {isOpen && <ModalUI onClose={() => setIsOpen(false)} />}
    </ModalContext.Provider>
  );
};