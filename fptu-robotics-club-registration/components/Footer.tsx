import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-border bg-white text-text-main mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-xl font-bold text-text-main">FPTU Robotics Club</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            FPTU Robotics Club - FRC là câu lạc bộ Robotics của Trường Đại học FPT có mặt tại bốn cơ sở Hà Nội, Đà Nẵng, Quy Nhơn và Cần Thơ.
          </p>
          <div className="flex gap-4 mt-2">
            {['public', 'mail', 'smart_display'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="size-10 rounded-full bg-background border border-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-text-main font-bold mb-4">Liên kết</h4>
          <ul className="flex flex-col gap-2">
            {['Trang chủ', 'Về chúng tôi', 'Tuyển thành viên', 'Liên hệ'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-text-secondary text-sm hover:text-primary transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
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

      {/* Copyright */}
      <div className="w-full border-t border-surface-border bg-background py-6 text-center">
        <p className="text-text-secondary text-xs">© 2024 FPTU Robotics Club. All rights reserved.</p>
      </div>
    </footer>
  );
};
