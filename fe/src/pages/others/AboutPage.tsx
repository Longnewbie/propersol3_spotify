const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-zinc-800/50 p-8 rounded-lg shadow-lg border border-zinc-700/50">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Giới thiệu về Soundwave
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
          Chào mừng bạn đến với Soundwave! Dự án này được tạo ra với mục tiêu
          mang lại một trải nghiệm nghe nhạc chất lượng và hoàn toàn miễn phí
          cho cộng đồng.
        </p>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
          Toàn bộ dự án được chia sẻ miễn phí nhằm mang lại giá trị cho cộng
          đồng yêu nhạc. Mình tin rằng âm nhạc là một phần không thể thiếu của
          cuộc sống và mọi người đều xứng đáng có quyền truy cập dễ dàng vào nó.
        </p>

        <hr className="border-zinc-700 my-8" />

        <div className="text-center">
          <p className="text-sm text-zinc-400 mb-2">
            Dự án được phát triển bởi:
          </p>
          <p className="text-xl font-semibold text-white">Lý Gia Long</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
