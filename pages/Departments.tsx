import React from 'react';

const DEPARTMENTS = [
    {
        name: 'Ban Chuyên Môn',
        function: `Ban Chuyên Môn được xem là đầu não kỹ thuật của CLB. Thành viên ban này phụ trách hiện thực hóa các ý tưởng robotics: nghiên cứu công nghệ, thiết kế mô hình, lắp ráp linh kiện, lập trình cho robot và vận hành thử. Tất cả dự án "hard-core" như làm robot thi đấu, robot biểu diễn… đều do ban Chuyên Môn dẫn dắt.

Ngoài ra ban còn tổ chức các workshop kỹ thuật nội bộ để chia sẻ kiến thức cho mọi thành viên (ví dụ: hướng dẫn lập trình Arduino cơ bản, hướng dẫn sử dụng máy in 3D...).`,
        activities: `Trong năm, ban Chuyên Môn sẽ triển khai các dự án lớn nhỏ. Ví dụ: chế tạo một robot tự hành để tham gia cuộc thi sáng tạo trẻ, làm cánh tay robot hỗ trợ lab, hay đơn giản là làm những robot vui nhộn phục vụ sự kiện của trường.

Thành viên ban sẽ được phân nhóm nhỏ để cùng thực hiện từng dự án, dưới sự hướng dẫn của trưởng ban hoặc cố vấn kỹ thuật. Ban cũng sẽ phối hợp với ban Đối ngoại để xin tài trợ linh kiện khi cần, và với ban Sự kiện khi trình diễn robot.`,
        criteria: 'Ưu tiên những bạn đam mê công nghệ và có tư duy kỹ thuật. Biết lập trình căn bản (C/C++, Python) hoặc có kiến thức về mạch điện, cơ khí là lợi thế, nhưng không bắt buộc – quan trọng là bạn sẵn sàng học. Yêu cầu khả năng tự học, kiên trì khi gặp vấn đề kỹ thuật hóc búa.',
        slots: '10–12 thành viên',
        benefits: `Được cọ xát thực tế với các dự án robot hấp dẫn, từ đó củng cố kiến thức được học và học thêm nhiều kỹ năng mới. Đây là cơ hội tuyệt vời để bạn nâng cao kiến thức chuyên môn của mình thông qua trải nghiệm thực hành.

Thành viên ban Chuyên Môn còn có cơ hội tham gia các cuộc thi robotics đại diện trường, tạo điểm nhấn cho CV sau này. Quan trọng hơn, bạn sẽ được làm việc cùng những người có chung đam mê, cùng nhau "cháy" với các ý tưởng công nghệ – một trải nghiệm thời sinh viên vô giá.`,
        icon: 'memory',
        color: 'blue'
    },
    {
        name: 'Ban Truyền Thông',
        function: 'Ban Truyền Thông là bộ mặt hình ảnh của CLB. Ban chịu trách nhiệm mọi hoạt động quảng bá, đưa hình ảnh CLB đến gần với sinh viên và cộng đồng. Từ việc quản lý fanpage Facebook, Instagram của CLB, sáng tạo nội dung bài đăng, chụp ảnh/quay phim sự kiện, đến thiết kế các ấn phẩm truyền thông – tất cả do đội Truyền Thông đảm nhiệm. Mục tiêu là xây dựng thương hiệu FPTU Robotics Club thật ấn tượng và chuyên nghiệp trong mắt mọi người.',
        activities: `Quản trị các kênh social media của CLB (đăng bài, trả lời inbox, bình luận). Lên kế hoạch nội dung định kỳ (ví dụ: mỗi tháng 2 bài chia sẻ kiến thức robot, 1 bài giới thiệu thành tựu CLB, v.v.).

Phối hợp với ban Sự kiện để truyền thông cho các chương trình của CLB (thiết kế poster, viết thông cáo,…). Ngoài ra ban Truyền Thông còn lưu giữ những khoảnh khắc hoạt động của CLB qua ảnh, video và sản xuất các clip recap, phóng sự khi cần.`,
        criteria: `Tìm kiếm các bạn sáng tạo, năng động và có khả năng xây dựng nội dung thu hút. Yêu thích viết lách, kể chuyện trên mạng xã hội; có khiếu thẩm mỹ về hình ảnh/design (biết dùng Canva, Photoshop là điểm cộng lớn). Nếu bạn có kỹ năng quay dựng video, chụp ảnh sự kiện thì rất tuyệt.

Quan trọng là tinh thần ham học hỏi xu hướng mới (vd: trend TikTok) và trách nhiệm với công việc truyền thông được giao, vì hình ảnh CLB phụ thuộc nhiều vào ban này.`,
        benefits: 'Thỏa sức thể hiện sự sáng tạo và trau dồi kỹ năng truyền thông thực tế – từ viết content, design đến quản lý fanpage. Bạn sẽ mở rộng được mối quan hệ với nhiều bạn trẻ tài năng trong và ngoài CLB.',
        icon: 'campaign',
        color: 'purple'
    },
    {
        name: 'Ban Văn hóa – Sự kiện',
        function: 'Ban Văn hóa – Sự kiện (gọi tắt ban Sự kiện) là "hậu phương" vững chắc lo mọi hoạt động nội bộ và đối nội của CLB. Ban này tập trung vào hai mảng: xây dựng văn hóa CLB tích cực, gắn kết các thành viên; và tổ chức các sự kiện, chương trình của CLB (cả nội bộ lẫn mở rộng). Có thể xem ban Sự kiện như "phòng nhân sự + phòng tổ chức sự kiện" của Robotics Club.',
        activities: `Xây dựng nội quy, quy định sinh hoạt cho CLB; đề xuất và tổ chức các hoạt động team-building, sinh nhật CLB, tri ân thành viên… để tăng tính gắn bó. Đồng thời, lên kế hoạch chi tiết và phối hợp với các ban khác để tổ chức các sự kiện do CLB thực hiện.

Trong mỗi sự kiện, ban phụ trách từ khâu logistics (đặt phòng, thiết bị, trang trí) đến điều phối chương trình (MC, kịch bản, nhân sự hỗ trợ…).`,
        criteria: `Ưu tiên những bạn nhiệt tình, tỉ mỉ và có kỹ năng tổ chức. Bạn nào từng tham gia tổ chức sự kiện (ở cấp lớp, khoa…) sẽ có lợi thế, nhưng nếu chưa có chỉ cần đam mê và tinh thần học hỏi cũng rất hoan nghênh.

Sự sáng tạo cũng rất quan trọng để nghĩ ra những hoạt động thú vị cho CLB. Ngoài ra, ban này cần người có kỹ năng kết nối – biết lắng nghe, động viên và tạo bầu không khí thân thiện giữa các thành viên.`,
        benefits: `Bạn sẽ phát triển mạnh các kỹ năng tổ chức sự kiện, quản lý thời gian, lãnh đạo nhóm. Trải nghiệm việc lên kế hoạch từ đầu đến cuối cho một chương trình thực tế sẽ giúp bạn trưởng thành hơn rất nhiều.

Bên cạnh đó, việc chăm lo gắn kết tập thể sẽ cho bạn những người bạn thân thiết như một gia đình thứ hai trong CLB.`,
        icon: 'celebration',
        color: 'orange'
    },
    {
        name: 'Ban Tài chính – Đối ngoại',
        function: `Ban Tài chính – Đối ngoại (gọi tắt ban Đối ngoại) đảm nhận hai mảng có tính "đối ngoại" nhiều hơn cho CLB:

Về Tài chính: Quản lý quỹ hoạt động của CLB, thu chi ngân sách cho các sự kiện, đề xuất các kế hoạch gây quỹ. Đảm bảo sự minh bạch và hiệu quả trong việc sử dụng kinh phí.

Về Đối ngoại: Liên hệ, xây dựng mối quan hệ với các đơn vị bên ngoài để hỗ trợ CLB. Ví dụ: làm việc với doanh nghiệp công nghệ để xin tài trợ linh kiện hoặc kinh phí, mời các diễn giả chuyên gia về robotics đến nói chuyện, kết nối với các CLB bạn.`,
        activities: `Lập kế hoạch tài chính năm cho CLB, theo dõi và báo cáo quỹ định kỳ cho Ban chủ nhiệm. Tìm kiếm các cơ hội tài trợ: viết proposal gửi doanh nghiệp, gặp gỡ đối tác để thuyết phục họ đầu tư cho CLB hoặc hỗ trợ hiện vật.

Khi CLB có sự kiện, ban Đối ngoại lo khâu xin tài trợ & mời khách, đồng thời làm MC hoặc giới thiệu với báo chí (nếu sự kiện lớn).`,
        criteria: `Ưu tiên các bạn có kỹ năng giao tiếp và đàm phán tốt. Sự tự tin, linh hoạt trong ứng xử với người lạ (nhất là người có chức vụ, nhà tài trợ) là một lợi thế lớn.

Yêu cầu khả năng viết lách cơ bản để soạn thảo email, công văn, proposal chuyên nghiệp. Ngoài ra, cần sự cẩn thận và trung thực tuyệt đối trong quản lý tài chính.`,
        benefits: `Bạn sẽ học được cách làm việc chuyên nghiệp với các đối tác, rèn luyện kỹ năng thương thuyết, ngoại giao trong môi trường an toàn. Việc quản lý tài chính CLB giúp bạn hiểu thêm về ngân sách, sổ sách – những kiến thức thực tiễn hiếm khi có trong sách vở.

Các mối quan hệ bên ngoài mà bạn xây dựng được có thể mở ra nhiều cơ hội nghề nghiệp cho bạn sau này.`,
        icon: 'handshake',
        color: 'green'
    }
];

