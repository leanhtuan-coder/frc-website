import React from 'react';
import { Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../constants';

const NewsPage = () => {
    return (
        <div className="w-full flex flex-col items-center bg-background min-h-screen py-12">
            {/* Header */}
            <div className="w-full max-w-[1200px] px-6 mb-12">
                <Link
                    to="/"
                    className="text-text-secondary hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors w-fit mb-6"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Quay lại trang chủ
                </Link>

                <div className="flex justify-between items-end border-b border-surface-border pb-6">
                    <div>
                        <h1 className="text-text-main text-3xl md:text-4xl font-bold mb-2">
                            Tin tức & Sự kiện nổi bật
                        </h1>
                        <p className="text-text-secondary text-base">
                            Những hoạt động mới nhất và thông báo quan trọng từ CLB.
                        </p>
                    </div>
                </div>
            </div>

            {/* News Grid */}
            <div className="w-full max-w-[1200px] px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NEWS_ITEMS.map((item) => (
                        <Link
                            key={item.id}
                            to={`/post/${item.id}`}
                            className="group bg-surface border border-surface-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer flex flex-col"
                        >
                            <div className="relative overflow-hidden aspect-[16/10]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                    }}
                                />
                                <div className="absolute top-3 left-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${item.category === 'Sự kiện' ? 'bg-primary text-white' :
                                                item.category === 'Tin tức' ? 'bg-accent text-white' :
                                                    item.category === 'Thông báo' ? 'bg-orange-500 text-white' :
                                                        'bg-green-500 text-white'
                                            }`}
                                    >
                                        {item.category.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-text-muted text-xs mb-3">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    <span>{item.date}</span>
                                </div>
                                <h3 className="text-text-main text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary text-sm line-clamp-3 mb-4">
                                    {item.description}
                                </p>
                                <div className="mt-auto pt-4 border-t border-surface-border/50">
                                    <span className="text-primary text-sm font-bold flex items-center gap-1">
                                        Đọc tiếp
                                        <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty state if needed */}
                {NEWS_ITEMS.length === 0 && (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-text-muted mb-4">
                            article
                        </span>
                        <p className="text-text-secondary">Chưa có tin tức nào</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
