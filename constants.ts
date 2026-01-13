import { Member, NewsItem, Achievement, Activity, Partner } from './types';

export const CAMPUS_OPTIONS = [
  { value: 'hanoi', label: 'Hà Nội', isRecruiting: true },
  { value: 'danang', label: 'Đà Nẵng', isRecruiting: false },
  { value: 'quynhon', label: 'Quy Nhơn', isRecruiting: false },
  { value: 'cantho', label: 'Cần Thơ', isRecruiting: false }
];

export const BOARD_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Lê Anh Tuấn',
    role: 'Chủ nhiệm CLB',
    major: 'K19 - Software Engineering',
    campus: 'hanoi',
    image: '/assets/board/hanoi/1.jpg'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    role: 'Phó chủ nhiệm',
    major: 'K16 - Artificial Intelligence',
    campus: 'hanoi',
    image: '/assets/board/hanoi/2.jpg'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    role: 'Trưởng ban Kỹ thuật',
    major: 'K15 - IoT Systems',
    campus: 'danang',
    image: '/assets/board/danang/3.jpg'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    role: 'Trưởng ban Truyền thông',
    major: 'K17 - Digital Marketing',
    campus: 'quynhon',
    image: '/assets/board/quynhon/4.jpg'
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    role: 'Trưởng ban Nhân sự',
    major: 'K16 - International Business',
    campus: 'cantho',
    image: '/assets/board/cantho/5.jpg'
  },
  {
    id: '6',
    name: 'Đỗ Thị F',
    role: 'Trưởng ban Hậu cần',
    major: 'K17 - Multimedia',
    campus: 'hanoi',
    image: '/assets/board/hanoi/6.jpg'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1765867155061',
    title: 'FRC vinh dự đồng hành cùng đoàn phim "Cách Em 1 Milimet" của VTV!',
    date: '16 Tháng 12, 2025',
    description: 'Ngày quay đặc biệt đã diễn ra ngay tại khuôn viên Đại học FPT Hà Nội, khi FPTU Robotics Club - FRC vinh dự được ekip VFC – Đài Truyền hình Việt Nam mời tham gia ghi hình cho bộ phim "Cách Em 1 Milimet", đang phát sóng trong khung giờ vàng trên VTV3.',
    image: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/559105222_122268441326027318_6772998466651142275_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGI-T8QdAwU9EjmKaoPzSpt18tWsDtUur7Xy1awO1S6vjnL53Rz9NSgkGfA4HLv3lN-Fg4zAdRmBKpZASerF65W&_nc_ohc=R4di4isoyUQ7kNvwF5QBWJ&_nc_oc=AdkZ4toM7m2OqWhqPfe8NrRcfrScn4S4B7ZjByZF4yPjNAVY67q1FWSbQK0tFrdSQrI94C_d30zn21a_iEkKb0_3&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=YT4HKPvCUrWdPVAbA7J3xw&oh=00_AfkXNxQ4ubmY1P8uQnFMKUH0VJTfSOWJIYLM_4m-q4Fsg&oe=6946C58A',
    category: 'Tin tức',
    link: 'https://www.facebook.com/share/p/1DZg1qMxfV/',
    author: 'Lê Anh Tuấn',
    authorImage: 'https://via.placeholder.com/48?text=LAT',
    authorRole: 'Ban Truyền thông',
    content: `🎬 FRC vinh dự đồng hành cùng đoàn phim "Cách Em 1 Milimet" của VTV!

Ngày quay đặc biệt đã diễn ra ngay tại khuôn viên Đại học FPT Hà Nội, khi FPTU Robotics Club - FRC vinh dự được ekip VFC – Đài Truyền hình Việt Nam mời tham gia ghi hình cho bộ phim "Cách Em 1 Milimet", đang phát sóng trong khung giờ vàng trên VTV3.

🤖 Trong buổi quay, những robot do CLB FRC chế tạo và lập trình đã góp phần tạo nên bối cảnh hiện đại, đậm màu sắc công nghệ – nơi trí tuệ và đam mê của sinh viên FPTU được thể hiện rõ nhất.

🎥 Với FRC, đây không chỉ là cơ hội đồng hành cùng ê-kíp truyền hình chuyên nghiệp mà còn là dịp để lan tỏa tinh thần sáng tạo, đưa công nghệ đến gần hơn với nghệ thuật và khán giả truyền hình.

💡 Một trải nghiệm đáng nhớ – nơi robot và con người cùng kể nên câu chuyện về cảm xúc, công nghệ và tuổi trẻ FPTU!`
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    date: 'Tháng 12, 2023',
    title: 'Giải Nhất VRC 2023',
    description: 'Vietnam Robotics Challenge - Bảng Đại học. Vượt qua 30 đội thi toàn quốc.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl3itWP_gDCj7D6ddsyNlSVgJpDEvLi2JXQaG1xfewP8wfzAQmTCy0FqDbUYMwcWL8IO0NYSubBNEdmnQ2SvrxXCq7WHpvFCZwSrfr3rZmqctJk17NbeW4p72LHxn5h3YaeHStBoFtADtSKQsxMyb18eC4yqE-dMu2v628rapUEJuKzAirxrhQDBkK5AW7is_WZWqswrqQjGP88zdVLjPMo5kpuzzPMYA6gCeCuYkTxp-bxln9w_IzR_JT0pJOqjPHMvvcmIuzMwp1'
  },
  {
    id: '2',
    date: 'Tháng 8, 2023',
    title: 'Top 5 Hackathon FPTU',
    description: 'Dự án "Smart Garden System" sử dụng IoT và năng lượng mặt trời.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAig_c0kDvhV23FRgl5yvie-HJSnytAmCZtT4HYEGzQNf4L7jzopQj5Rr89P9exlipUB6XAxUmQ7D0vQ5MphLz-EI_F5PaIyEhthMaiFuuWDMQrodw3IDlnXAFDmGko2hbvjubINt9n6OdddlF4LDMXUVdcKPpADjg7QMf3DJfxCLfQ9xrR8cGEGWNrrubvjE6riQsWRWamvveD_wcozFHIUINhZN9F3n3nBFrABy8ewCwWWF-lx75VeJEagifs0_WSSwtD7ucNNcDc'
  },
  {
    id: '3',
    date: 'Tháng 4, 2023',
    title: 'Giải Triển Vọng Maker Faire',
    description: 'Sản phẩm Robot hỗ trợ người khuyết tật được đánh giá cao về tính nhân văn.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo8LpmS5Dgu9c1Fz_8O6vhgdrfrlshMTI25bygaKuP5XklBpRnf7E-9M2sv0o7kLbQFO55M_V88y6rZ4q-kDN149r5L9ijLYmbsoOqR_s36jZi0NMimdSFhrW0dn4qLaUaYnxOzMRGa8xcbSHUfPDj0U0ZbSfojPgGIt7hsOkMQJVdC0txnRluLZZiEGh9HfnEPZpVRjKP_NMgVP9XsbP-BwyaCu4FNu4w4h90daiGSyazdU2dpkZGFel8O2gTs2saTy6OdGIBFbbq'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    icon: 'precision_manufacturing',
    title: 'CHẾ TẠO ROBOT',
    description: 'Thiết kế cơ khí, mạch điện tử và lắp ráp các mô hình robot từ cơ bản đến nâng cao phục vụ thi đấu và nghiên cứu.'
  },
  {
    icon: 'terminal',
    title: 'LẬP TRÌNH NHƯNG',
    description: 'Nghiên cứu lập trình vi điều khiển (Arduino, STM32, ESP32) và phát triển các thuật toán điều khiển tự động.'
  },
  {
    icon: 'emoji_events',
    title: 'THI DẤU',
    description: 'Tham gia các giải đấu Robotics trong và ngoài nước như VRC, Robocon, Maker Faire với tinh thần fair-play.'
  },
  {
    icon: 'school',
    title: 'TRAINING',
    description: 'Tổ chức các lớp học training nội bộ về CAD, Python, C++, PCB Design cho các thành viên mới.'
  },
  {
    icon: 'groups',
    title: 'SỰ KIỆN & WORKSHOP',
    description: 'Tổ chức workshop công nghệ, tech talk và các sự kiện triển lãm sản phẩm cho sinh viên toàn trường.'
  },
  {
    icon: 'handshake',
    title: 'KẾT NỐI DOANH NGHIỆP',
    description: 'Tham quan doanh nghiệp, kết nối cơ hội thực tập và việc làm cho thành viên câu lạc bộ.'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'VFC',
    logo: '/assets/partners/vfc.png'
  }
];