const DepartmentCard = ({ dept }: { dept: typeof DEPARTMENTS[0] }) => {
    const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
        blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
        orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
        green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
    };
    const colors = colorClasses[dept.color] || colorClasses.blue;

    return (
        <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 mb-6`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`size-12 rounded-full bg-white flex items-center justify-center ${colors.icon} shadow-sm`}>
                    <span className="material-symbols-outlined text-[28px]">{dept.icon}</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">description</span>
                        Chức năng / Nhiệm vụ
                    </h4>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{dept.function}</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">event</span>
                        Hoạt động chính
                    </h4>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{dept.activities}</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">checklist</span>
                        Tiêu chí tuyển chọn
                    </h4>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{dept.criteria}</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                        Quyền lợi
                    </h4>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{dept.benefits}</p>
                </div>
            </div>
        </div>
    );
};

const DepartmentsPage = () => {
    return (
        <section className="w-full max-w-[900px] px-4 md:px-6 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    CÁC BAN CỦA CLB
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Tìm hiểu về chức năng, hoạt động và tiêu chí tuyển chọn của từng ban để chọn vị trí phù hợp nhất với bạn.
                </p>
            </div>

            <div>
                {DEPARTMENTS.map((dept, idx) => (
                    <DepartmentCard key={idx} dept={dept} />
                ))}
            </div>

            <div className="text-center mt-10">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Quay lại đăng ký
                </a>
            </div>
        </section>
    );
};

export default DepartmentsPage;
