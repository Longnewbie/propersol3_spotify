const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10 scrollbar-hide">
      <div className="max-w-3xl mx-auto bg-zinc-800/60 p-8 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Chính sách Quyền riêng tư
        </h1>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p>
            Chính sách Quyền riêng tư này mô tả cách{" "}
            <span className="font-semibold text-white">Soundwave</span> ("chúng
            tôi") thu thập, sử dụng và chia sẻ thông tin cá nhân của bạn khi bạn
            sử dụng dịch vụ của chúng tôi. Bằng việc truy cập hoặc sử dụng
            Soundwave, bạn đồng ý với các điều khoản của chính sách này.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            1. Thông tin chúng tôi thu thập
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-medium text-white">
                Thông tin bạn cung cấp:
              </span>{" "}
              Họ tên, địa chỉ email, ảnh đại diện, và nội dung bạn tải lên (ví
              dụ: bài hát, bình luận...).
            </li>
            <li>
              <span className="font-medium text-white">
                Thông tin tự động thu thập:
              </span>{" "}
              Bao gồm địa chỉ IP, loại thiết bị, trình duyệt, và hoạt động nghe
              nhạc của bạn.
            </li>
            <li>
              <span className="font-medium text-white">
                Thông tin từ bên thứ ba:
              </span>{" "}
              Nếu bạn đăng nhập bằng tài khoản Google, Facebook hoặc Spotify,
              chúng tôi có thể nhận một số thông tin cơ bản từ nền tảng đó.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            2. Cách chúng tôi sử dụng thông tin
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Cung cấp và cải thiện trải nghiệm người dùng trên Soundwave.
            </li>
            <li>Cá nhân hóa nội dung gợi ý nhạc và playlist.</li>
            <li>
              Phát hiện, ngăn chặn hành vi gian lận hoặc vi phạm điều khoản.
            </li>
            <li>
              Liên hệ khi có cập nhật, thay đổi hoặc thông báo quan trọng.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            3. Chia sẻ thông tin
          </h2>
          <p>
            Chúng tôi chỉ chia sẻ thông tin cá nhân khi cần thiết để vận hành
            dịch vụ (ví dụ: lưu trữ đám mây, phân tích dữ liệu, tích hợp API),
            và luôn tuân thủ quy định bảo mật nghiêm ngặt.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            4. Quyền của bạn
          </h2>
          <p>
            Bạn có quyền truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình.
            Hãy liên hệ với chúng tôi qua mục{" "}
            <span className="font-medium text-white">Hỗ trợ</span> nếu bạn muốn
            thực hiện quyền này.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            5. Cập nhật Chính sách
          </h2>
          <p>
            Chúng tôi có thể cập nhật Chính sách này định kỳ. Phiên bản mới nhất
            sẽ luôn được công bố trên trang này kèm theo ngày hiệu lực.
          </p>

          <p className="pt-6 text-sm text-zinc-400 border-t border-zinc-700/50">
            Cập nhật lần cuối: 22/10/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
