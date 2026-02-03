export interface Department {
  id: string
  name: string
  functions: string[]
  activities: string[]
  criteria: string[]
  recruitmentCount: string
  benefits: string[]
  color: {
    bg: string
    border: string
    text: string
    accent: string
  }
}

export const departments: Department[] = [
  {
    id: "chuyen-mon",
    name: "Ban Chuyên Môn",
    functions: [
      "Ban Chuyên Môn được xem là đầu não kỹ thuật của CLB. Thành viên ban này phụ trách hiện thực hóa các ý tưởng robotics: nghiên cứu công nghệ, thiết kế mô hình, lắp ráp linh kiện, lập trình cho robot và vận hành thử. Tất cả dự án \"hard-core\" như làm robot thi đấu, robot biểu diễn… đều do ban Chuyên Môn dẫn dắt.",
      "Ngoài ra ban còn tổ chức các workshop kỹ thuật nội bộ để chia sẻ kiến thức cho mọi thành viên (ví dụ: hướng dẫn lập trình Arduino cơ bản, hướng dẫn sử dụng máy in 3D...).",
    ],
    activities: [
      "Trong năm, ban Chuyên Môn sẽ triển khai các dự án lớn nhỏ. Ví dụ: chế tạo một robot tự hành để tham gia cuộc thi sáng tạo trẻ, làm cánh tay robot hỗ trợ lab, hay đơn giản là làm những robot vui nhộn phục vụ sự kiện của trường.",
      "Thành viên ban sẽ được phân nhóm nhỏ để cùng thực hiện từng dự án, dưới sự hướng dẫn của trưởng ban hoặc cố vấn kỹ thuật. Ban cũng sẽ phối hợp với ban Đối ngoại để xin tài trợ linh kiện khi cần, và với ban Sự kiện khi trình diễn robot.",
    ],
    criteria: [
      "Ưu tiên những bạn đam mê công nghệ và có tư duy kỹ thuật. Biết lập trình căn bản (C/C++, Python) hoặc có kiến thức về mạch điện, cơ khí là lợi thế, nhưng không bắt buộc – quan trọng là bạn sẵn sàng học.",
      "Yêu cầu khả năng tự học, kiên trì khi gặp vấn đề kỹ thuật hóc búa.",
    ],
    recruitmentCount: "10–12 thành viên",
    benefits: [
      "Được cọ xát thực tế với các dự án robot hấp dẫn, từ đó củng cố kiến thức được học và học thêm nhiều kỹ năng mới. Đây là cơ hội tuyệt vời để bạn nâng cao kiến thức chuyên môn của mình thông qua trải nghiệm thực hành",
      "Thành viên ban Chuyên Môn còn có cơ hội tham gia các cuộc thi robotics đại diện trường, tạo điểm nhấn cho CV sau này. Quan trọng hơn, bạn sẽ được làm việc cùng những người có chung đam mê, cùng nhau \"cháy\" với các ý tưởng công nghệ – một trải nghiệm thời sinh viên vô giá.",
    ],
    color: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      accent: "text-blue-700",
    },
  },
  {
    id: "truyen-thong",
    name: "Ban Truyền Thông",
    functions: [
      "Ban Truyền Thông là bộ mặt hình ảnh của CLB. Ban chịu trách nhiệm mọi hoạt động quảng bá, đưa hình ảnh CLB đến gần với sinh viên và cộng đồng. Từ việc quản lý fanpage Facebook, Instagram của CLB, sáng tạo nội dung bài đăng, chụp ảnh/quay phim sự kiện, đến thiết kế các ấn phẩm truyền thông – tất cả do đội Truyền Thông đảm nhiệm. Mục tiêu là xây dựng thương hiệu FPTU Robotics Club thật ấn tượng và chuyên nghiệp trong mắt mọi người.",
    ],
    activities: [
      "Quản trị các kênh social media của CLB (đăng bài, trả lời inbox, bình luận). Lên kế hoạch nội dung định kỳ (ví dụ: mỗi tháng 2 bài chia sẻ kiến thức robot, 1 bài giới thiệu thành tựu CLB, v.v.).",
      "Phối hợp với ban Sự kiện để truyền thông cho các chương trình của CLB (thiết kế poster, viết thông cáo,…). Ngoài ra ban Truyền Thông còn lưu giữ những khoảnh khắc hoạt động của CLB qua ảnh, video và sản xuất các clip recap, phóng sự khi cần.",
    ],
    criteria: [
      "Tìm kiếm các bạn sáng tạo, năng động và có khả năng xây dựng nội dung thu hút. Yêu thích viết lách, kể chuyện trên mạng xã hội; có khiếu thẩm mỹ về hình ảnh/design (biết dùng Canva, Photoshop là điểm cộng lớn). Nếu bạn có kỹ năng quay dựng video, chụp ảnh sự kiện thì rất tuyệt.",
      "Bên cạnh đó, cần khả năng giao tiếp tốt để phối hợp với các ban khác cũng như tương tác với người xem online.",
      "Quan trọng là tinh thần ham học hỏi xu hướng mới (vd: trend TikTok) và trách nhiệm với công việc truyền thông được giao, vì hình ảnh CLB phụ thuộc nhiều vào ban này.",
    ],
    recruitmentCount: "6–8 thành viên",
    benefits: [
      "Thỏa sức thể hiện sự sáng tạo và trau dồi kỹ năng truyền thông thực tế – từ viết content, design đến quản lý fanpage. Bạn sẽ mở rộng được mối quan hệ với nhiều bạn trẻ tài năng trong và ngoài CLB",
    ],
    color: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      accent: "text-green-700",
    },
  },
  {
    id: "van-hoa-su-kien",
    name: "Ban Văn hóa – Sự kiện",
    functions: [
      "Ban Văn hóa – Sự kiện (gọi tắt ban Sự kiện) là \"hậu phương\" vững chắc lo mọi hoạt động nội bộ và đối nội của CLB. Ban này tập trung vào hai mảng: xây dựng văn hóa CLB tích cực, gắn kết các thành viên; và tổ chức các sự kiện, chương trình của CLB (cả nội bộ lẫn mở rộng). Có thể xem ban Sự kiện như \"phòng nhân sự + phòng tổ chức sự kiện\" của Robotics Club.",
    ],
    activities: [
      "Xây dựng nội quy, quy định sinh hoạt cho CLB; đề xuất và tổ chức các hoạt động team-building, sinh nhật CLB, tri ân thành viên… để tăng tính gắn bó. Đồng thời, lên kế hoạch chi tiết và phối hợp với các ban khác để tổ chức các sự kiện do CLB thực hiện: ví dụ hội thảo chia sẻ về robotics, cuộc thi robot mini cho sinh viên, gian hàng triển lãm trong ngày hội công nghệ của trường, v.v.",
      "Trong mỗi sự kiện, ban phụ trách từ khâu logistics (đặt phòng, thiết bị, trang trí) đến điều phối chương trình (MC, kịch bản, nhân sự hỗ trợ…).",
    ],
    criteria: [
      "Ưu tiên những bạn nhiệt tình, tỉ mỉ và có kỹ năng tổ chức. Bạn nào từng tham gia tổ chức sự kiện (ở cấp lớp, khoa…) sẽ có lợi thế, nhưng nếu chưa có chỉ cần đam mê và tinh thần học hỏi cũng rất hoan nghênh.",
      "Yêu cầu khả năng lập kế hoạch tốt, xử lý tình huống nhanh, giao tiếp khéo léo (vì sẽ làm việc nhiều với các bên như phòng CTSV, các diễn giả...).",
      "Sự sáng tạo cũng rất quan trọng để nghĩ ra những hoạt động thú vị cho CLB. Ngoài ra, ban này cần người có kỹ năng kết nối – biết lắng nghe, động viên và tạo bầu không khí thân thiện giữa các thành viên (vì họ cũng làm nhiệm vụ như \"HR nội bộ\").",
    ],
    recruitmentCount: "5–6 thành viên",
    benefits: [
      "Bạn sẽ phát triển mạnh các kỹ năng tổ chức sự kiện, quản lý thời gian, lãnh đạo nhóm. Trải nghiệm việc lên kế hoạch từ đầu đến cuối cho một chương trình thực tế sẽ giúp bạn trưởng thành hơn rất nhiều.",
      "Bên cạnh đó, việc chăm lo gắn kết tập thể sẽ cho bạn những người bạn thân thiết như một gia đình thứ hai trong CLB. Môi trường này cũng rèn luyện bạn trở thành người tinh tế, biết quan sát và quan tâm tới người khác – những phẩm chất quý trong cuộc sống và công việc sau này.",
    ],
    color: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-900",
      accent: "text-purple-700",
    },
  },
  {
    id: "tai-chinh-doi-ngoai",
    name: "Ban Tài chính – Đối ngoại",
    functions: [
      "Về Tài chính: Quản lý quỹ hoạt động của CLB, thu chi ngân sách cho các sự kiện, đề xuất các kế hoạch gây quỹ (bán áo, gây quỹ tại sự kiện… nếu có). Đảm bảo sự minh bạch và hiệu quả trong việc sử dụng kinh phí.",
      "Về Đối ngoại: Liên hệ, xây dựng mối quan hệ với các đơn vị bên ngoài để hỗ trợ CLB. Ví dụ: làm việc với doanh nghiệp công nghệ để xin tài trợ linh kiện hoặc kinh phí, mời các diễn giả chuyên gia về robotics đến nói chuyện, kết nối với các CLB bạn (trong và ngoài trường) để tổ chức sự kiện chung. Đồng thời phụ trách các thủ tục hành chính với trường (xin phép tổ chức chương trình, làm báo cáo...).",
    ],
    activities: [
      "Lập kế hoạch tài chính năm cho CLB, theo dõi và báo cáo quỹ định kỳ cho Ban chủ nhiệm. Tìm kiếm các cơ hội tài trợ: viết proposal gửi doanh nghiệp, gặp gỡ đối tác để thuyết phục họ đầu tư cho CLB hoặc hỗ trợ hiện vật.",
      "Khi CLB có sự kiện, ban Đối ngoại lo khâu xin tài trợ & mời khách, đồng thời làm MC hoặc giới thiệu với báo chí (nếu sự kiện lớn). Ngoài ra, ban còn quản lý các vấn đề hành chính như danh sách thành viên nộp phí sinh hoạt (nếu có), xin phê duyệt từ phòng CTSV cho hoạt động CLB.",
    ],
    criteria: [
      "Ưu tiên các bạn có kỹ năng giao tiếp và đàm phán tốt. Sự tự tin, linh hoạt trong ứng xử với người lạ (nhất là người có chức vụ, nhà tài trợ) là một lợi thế lớn.",
      "Yêu cầu khả năng viết lách cơ bản để soạn thảo email, công văn, proposal chuyên nghiệp. Ngoài ra, cần sự cẩn thận và trung thực tuyệt đối trong quản lý tài chính.",
      "Bạn nào học ngành Kinh tế, Quản trị kinh doanh, Tài chính... sẽ có nền tảng tốt, nhưng những bạn ngành khác nếu khéo léo, có tinh thần trách nhiệm cao cũng rất phù hợp. Quan trọng là tư duy chủ động, dám nghĩ dám làm và biết đại diện cho CLB một cách chững chạc trước đối tác bên ngoài.",
    ],
    recruitmentCount: "5–6 thành viên",
    benefits: [
      "Bạn sẽ học được cách làm việc chuyên nghiệp với các đối tác, rèn luyện kỹ năng thương thuyết, ngoại giao trong môi trường an toàn (vì có sự hướng dẫn của các anh chị). Việc quản lý tài chính CLB giúp bạn hiểu thêm về ngân sách, sổ sách – những kiến thức thực tiễn hiếm khi có trong sách vở. Khi kết nối được một nhà tài trợ hay mời được một diễn giả xịn, đó sẽ là thành quả rất đáng tự hào cho bản thân bạn.",
      "Ngoài ra, các mối quan hệ bên ngoài mà bạn xây dựng được (anh chị doanh nghiệp, cộng đồng robotics ngoài trường) có thể mở ra nhiều cơ hội nghề nghiệp cho bạn sau này.",
    ],
    color: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-900",
      accent: "text-amber-700",
    },
  },
]
