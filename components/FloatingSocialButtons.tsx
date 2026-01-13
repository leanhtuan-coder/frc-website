import React, { useState } from 'react';

export const FloatingSocialButtons: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
            {/* Expanded buttons */}
            {isExpanded && (
                <>
                    {/* Messenger */}
                    <a
                        href="https://m.me/fpturobotics.club"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all animate-in slide-in-from-right-5 fade-in duration-300"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l1.98-.87c.17-.08.36-.1.55-.06.91.25 1.87.38 2.88.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6 7.46-2.93 4.67c-.47.74-1.47.92-2.17.37l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.19-.68-.63l2.93-4.67c.47-.74 1.47-.92 2.17-.37l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.19.68.63z" />
                        </svg>
                        <span className="text-sm font-medium">Messenger</span>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/fpturobotics.club"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all animate-in slide-in-from-right-5 fade-in duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-sm font-medium">Facebook</span>
                    </a>
                </>
            )}

            {/* Main toggle button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all ${isExpanded
                    ? 'bg-gray-600 rotate-45'
                    : 'bg-primary hover:bg-primary-dark'
                    }`}
            >
                <span className="material-symbols-outlined text-white text-[28px]">
                    {isExpanded ? 'close' : 'chat'}
                </span>
            </button>
        </div>
    );
};
