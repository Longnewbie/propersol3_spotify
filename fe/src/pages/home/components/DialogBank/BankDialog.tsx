import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BankDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="mt-4 text-center lg:text-right cursor-pointer group">
            {" "}
            <p className="text-sm text-center text-zinc-500 mb-2 group-hover:text-zinc-300 transition-colors">
              {" "}
              Ủng hộ dự án:
            </p>
            <img
              src="/qrbank_me.png"
              alt="Mã QR Donate (nhấn để xem)"
              className="size-28 rounded-md object-cover border border-zinc-700 inline-block group-hover:border-zinc-500 transition-colors" // Added hover effect
            />
          </div>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-700 p-5 sm:p-6 w-[90vw] max-w-sm rounded-lg">
          {" "}
          <DialogHeader className="text-center mb-3 sm:mb-4">
            {" "}
            <DialogTitle className="text-lg sm:text-xl font-bold text-white">
              {" "}
              Quét mã để ủng hộ
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-zinc-400">
              Cảm ơn sự đóng góp của bạn!
            </DialogDescription>
          </DialogHeader>
          <img
            src="/qrbank_me.png"
            alt="Mã QR Donate"
            className="w-full h-auto rounded-lg border border-zinc-600"
          />
          <div className="mt-4 sm:mt-6 text-center space-y-1 sm:space-y-2">
            {" "}
            <p className="text-base sm:text-lg font-semibold text-white uppercase tracking-wide">
              Ly Gia Long
            </p>
            <p className="text-xs sm:text-sm text-zinc-300">
              STK:{" "}
              <span className="font-sans font-medium text-zinc-100">
                1902200400
              </span>{" "}
            </p>
            <p className="text-xs sm:text-sm font-medium text-zinc-400">
              Ngân hàng: MB Bank
            </p>
            <p className="text-xs text-zinc-500 pt-1 sm:pt-2">
              {" "}
              Quét mã hoặc nhập thông tin để thanh toán.
            </p>
            <p className="text-xs text-zinc-500 pt-3 sm:pt-4 border-t border-zinc-700/50 mt-3 sm:mt-4">
              {" "}
              Toàn bộ dự án được chia sẻ miễn phí nhằm mang lại giá trị cho cộng
              đồng. Nếu bạn thấy hữu ích, hãy ủng hộ để mình có thêm động lực
              duy trì và phát triển.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankDialog;
