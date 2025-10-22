import { Clock, Mail } from "lucide-react";

const SafetyPrivacyCenterPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-zinc-800/50 p-8 rounded-lg shadow-lg border border-zinc-700/50 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Trung tâm An toàn & Quyền riêng tư
        </h1>

        <p className="text-zinc-300 mb-6 leading-relaxed text-center">
          Cập nhật lần cuối: 22/10/2025
        </p>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          {/* Giới thiệu */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Giới thiệu
            </h2>
            <p>
              Tại <strong>Soundwave</strong>, chúng tôi đặt sự an toàn và quyền
              riêng tư của bạn lên hàng đầu. Trang này được tạo ra để giúp bạn
              hiểu rõ cách chúng tôi bảo vệ dữ liệu, duy trì môi trường lành
              mạnh và cung cấp cho bạn các công cụ kiểm soát trải nghiệm cá
              nhân.
            </p>
          </section>

          {/* An toàn người dùng */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. An toàn cho người dùng
            </h2>
            <p>
              Chúng tôi luôn nỗ lực duy trì môi trường nghe nhạc tích cực, nơi
              mọi người có thể chia sẻ và thưởng thức nội dung một cách an toàn.
              Các biện pháp chính bao gồm:
            </p>
            <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>
                Hệ thống tự động phát hiện nội dung không phù hợp hoặc vi phạm
                bản quyền.
              </li>
              <li>
                Tính năng báo cáo (report) nội dung và người dùng vi phạm.
              </li>
              <li>
                Các hướng dẫn cộng đồng giúp duy trì môi trường tôn trọng và
                thân thiện.
              </li>
            </ul>
          </section>

          {/* Bảo mật dữ liệu */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Bảo mật dữ liệu
            </h2>
            <p>
              Dữ liệu của bạn được mã hóa và lưu trữ an toàn theo các tiêu chuẩn
              công nghệ mới nhất. Chúng tôi chỉ thu thập thông tin cần thiết để
              cung cấp trải nghiệm nghe nhạc tốt nhất.
            </p>
            <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>
                Không bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba mà không
                có sự đồng ý của bạn.
              </li>
              <li>
                Thông tin nhạy cảm (như mật khẩu) được mã hóa trước khi lưu trữ.
              </li>
              <li>
                Chúng tôi thường xuyên kiểm tra hệ thống để đảm bảo tính bảo mật
                và tuân thủ các quy định pháp luật.
              </li>
            </ul>
          </section>

          {/* Quyền kiểm soát của người dùng */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Quyền kiểm soát của bạn
            </h2>
            <p>
              Bạn có toàn quyền kiểm soát dữ liệu và trải nghiệm của mình trên
              Soundwave:
            </p>
            <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>
                Chỉnh sửa hoặc xóa tài khoản bất kỳ lúc nào trong phần{" "}
                <strong>Cài đặt tài khoản</strong>.
              </li>
              <li>
                Quản lý dữ liệu cá nhân, danh sách phát, hoặc lịch sử nghe nhạc
                của bạn.
              </li>
              <li>
                Điều chỉnh tùy chọn quyền riêng tư để kiểm soát ai có thể xem
                hoạt động của bạn.
              </li>
            </ul>
          </section>

          {/* Báo cáo và hỗ trợ */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Báo cáo & Hỗ trợ
            </h2>
            <p>
              Nếu bạn phát hiện nội dung không an toàn, vi phạm hoặc muốn báo
              cáo hành vi lạm dụng, vui lòng sử dụng công cụ báo cáo tích hợp
              trong ứng dụng hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của chúng
              tôi.
            </p>

            <div className="flex items-center gap-1 text-zinc-400 mt-2">
              <Mail className="size-5" />{" "}
              <span className="text-white">lygialong201@gmail.com</span>
            </div>

            <div className="flex items-center gap-1 text-zinc-400 mt-2">
              <Clock className="size-5" />{" "}
              <span className="text-white">
                Thời gian phản hồi trung bình: 24–48 giờ làm việc.
              </span>
            </div>
          </section>

          {/* Cam kết & cập nhật */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Cam kết & Cập nhật
            </h2>
            <p>
              Chúng tôi luôn cải thiện các chính sách an toàn và quyền riêng tư
              để bảo vệ bạn tốt hơn. Mọi thay đổi quan trọng sẽ được thông báo
              tại trang này hoặc qua email đăng ký của bạn.
            </p>
          </section>

          <hr className="border-zinc-700 my-8" />

          <p className="text-center text-sm text-zinc-500">
            © 2025 Soundwave. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyPrivacyCenterPage;
