import React, { useState } from 'react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'Trang chủ', href: '#' },
  { label: 'Giới thiệu', href: '#' },
  { label: 'Ban chủ nhiệm', href: '#' },
  { label: 'Hoạt động', href: '#' },
  { label: 'Thành tích', href: '#' },
  { label: 'Liên hệ', href: '#' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-surface/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined !text-[32px]">smart_toy</span>
          </div>
          <h2 className="text-primary text-lg font-bold tracking-tight">FPTU Robotics Club</h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.label === 'Trang chủ' 
                  ? 'text-text-main font-semibold hover:text-primary' 
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:flex items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
          <span className="truncate">Đăng ký tham gia</span>
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-main p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface px-6 py-4 shadow-lg absolute w-full left-0 top-18 flex flex-col gap-4">
           <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-secondary font-medium hover:text-primary transition-colors text-base py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <hr className="border-surface-border" />
           <button className="flex w-full items-center justify-center rounded-full h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            <span className="truncate">Đăng ký tham gia</span>
          </button>
        </div>
      )}
    </header>
  );
};
