import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from './RegistrationModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined !text-[32px]">smart_toy</span>
          </div>
          <h2 className="text-primary text-lg font-bold tracking-tight">FPTU Robotics Club</h2>
        </Link>
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          <Link to="/" className="text-text-main text-sm font-semibold hover:text-primary transition-colors">Trang chủ</Link>
          <a href="#about" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Giới thiệu</a>
          <a href="#board" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Ban chủ nhiệm</a>
          <a href="#activities" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Hoạt động</a>
          <a href="#achievements" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Thành tích</a>
          <a href="#contact" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Liên hệ</a>
        </nav>
        <button 
          onClick={openModal}
          className="hidden md:flex items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          <span className="truncate">Đăng ký tham gia</span>
        </button>
        <button 
          className="md:hidden text-text-main"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-18 left-0 w-full bg-surface border-b border-surface-border p-4 shadow-lg flex flex-col gap-4">
          <Link to="/" className="text-text-main font-semibold" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
          <a href="#" className="text-text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>Giới thiệu</a>
          <a href="#" className="text-text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>Hoạt động</a>
          <a href="#" className="text-text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              openModal();
            }}
            className="w-full rounded-full h-10 bg-primary text-white font-bold"
          >
            Đăng ký tham gia
          </button>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-surface-border bg-white text-text-main">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-xl font-bold text-text-main">FPTU Robotics Club</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            Câu lạc bộ Robotics trực thuộc Đại học FPT. Nơi ươm mầm tài năng công nghệ trẻ, thúc đẩy phong trào nghiên cứu và chế tạo robot.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="size-10 rounded-full bg-background border border-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a href="#" className="size-10 rounded-full bg-background border border-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
            <a href="#" className="size-10 rounded-full bg-background border border-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">smart_display</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-text-main font-bold mb-4">Liên kết</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="text-text-secondary text-sm hover:text-primary transition-colors">Trang chủ</Link></li>
            <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Về chúng tôi</a></li>
            <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Tuyển thành viên</a></li>
            <li><Link to="/terms-privacy" className="text-text-secondary text-sm hover:text-primary transition-colors">Điều khoản & Bảo mật</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-text-main font-bold mb-4">Liên hệ</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-3 text-text-secondary text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span>Đại học FPT, Khu CNC Hòa Lạc, Thạch Thất, Hà Nội</span>
            </li>
            <li className="flex gap-3 text-text-secondary text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">email</span>
              <span>robotics.club@fpt.edu.vn</span>
            </li>
            <li className="flex gap-3 text-text-secondary text-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">call</span>
              <span>0987 654 321</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full border-t border-surface-border bg-background py-6 text-center">
        <p className="text-text-secondary text-xs flex flex-col md:flex-row gap-2 items-center justify-center">
          <span>© 2024 FPTU Robotics Club. All rights reserved.</span>
          <span className="hidden md:block text-surface-border mx-2">|</span>
          <Link to="/terms-privacy" className="hover:text-primary transition-colors">Chính sách bảo mật & Điều khoản</Link>
        </p>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center w-full grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;