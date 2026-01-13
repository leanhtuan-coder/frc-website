import React from 'react';
import { Link } from 'react-router-dom';

const TermsPrivacy = () => {
  return (
    <div className="w-full flex flex-col items-center pt-8 pb-16">
      <div className="w-full max-w-[1200px] px-6 mb-8">
        <nav className="flex items-center text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <span className="material-symbols-outlined text-base mx-2 text-text-muted">chevron_right</span>
          <span className="text-text-main font-semibold truncate">Điều khoản & Quyền riêng tư</span>
        </nav>
      </div>

      <div className="w-full max-w-[900px] px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-text-main mb-4">Điều khoản sử dụng & Quyền riêng tư</h1>
          <div className="w-20 h-1.5 bg-primary rounded-full mx-auto"></div>
        </div>

        <div className="bg-surface border border-surface-border rounded-xl p-8 md:p-12 shadow-sm flex flex-col gap-10">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">gavel</span>
              <h2 className="text-2xl font-bold text-text-main">Thông tin về quyền sở hữu & bản quyền</h2>
            </div>
            <div className="prose prose-slate max-w-none text-text-secondary">
              <p className="mb-4">
                Trang thông tin này thuộc quyền sở hữu của <strong>FPTU Robotics Club – FRC</strong>, hoạt động dưới sự quản lý của <strong>Trường Đại học FPT</strong>. Đây là nền tảng chính thức để chia sẻ cập nhật, tài nguyên và thành tựu liên quan đến robotics.
              </p>
              <p className="mb-6">
                Chúng tôi khuyến khích tinh thần sáng tạo, hợp tác và chia sẻ tri thức trong cộng đồng sinh viên quan tâm tới robotics, tự động hóa và công nghệ. Mọi tương tác cần tôn trọng các giá trị <strong>chính trực - tôn trọng - chuyên nghiệp</strong>.
              </p>
              <div className="bg-background rounded-lg p-5 border border-surface-border">
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-bold text-text-main min-w-[150px]">Chủ sở hữu & Quản trị:</span>
                    <span>FPTU Robotics Club - FRC</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-text-main min-w-[150px]">Địa chỉ liên hệ:</span>
                    <span>Hà Nội - Đà Nẵng - Quy Nhơn (xem trang Liên hệ để biết chi tiết & email)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-t border-surface-border" />

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">copyright</span>
              <h2 className="text-2xl font-bold text-text-main">Chính sách sở hữu nội dung & phạm vi sử dụng</h2>
            </div>
            <div className="prose prose-slate max-w-none text-text-secondary">
              <p className="mb-4">
                Toàn bộ nội dung đăng tải trên trang (hình ảnh, bài viết, tài liệu kỹ thuật, video, đồ họa, v.v.) là tài sản của FRC trừ khi có ghi chú khác. Nghiêm cấm sao chép, phân phối, chỉnh sửa hoặc sử dụng cho mục đích thương mại khi chưa có văn bản chấp thuận từ FRC. Việc trích dẫn lại cho mục đích học thuật/phi thương mại cần dẫn nguồn rõ ràng.
              </p>
              
              <h3 className="text-lg font-bold text-text-main mb-3 mt-6">Bản quyền & quyền sở hữu trí tuệ</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Tên gọi, logo và hệ nhận diện của FRC được bảo hộ theo quy định pháp luật; mọi sử dụng trái phép đều bị nghiêm cấm.
                </li>
                <li>
                  Đóng góp của thành viên/bên thứ ba (báo cáo dự án, thiết kế, mã nguồn, tài liệu nghiên cứu…) thuộc về tác giả nếu không có thỏa thuận chuyển giao khác; FRC luôn tôn trọng và ghi nhận tác quyền phù hợp.
                </li>
                <li>
                  Nếu phát hiện dấu hiệu xâm phạm bản quyền, vui lòng thông báo qua email liên hệ để chúng tôi xử lý kịp thời.
                </li>
              </ul>
            </div>
          </section>

          <hr className="border-t border-surface-border" />

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">security</span>
              <h2 className="text-2xl font-bold text-text-main">Thông tin pháp lý & Chính sách quyền riêng tư</h2>
            </div>
            <div className="prose prose-slate max-w-none text-text-secondary">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                  <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">database</span>
                    Dữ liệu chúng tôi thu thập
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Họ tên, email và thông tin liên hệ do bạn cung cấp tự nguyện.</li>
                    <li>Nội dung trao đổi: tin nhắn, bình luận, yêu cầu hợp tác/giải đáp.</li>
                    <li>Một số dữ liệu kỹ thuật/đo lường ở mức tổng hợp (ví dụ: lượt xem, tương tác) để cải thiện trải nghiệm.</li>
                  </ul>
                </div>

                <div className="bg-green-50/50 p-5 rounded-lg border border-green-100">
                  <h3 className="text-base font-bold text-green-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                    Mục đích sử dụng dữ liệu
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Nâng cao chất lượng nội dung và mức độ tương tác của trang.</li>
                    <li>Phản hồi liên hệ, phối hợp hoạt động/hợp tác khi được đề nghị.</li>
                    <li>Gửi thông báo về sự kiện/hoạt động phù hợp (khi có sự đồng ý).</li>
                  </ul>
                </div>
              </div>

              <p className="italic text-sm border-l-4 border-surface-border pl-4 py-1">
                Chúng tôi không bán hoặc trao đổi dữ liệu cá nhân cho bên thứ ba. Dữ liệu được lưu trữ an toàn và chỉ các thành viên có thẩm quyền mới được truy cập. Bạn có thể yêu cầu chỉnh sửa hoặc xóa dữ liệu bằng cách liên hệ qua email chính thức tại trang Liên hệ.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPrivacy;