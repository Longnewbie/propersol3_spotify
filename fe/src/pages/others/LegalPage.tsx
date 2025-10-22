import { Mail } from "lucide-react";

const LegalPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-zinc-800/50 p-8 rounded-lg shadow-lg border border-zinc-700/50 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Điều khoản Pháp lý
        </h1>

        <p className="text-zinc-300 mb-6 leading-relaxed text-center">
          Cập nhật lần cuối: 22/10/2025
        </p>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Giới thiệu
            </h2>
            <p>
              Chào mừng bạn đến với <strong>Soundwave</strong>. Khi truy cập
              hoặc sử dụng dịch vụ, bạn đồng ý tuân thủ các điều khoản và điều
              kiện được nêu trong trang này. Nếu bạn không đồng ý với bất kỳ
              phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Quyền sở hữu trí tuệ
            </h2>
            <p>
              Toàn bộ nội dung, thiết kế, logo, giao diện, mã nguồn, âm thanh và
              hình ảnh trên Soundwave đều thuộc quyền sở hữu của nhóm phát triển
              Soundwave hoặc các bên cấp phép hợp pháp. Bạn không được sao chép,
              sửa đổi, phân phối hoặc sử dụng các nội dung này mà không có sự
              cho phép bằng văn bản.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Tài khoản người dùng
            </h2>
            <p>
              Khi tạo tài khoản, bạn đồng ý cung cấp thông tin chính xác và cập
              nhật. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình và
              mọi hoạt động diễn ra dưới tài khoản của bạn.
            </p>
            <p>
              Soundwave có quyền tạm khóa hoặc xóa tài khoản nếu phát hiện hành
              vi vi phạm, gian lận hoặc gây ảnh hưởng xấu đến cộng đồng người
              dùng.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Sử dụng dịch vụ
            </h2>
            <p>
              Bạn đồng ý không sử dụng dịch vụ Soundwave cho các mục đích sau:
            </p>
            <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>
                Phát tán hoặc lưu trữ nội dung vi phạm bản quyền hoặc pháp luật.
              </li>
              <li>
                Can thiệp, phá hoại hoặc gây gián đoạn hoạt động của hệ thống.
              </li>
              <li>
                Lạm dụng dịch vụ để spam, thu thập dữ liệu hoặc tấn công người
                dùng khác.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Giới hạn trách nhiệm
            </h2>
            <p>
              Soundwave được cung cấp “như hiện tại” (as-is) và “theo khả năng”
              (as-available), không có bất kỳ bảo đảm nào về tính sẵn sàng, độ
              chính xác hoặc khả năng tương thích.
            </p>
            <p>
              Nhóm phát triển Soundwave không chịu trách nhiệm cho bất kỳ thiệt
              hại trực tiếp, gián tiếp, ngẫu nhiên hoặc hệ quả nào phát sinh từ
              việc sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Quyền thay đổi và chấm dứt dịch vụ
            </h2>
            <p>
              Soundwave có quyền chỉnh sửa, cập nhật hoặc chấm dứt một phần hoặc
              toàn bộ dịch vụ mà không cần thông báo trước. Mọi thay đổi về điều
              khoản sẽ được cập nhật tại trang này và có hiệu lực ngay khi công
              bố.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Chính sách bảo mật
            </h2>
            <p>
              Soundwave cam kết bảo mật thông tin cá nhân của người dùng. Mọi dữ
              liệu thu thập chỉ nhằm mục đích cải thiện trải nghiệm nghe nhạc và
              sẽ không được chia sẻ cho bên thứ ba nếu không có sự đồng ý của
              bạn.
            </p>
            <p>
              Bạn có thể xem chi tiết tại trang{" "}
              <span className="text-blue-400 hover:underline">
                Chính sách bảo mật
              </span>{" "}
              (Privacy Policy).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Liên hệ
            </h2>
            <p>
              Nếu bạn có câu hỏi hoặc khiếu nại liên quan đến điều khoản pháp
              lý, vui lòng liên hệ với chúng tôi qua:
            </p>
            <div className="flex items-center gap-1 text-zinc-400 mt-1">
              <Mail className="size-5" />{" "}
              <span className="text-white">lygialong201@gmail.com</span>
            </div>
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

export default LegalPage;
