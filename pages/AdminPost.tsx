import React, { useState } from 'react';
import { InputField } from '../components/registration/InputField';
import { SelectField } from '../components/registration/SelectField';
import { Label } from '../components/ui/Label';

interface PostFormData {
    title: string;
    category: 'Sự kiện' | 'Tin tức' | 'Thông báo' | 'Thành tích' | '';
    date: string;
    description: string;
    image: string;
    link: string;
    author: string;
    authorImage: string;
    authorRole: string;
    content: string;
    tags: string;
}

const AdminPost = () => {
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        image: '',
        link: '',
        author: '',
        authorImage: '',
        authorRole: '',
        content: '',
        tags: ''
    });

    const [generatedCode, setGeneratedCode] = useState('');

    const handleInputChange = (field: keyof PostFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const generateCode = () => {
        const newId = Date.now().toString();
        const tagsArray = formData.tags ? formData.tags.split(' ').filter(t => t.trim()) : [];

        // Convert date from YYYY-MM-DD to "DD Tháng MM, YYYY"
        const formatDate = (dateStr: string) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day} Tháng ${month}, ${year}`;
        };

        // Escape special characters in strings
        const escapeString = (str: string) => {
            return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        };

        const formattedDate = formatDate(formData.date);

        let code = `{
    id: '${newId}',
    title: '${escapeString(formData.title)}',
    date: '${formattedDate}',
    description: '${escapeString(formData.description)}',
    image: '${formData.image}',
    category: '${formData.category}',
    link: '${formData.link}'`;

        if (formData.author) {
            code += `,\n    author: '${escapeString(formData.author)}'`;
        }
        if (formData.authorImage) {
            code += `,\n    authorImage: '${formData.authorImage}'`;
        }
        if (formData.authorRole) {
            code += `,\n    authorRole: '${escapeString(formData.authorRole)}'`;
        }
        if (formData.content) {
            code += `,\n    content: \`${formData.content}\``;
        }
        if (tagsArray.length > 0) {
            code += `,\n    tags: ${JSON.stringify(tagsArray)}`;
        }

        code += `\n  }`;

        setGeneratedCode(code);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        alert('Đã copy code! Paste vào constants.ts trong NEWS_ITEMS array');
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Sự kiện': return 'bg-blue-100 text-blue-700';
            case 'Tin tức': return 'bg-cyan-100 text-cyan-700';
            case 'Thông báo': return 'bg-orange-100 text-orange-700';
            case 'Thành tích': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text-main mb-2">Đăng bài viết mới</h1>
                    <p className="text-text-secondary">Tạo bài viết cho phần Tin tức & Sự kiện</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-border">
                        <h2 className="text-xl font-bold text-text-main mb-6">Thông tin bài viết</h2>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Tiêu đề *</Label>
                                <InputField
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Nhập tiêu đề bài viết"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <Label htmlFor="category">Danh mục *</Label>
                                <SelectField
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    options={[
                                        { value: 'Sự kiện', label: 'Sự kiện' },
                                        { value: 'Tin tức', label: 'Tin tức' },
                                        { value: 'Thông báo', label: 'Thông báo' },
                                        { value: 'Thành tích', label: 'Thành tích' }
                                    ]}
                                    placeholder="Chọn danh mục"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <Label htmlFor="date">Ngày đăng *</Label>
                                <InputField
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Mô tả ngắn</Label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Nhập mô tả ngắn cho bài viết"
                                    rows={3}
                                    className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <Label htmlFor="image">URL hình ảnh *</Label>
                                <InputField
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="mt-1 text-xs text-gray-500">Nhập link ảnh từ internet hoặc đường dẫn local</p>
                            </div>

                            {/* Link */}
                            <div>
                                <Label htmlFor="link">Link bài viết (tùy chọn)</Label>
                                <InputField
                                    id="link"
                                    value={formData.link}
                                    onChange={(e) => handleInputChange('link', e.target.value)}
                                    placeholder="https://example.com/post"
                                />
                            </div>

                            {/* Author Name */}
                            <div>
                                <Label htmlFor="author">Tên tác giả (tùy chọn)</Label>
                                <InputField
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => handleInputChange('author', e.target.value)}
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>

                            {/* Author Image */}
                            <div>
                                <Label htmlFor="authorImage">URL ảnh tác giả (tùy chọn)</Label>
                                <InputField
                                    id="authorImage"
                                    value={formData.authorImage}
                                    onChange={(e) => handleInputChange('authorImage', e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>

                            {/* Author Role */}
                            <div>
                                <Label htmlFor="authorRole">Chức vụ tác giả (tùy chọn)</Label>
                                <InputField
                                    id="authorRole"
                                    value={formData.authorRole}
                                    onChange={(e) => handleInputChange('authorRole', e.target.value)}
                                    placeholder="Ban Truyền thông FRC"
                                />
                            </div>

                            {/* Full Content */}
                            <div>
                                <Label htmlFor="content">Nội dung đầy đủ (tùy chọn)</Label>
                                <textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => handleInputChange('content', e.target.value)}
                                    placeholder="Nhập nội dung chi tiết của bài viết..."
                                    rows={8}
                                    className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                                />
                                <p className="mt-1 text-xs text-gray-500">Nội dung sẽ hiển thị trong trang chi tiết</p>
                            </div>

                            {/* Tags */}
                            <div>
                                <Label htmlFor="tags">Hashtags (tùy chọn)</Label>
                                <InputField
                                    id="tags"
                                    value={formData.tags}
                                    onChange={(e) => handleInputChange('tags', e.target.value)}
                                    placeholder="#Robotics #AI #Technology (cách nhau bằng dấu cách)"
                                />
                                <p className="mt-1 text-xs text-gray-500">Nhập các hashtag cách nhau bằng dấu cách. VD: #Robotics #AI #Workshop</p>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={generateCode}
                                disabled={!formData.title || !formData.category || !formData.image}
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Tạo code
                            </button>

                            {/* Generated Code */}
                            {generatedCode && (
                                <div className="space-y-3">
                                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-green-400 text-sm font-mono">{generatedCode}</pre>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                    >
                                        Copy code
                                    </button>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Hướng dẫn:</strong> Copy code trên và paste vào file <code className="bg-blue-100 px-2 py-1 rounded">constants.ts</code> trong array <code className="bg-blue-100 px-2 py-1 rounded">NEWS_ITEMS</code>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-border">
                        <h2 className="text-xl font-bold text-text-main mb-6">Preview</h2>

                        {formData.title || formData.image ? (
                            <div className="bg-white rounded-xl overflow-hidden border border-surface-border hover:shadow-lg transition-all group cursor-pointer">
                                {/* Image */}
                                {formData.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={formData.image}
                                            alt={formData.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                            }}
                                        />
                                        {formData.category && (
                                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(formData.category)}`}>
                                                {formData.category}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-5">
                                    {formData.date && (
                                        <div className="flex items-center gap-2 text-text-muted text-sm mb-2">
                                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                            <span>{new Date(formData.date).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                    )}

                                    <h3 className="text-text-main font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {formData.title || 'Tiêu đề bài viết'}
                                    </h3>

                                    {formData.description && (
                                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                            {formData.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                                        <span>Chi tiết</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-400">Điền form để xem preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPost;
