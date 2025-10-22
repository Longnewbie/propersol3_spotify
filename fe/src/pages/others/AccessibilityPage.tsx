const AccessibilityPage = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-zinc-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-zinc-700/50">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Hỗ trợ Tiếp cận
        </h1>

        <div className="space-y-5 text-zinc-300 leading-relaxed">
          <p>
            Soundwave cam kết mang đến trải nghiệm tốt nhất cho tất cả người
            dùng, bao gồm cả những người có nhu cầu đặc biệt về tiếp cận. Chúng
            tôi liên tục nỗ lực để cải thiện khả năng truy cập của trang web và
            ứng dụng.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              Các tính năng hỗ trợ
            </h2>
            <p>
              Chúng tôi tuân thủ các tiêu chuẩn tiếp cận web (WCAG), hỗ trợ điều
              hướng bằng bàn phím, tương thích với trình đọc màn hình và đảm bảo
              độ tương phản màu sắc phù hợp để giúp tất cả người dùng dễ dàng
              trải nghiệm.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Phản hồi</h2>
            <p>
              Nếu bạn gặp khó khăn trong việc truy cập Soundwave hoặc có đề xuất
              cải thiện, vui lòng liên hệ với chúng tôi qua{" "}
              <a
                href="mailto:lygialong201@gmail.com"
                className="text-blue-400 hover:underline"
              >
                lygialong201@gmail.com
              </a>
              .
            </p>
            <p className="text-zinc-400 text-sm mt-3">
              Thông tin chi tiết về tiêu chuẩn và nỗ lực hỗ trợ tiếp cận sẽ được
              cập nhật tại đây trong thời gian tới.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
