export interface Member {
  id: string;
  name: string;
  role: string;
  major: string;
  image: string;
  campus: 'hanoi' | 'danang' | 'quynhon' | 'cantho';
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description?: string;
  image: string;
  category: 'Sự kiện' | 'Tin tức' | 'Thông báo' | 'Thành tích';
  link?: string;
  author?: string;
  authorImage?: string;
  authorRole?: string;
  content?: string; // Full HTML/markdown content for detail page
  tags?: string[]; // Hashtags for the post
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface Activity {
  icon: string;
  title: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}