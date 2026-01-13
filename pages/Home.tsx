import React from 'react';
import { Link } from 'react-router-dom';
import { BOARD_MEMBERS, NEWS_ITEMS, ACHIEVEMENTS, ACTIVITIES, PARTNERS } from '../constants';

const Hero = () => (
  <section className="w-full max-w-[1200px] px-4 md:px-6 pt-8 pb-12">
    <div className="relative w-full overflow-hidden rounded-xl bg-surface border border-surface-border shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(10, 99, 207, 0.85), rgba(5, 9, 20, 0.7)), url('/assets/hero-bg.jpg')" }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Season 2026 Recruiting
        </div>
        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl">
          FPTU Robotics Club
        </h1>
        <p className="text-blue-50 text-base md:text-lg max-w-2xl font-light">
          Nơi đam mê công nghệ tỏa sáng, hướng tới sự chuyên nghiệp và học thuật đỉnh cao. Khám phá tiềm năng, kiến tạo tương lai.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="h-12 px-8 rounded-full bg-white text-primary font-bold text-base hover:bg-blue-50 transition-colors shadow-lg">
            Tìm hiểu thêm
          </button>
          <button className="h-12 px-8 rounded-full bg-transparent border border-white/30 text-white font-bold text-base hover:bg-white/10 transition-colors">
            Liên hệ chúng tôi
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Introduction = () => (
  <section id="about" className="w-full max-w-[900px] px-6 py-12 flex flex-col items-center text-center">
    <h2 className="text-primary text-2xl md:text-3xl font-bold mb-6">GIỚI THIỆU CHUNG</h2>
    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
      Câu lạc bộ Robotics Trường Đại học FPT (FRC) là môi trường kết nối những sinh viên đam mê kỹ thuật, lập trình và chế tạo robot. Chúng tôi đề cao tinh thần học hỏi, sáng tạo và làm việc nhóm để chinh phục các thử thách công nghệ. Tại FRC, mỗi thành viên đều là một mảnh ghép quan trọng trong bức tranh công nghệ toàn cầu.
    </p>
  </section>
);

