const CookiesPage = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10 scrollbar-hide">
      <div className="max-w-3xl mx-auto bg-zinc-800/60 p-8 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Chính sách Cookie
        </h1>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p>
            Trang web{" "}
            <span className="font-semibold text-white">Soundwave</span> sử dụng
            cookie và các công nghệ tương tự để mang đến cho bạn trải nghiệm tốt
            hơn, phân tích hành vi người dùng và cá nhân hóa nội dung hiển thị.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            1. Cookie là gì ?
          </h2>
          <p>
            Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn
            (máy tính, điện thoại, máy tính bảng) khi bạn truy cập một trang
            web. Chúng giúp trang web ghi nhớ các tùy chọn, lượt truy cập, và
            cải thiện hiệu suất hoạt động.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            2. Cách chúng tôi sử dụng Cookie
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-medium text-white">Cookie thiết yếu:</span>{" "}
              Giúp trang web hoạt động bình thường, ví dụ như đăng nhập, duy trì
              phiên làm việc, và bảo mật tài khoản.
            </li>
            <li>
              <span className="font-medium text-white">Cookie phân tích:</span>{" "}
              Giúp chúng tôi hiểu cách bạn tương tác với trang web (số lượt truy
              cập, thời gian ở lại trang, thiết bị sử dụng...) để cải thiện trải
              nghiệm người dùng.
            </li>
            <li>
              <span className="font-medium text-white">
                Cookie cá nhân hóa:
              </span>
              Lưu trữ tùy chọn người dùng (ngôn ngữ, chủ đề, playlist yêu
              thích...) để cá nhân hóa trải nghiệm.
            </li>
            <li>
              <span className="font-medium text-white">Cookie tiếp thị:</span>{" "}
              Hỗ trợ hiển thị quảng cáo phù hợp hơn với sở thích và hành vi của
              bạn.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            3. Quản lý Cookie
          </h2>
          <p>
            Bạn có thể kiểm soát và xóa cookie bất kỳ lúc nào trong phần cài đặt
            trình duyệt. Tuy nhiên, việc tắt cookie có thể ảnh hưởng đến một số
            tính năng hoặc trải nghiệm trên Soundwave.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            4. Cookie của bên thứ ba
          </h2>
          <p>
            Một số cookie có thể được đặt bởi các dịch vụ bên thứ ba mà chúng
            tôi sử dụng (ví dụ: Google Analytics, Cloudinary). Các bên này có
            thể sử dụng cookie để phân tích dữ liệu hoặc hiển thị quảng cáo
            ngoài Soundwave.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            5. Cập nhật Chính sách Cookie
          </h2>
          <p>
            Chính sách này có thể được cập nhật định kỳ để phản ánh thay đổi
            trong hoạt động hoặc quy định pháp luật. Phiên bản mới nhất sẽ luôn
            được công bố tại trang này.
          </p>

          <p className="pt-6 text-sm text-zinc-400 border-t border-zinc-700/50">
            Cập nhật lần cuối: 22/10/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;
