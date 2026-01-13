import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { NEWS_ITEMS, ACHIEVEMENTS } from '../constants';

const SocialIcon = ({ platform }: { platform: 'facebook' | 'twitter' | 'linkedin' }) => {
  switch (platform) {
    case 'facebook':
      return (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      );
  }
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find post by ID
  const post = NEWS_ITEMS.find(item => item.id === id);

  // If post not found, redirect to news page
  if (!post) {
    return <Navigate to="/news" replace />;
  }

  const currentUrl = window.location.href;

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const text = encodeURIComponent(post.title);
    const shareUrl = encodeURIComponent(currentUrl);
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowShareMenu(false);
        }, 1500);
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-4 md:pt-8 pb-8 md:pb-16 relative">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="hidden md:block w-full max-w-[1200px] px-4 md:px-6 mb-4 md:mb-8">
        <nav className="flex items-center text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <span className="material-symbols-outlined text-base mx-2 text-text-muted">chevron_right</span>
          <Link to="/" className="hover:text-primary transition-colors font-medium">Tin tức & Sự kiện</Link>
          <span className="material-symbols-outlined text-base mx-2 text-text-muted">chevron_right</span>
          <span className="text-text-main font-semibold truncate">{post.title}</span>
        </nav>
      </div>

      {/* Back button for mobile */}
      <div className="md:hidden w-full px-4 mb-4">
        <Link to="/" className="inline-flex items-center gap-1 text-text-secondary hover:text-primary text-sm font-medium transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Quay lại</span>
        </Link>
      </div>

      <section className="w-full max-w-[800px] px-4 md:px-6 flex flex-col gap-4 md:gap-6 mb-6 md:mb-10">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="px-2 md:px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">{post.category}</span>
          <span className="flex items-center gap-1 text-text-secondary text-xs md:text-sm font-medium">
            <span className="material-symbols-outlined text-base md:text-lg">calendar_today</span>
            {post.date}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 py-6 border-b border-surface-border">
          {post.author && (
            <>
              <div className="size-12 rounded-full border-2 border-surface-border overflow-hidden">
                <img
                  src={post.authorImage || 'https://via.placeholder.com/48?text=Author'}
                  alt={post.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48?text=Author';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-text-main">{post.author}</span>
                {post.authorRole && (
                  <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">{post.authorRole}</span>
                )}
              </div>
            </>
          )}

          <div className="ml-auto flex gap-2 relative">
            {showShareMenu && (
              <div className="fixed inset-0 z-10 cursor-default" onClick={() => setShowShareMenu(false)}></div>
            )}

            <div className="relative z-20">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`size-9 rounded-full bg-surface border flex items-center justify-center transition-colors ${showShareMenu ? 'border-primary text-primary bg-primary/5' : 'border-surface-border text-text-secondary hover:text-primary hover:border-primary'}`}
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>

              {showShareMenu && (
                <div className="absolute right-0 top-11 w-48 bg-white rounded-xl border border-surface-border shadow-xl p-1.5 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
                    <span className="text-[#1877F2]"><SocialIcon platform="facebook" /></span>
                    <span className="font-medium">Facebook</span>
                  </button>
                  <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
                    <span className="text-black"><SocialIcon platform="twitter" /></span>
                    <span className="font-medium">X (Twitter)</span>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
                    <span className="text-[#0A66C2]"><SocialIcon platform="linkedin" /></span>
                    <span className="font-medium">LinkedIn</span>
                  </button>
                  <div className="h-[1px] bg-surface-border my-0.5"></div>
                  <button onClick={() => handleShare('copy')} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
                    <span className={`material-symbols-outlined text-[18px] ${copied ? 'text-green-600' : ''}`}>
                      {copied ? 'check' : 'link'}
                    </span>
                    <span className={`font-medium ${copied ? 'text-green-600' : ''}`}>
                      {copied ? 'Đã sao chép!' : 'Sao chép link'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button className="size-9 rounded-full bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
            </button>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1000px] px-4 md:px-6 mb-8 md:mb-12">
        <div className="rounded-lg md:rounded-xl overflow-hidden border border-surface-border shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px]"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1000x500?text=Image+Not+Available';
            }}
          />
          <div className="bg-surface py-3 px-4 border-t border-surface-border text-center">
            <p className="text-xs text-text-secondary font-medium italic">{post.title}</p>
          </div>
        </div>
      </div>

      <article className="w-full max-w-[800px] px-4 md:px-6">
        <div className="prose prose-slate prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-main prose-p:text-text-secondary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          {post.description && (
            <p className="lead text-base md:text-lg lg:text-xl text-text-main font-medium border-l-4 border-primary pl-3 md:pl-4 mb-6 md:mb-8">
              {post.description}
            </p>
          )}

          {post.link && (
            <div className="my-6">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <span>Xem bài viết gốc</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            </div>
          )}

          {post.content && (
            <div className="mt-6 md:mt-8 prose-content">
              <div className="whitespace-pre-wrap text-text-secondary text-sm md:text-base leading-relaxed">
                {post.content}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-surface-border">
          <span className="text-sm font-bold text-text-main mr-2 py-1">Tags:</span>
          {post.tags && post.tags.length > 0 ? (
            post.tags.map((tag) => (
              <a key={tag} href="#" className="px-3 py-1 rounded bg-surface border border-surface-border text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors">
                {tag}
              </a>
            ))
          ) : (
            ['#Robotics', '#Technology', '#FPTU'].map((tag) => (
              <a key={tag} href="#" className="px-3 py-1 rounded bg-surface border border-surface-border text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors">
                {tag}
              </a>
            ))
          )}
        </div>
      </article>

      <section className="w-full max-w-[1200px] px-6 mt-16 pt-12 border-t border-surface-border">
        {NEWS_ITEMS.length > 1 && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-text-main text-2xl font-bold">Tin tức liên quan</h2>
                <p className="text-text-secondary text-sm mt-1">Các hoạt động và sự kiện khác của CLB</p>
              </div>
              <Link to="/news" className="text-primary text-sm font-bold hover:text-primary-dark transition-colors flex items-center gap-1">
                Xem tất cả <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NEWS_ITEMS.filter(item => item.id !== post.id).slice(0, 3).map((item) => (
                <Link key={item.id} to={`/post/${item.id}`} className="group flex flex-col bg-surface border border-surface-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                    <div className={`absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${item.category === 'Sự kiện' ? 'bg-primary' :
                      item.category === 'Tin tức' ? 'bg-accent' :
                        'bg-text-secondary'
                      }`}>
                      {item.category}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 text-text-muted text-xs mb-3 font-medium">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-text-main text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div >
  );
};

export default PostDetail;