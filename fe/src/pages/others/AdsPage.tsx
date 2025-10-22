const AdsPage = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10 scrollbar-hide">
      <div className="max-w-3xl mx-auto bg-zinc-800/60 p-8 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Giới thiệu về Quảng cáo trên Soundwave
        </h1>

        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p>
            <span className="font-semibold text-white">Soundwave</span> duy trì
            dịch vụ miễn phí cho người dùng bằng cách hiển thị một số quảng cáo
            trong nền tảng. Chúng tôi nỗ lực đảm bảo rằng quảng cáo luôn phù
            hợp, an toàn và không gây ảnh hưởng tiêu cực đến trải nghiệm nghe
            nhạc của bạn.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            1. Cách hoạt động của quảng cáo
          </h2>
          <p>
            Quảng cáo trên Soundwave có thể được hiển thị dựa trên các yếu tố
            như:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Thông tin cơ bản bạn cung cấp (ví dụ: ngôn ngữ, khu vực, độ tuổi
              tổng hợp).
            </li>
            <li>
              Sở thích nghe nhạc của bạn hoặc thể loại bạn thường phát — chỉ ở
              dạng tổng hợp và ẩn danh.
            </li>
            <li>
              Dữ liệu từ cookie, pixel hoặc công nghệ tương tự giúp đo lường
              hiệu quả quảng cáo.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            2. Loại quảng cáo hiển thị
          </h2>
          <p>
            Soundwave có thể hiển thị nhiều loại quảng cáo khác nhau, bao gồm:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Quảng cáo âm thanh giữa các bản nhạc hoặc playlist.</li>
            <li>Banner hoặc hình ảnh hiển thị trong giao diện người dùng.</li>
            <li>Đề xuất thương hiệu hoặc sự kiện liên quan đến âm nhạc.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            3. Dữ liệu được sử dụng cho quảng cáo
          </h2>
          <p>
            Chúng tôi không chia sẻ thông tin cá nhân định danh (như tên, email,
            số điện thoại) cho đối tác quảng cáo. Các dữ liệu được xử lý ở mức
            tổng hợp và tuân thủ nghiêm ngặt theo{" "}
            <span className="text-white font-medium">
              Chính sách Quyền riêng tư
            </span>{" "}
            của Soundwave.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            4. Lựa chọn và kiểm soát của bạn
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Bạn có thể điều chỉnh tùy chọn cookie hoặc cá nhân hóa quảng cáo
              trong phần Cài đặt.
            </li>
            <li>
              Có thể chọn tắt các quảng cáo cá nhân hóa (nếu được hỗ trợ).
            </li>
            <li>
              Chúng tôi luôn tôn trọng lựa chọn của người dùng và tuân thủ các
              quy định bảo vệ dữ liệu.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white pt-4">
            5. Đối tác quảng cáo
          </h2>
          <p>
            Một số quảng cáo có thể được cung cấp thông qua các nền tảng trung
            gian như Google Ads hoặc Meta Audience Network. Các đối tác này có
            chính sách riêng về quyền riêng tư và cookie mà bạn có thể tham khảo
            trên trang của họ.
          </p>

          <h2 className="text-xl font-semibold text-white pt-4">
            6. Cập nhật Chính sách
          </h2>
          <p>
            Chính sách quảng cáo có thể được cập nhật khi có thay đổi về mô hình
            hiển thị, công nghệ hoặc yêu cầu pháp lý. Phiên bản mới nhất sẽ luôn
            được công bố tại đây.
          </p>

          <p className="pt-6 text-sm text-zinc-400 border-t border-zinc-700/50">
            Cập nhật lần cuối: 22/10/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