const CoreValues = () => (
  <section className="w-full max-w-[1200px] px-6 py-12">
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <h2 className="text-text-main text-3xl font-bold">NỀN TẢNG CÂU LẠC BỘ</h2>
        <span className="hidden md:block w-32 h-[1px] bg-surface-border mb-2"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: 'verified', title: 'Chuyên nghiệp', desc: 'Quy trình làm việc bài bản, kỷ luật cao, hướng tới chuẩn mực quốc tế.' },
          { icon: 'school', title: 'Học thuật', desc: 'Nghiên cứu chuyên sâu, kiến thức vững vàng, chia sẻ và cùng phát triển.' },
          { icon: 'memory', title: 'Công nghệ', desc: 'Cập nhật xu hướng công nghệ mới nhất, ứng dụng IoT và AI vào thực tiễn.' },
          { icon: 'lightbulb', title: 'Sáng tạo', desc: 'Không ngừng đổi mới tư duy, tìm kiếm giải pháp đột phá cho vấn đề.' }
        ].map((item, idx) => (
          <div key={idx} className="group flex flex-col p-6 rounded-lg bg-surface border border-surface-border hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <h3 className="text-text-main text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BoardMembers = () => {
  const [selectedCampus, setSelectedCampus] = React.useState('hanoi');

  const campuses = [
    { id: 'hanoi', label: 'Hà Nội' },
    { id: 'danang', label: 'Đà Nẵng' },
    { id: 'quynhon', label: 'Quy Nhơn' },
    { id: 'cantho', label: 'Cần Thơ' }
  ];

  return (
    <section id="board" className="w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-text-main text-3xl font-bold mb-3">BAN CHỦ NHIỆM</h2>
          <p className="text-text-secondary">Những người dẫn dắt con thuyền FRC tại các cơ sở</p>
        </div>

        {/* Campus Tabs */}
        <div className="flex flex-wrap justify-center gap-3 p-1 bg-white border border-surface-border rounded-full shadow-sm">
          {campuses.map((campus) => (
            <button
              key={campus.id}
              onClick={() => setSelectedCampus(campus.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCampus === campus.id
                ? 'bg-primary text-white shadow-md'
                : 'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
            >
              {campus.label}
            </button>
          ))}
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BOARD_MEMBERS.filter(member => member.campus === selectedCampus).map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border hover:border-primary/50 hover:shadow-md transition-all"
            >
              <img
                className="size-16 rounded-full object-cover border-2 border-primary/20"
                src={member.image}
                alt={member.name}
              />
              <div>
                <h4 className="text-text-main font-bold">{member.name}</h4>
                <p className="text-primary text-sm font-medium">{member.role}</p>
                <p className="text-text-secondary text-xs mt-1">{member.major}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Activities = () => (
  <section id="activities" className="w-full max-w-[1200px] px-6 py-12 bg-white rounded-xl border border-surface-border shadow-sm my-8">
    <h2 className="text-primary text-3xl font-bold mb-10 text-center">Chúng mình làm gì?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      {ACTIVITIES.map((activity, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-primary">{activity.icon}</span>
            <h3 className="text-text-main text-lg font-bold">{activity.title}</h3>
          </div>
          <p className="text-text-secondary text-sm">{activity.description}</p>
        </div>
      ))}
    </div>
  </section>
);


const Achievements = () => (
  <section id="achievements" className="w-full max-w-[1200px] px-6 py-12">
    <h2 className="text-text-main text-3xl font-bold mb-10 text-center">THÀNH TÍCH NỔI BẬT</h2>
    <div className="relative flex flex-col gap-6">
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-surface-border md:left-1/2 md:-ml-[1px]"></div>

      {ACHIEVEMENTS.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div key={item.id} className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Desktop Left Side */}
            <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:text-right md:pr-12' : 'pl-12 order-3'}`}>
              {isLeft ? (
                <>
                  <span className="text-primary font-bold text-sm">{item.date}</span>
                  <h3 className="text-text-main text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm mt-2">{item.description}</p>
                </>
              ) : (
                <div className="h-24 w-40 bg-surface rounded-lg border border-surface-border overflow-hidden shadow-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Marker */}
            <div className={`absolute left-4 w-6 h-6 rounded-full border-4 border-white ${isLeft ? 'bg-primary shadow-md' : 'bg-surface-border'} z-10 md:left-1/2 md:-ml-3`}></div>

            {/* Mobile Content (Always Right of Line) */}
            <div className="pl-16 md:hidden">
              <span className="text-primary font-bold text-sm">{item.date}</span>
              <h3 className="text-text-main text-xl font-bold mt-1">{item.title}</h3>
              <p className="text-text-secondary text-sm mt-2">{item.description}</p>
            </div>

            {/* Desktop Right Side */}
            <div className={`hidden md:block md:w-1/2 ${isLeft ? 'pl-12' : 'md:text-left md:pr-12 order-1 text-right'}`}>
              {isLeft ? (
                <div className="h-24 w-40 bg-surface rounded-lg border border-surface-border overflow-hidden shadow-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <>
                  {/* Reversed order logic applied above via order-1/order-3 classes */}
                  {/* Actually, easier to duplicate structure but swap content logic */}
                  <div className="md:w-full md:text-right md:pr-12">
                    {/* Wait, the flex order trick is confusing. Let's just be explicit. */}
                  </div>
                </>
              )}
              {!isLeft && (
                <div className="mr-auto">
                  {/* This is the text side for Right-aligned item (index 1) */}
                  <span className="text-primary font-bold text-sm">{item.date}</span>
                  <h3 className="text-text-main text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm mt-2">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  </section>
);


const Contact = () => (
  <section id="contact" className="w-full max-w-[1200px] px-6 py-12">
    <div className="text-center mb-10">
      <h2 className="text-text-main text-3xl font-bold mb-3">LIÊN HỆ</h2>
      <p className="text-text-secondary">Kết nối với chúng tôi tại các cơ sở trên toàn quốc</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 border border-surface-border hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
          <h3 className="text-primary text-lg font-bold">FRC HÀ NỘI</h3>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-text-muted text-[18px]">map</span>
            <p className="text-text-secondary">Khu Giáo dục và Đào tạo - Khu Công nghệ cao Hòa Lạc, Km29 Đại lộ Thăng Long, xã Hòa Lạc, TP. Hà Nội</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">call</span>
            <a href="tel:02473005588" className="text-text-secondary hover:text-primary">(024) 7300 5588</a>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">mail</span>
            <a href="mailto:tuyensinhhanoi@fpt.edu.vn" className="text-text-secondary hover:text-primary">contact@frc-fptu.club</a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-surface-border hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
          <h3 className="text-primary text-lg font-bold">FRC ĐÀ NẴNG</h3>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-text-muted text-[18px]">map</span>
            <p className="text-text-secondary">Khu đô thị công nghệ FPT Đà Nẵng, phường Hòa Hải, quận Ngũ Hành Sơn, TP. Đà Nẵng</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">call</span>
            <a href="tel:02367300999" className="text-text-secondary hover:text-primary">(0236) 730 0999</a>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">mail</span>
            <a href="mailto:tuyensinhdanang@fpt.edu.vn" className="text-text-secondary hover:text-primary">fuda@frc-fptu.club</a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-surface-border hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
          <h3 className="text-primary text-lg font-bold">FRC CẦN THƠ</h3>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-text-muted text-[18px]">map</span>
            <p className="text-text-secondary">Số 600, đường Nguyễn Văn Cừ (nối dài), Phường An Bình, Thành phố Cần Thơ</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">call</span>
            <a href="tel:02927303636" className="text-text-secondary hover:text-primary">(0292) 730 3636</a>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">mail</span>
            <a href="mailto:tuyensinhcantho@fpt.edu.vn" className="text-text-secondary hover:text-primary">hovilo@frc-fptu.club</a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-surface-border hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
          <h3 className="text-primary text-lg font-bold">FRC QUY NHƠN</h3>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-text-muted text-[18px]">map</span>
            <p className="text-text-secondary">Khu đô thị mới An Phú Thịnh, phường Quy Nhơn Đông, tỉnh Gia Lai</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">call</span>
            <a href="tel:02567300999" className="text-text-secondary hover:text-primary">(0256) 7300 999</a>
          </div>
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-text-muted text-[18px]">mail</span>
            <a href="mailto:tuyensinhquynhon@fpt.edu.vn" className="text-text-secondary hover:text-primary">quynhon@frc-fptu.club</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Partners = () => (
  <section className="w-full max-w-[1200px] px-6 py-12">
    <h2 className="text-text-main text-2xl font-bold mb-8 text-center">ĐỐI TÁC & ĐƠN VỊ ĐỒNG HÀNH</h2>
    <div className="flex justify-center">
      {PARTNERS.map((partner) => (
        <div key={partner.id} className="h-24 w-48 flex items-center justify-center bg-white rounded-lg border border-surface-border hover:border-primary hover:shadow-md transition-all cursor-pointer p-4">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  </section>
);

const CTA = () => {
  return (
    <section className="w-full max-w-[1200px] px-6 py-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#00479e] shadow-2xl p-10 md:p-16 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight">Sẵn sàng kiến tạo tương lai?</h2>
          <p className="text-blue-100 text-lg max-w-xl">
            Trở thành thành viên của FRC để cùng học hỏi, sáng tạo và chinh phục những đỉnh cao công nghệ mới.
          </p>
          <Link
            to="/registration"
            className="mt-4 flex items-center justify-center rounded-full h-14 px-10 bg-white text-primary text-lg font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
          >
            Đăng ký ngay hôm nay
          </Link>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Introduction />
      <CoreValues />
      {/* <BoardMembers /> */}
      <Activities />
      {/* <Achievements /> */}
      <Contact />
      <Partners />
      <CTA />
    </>
  );
};

export default HomePage;