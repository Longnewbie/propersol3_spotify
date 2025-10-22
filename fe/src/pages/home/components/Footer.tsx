import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa6";
import BankDialog from "./DialogBank/BankDialog";

const FooterLink = ({
  href,
  children,
  newTab = true,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) => {
  const baseClass = "text-zinc-400 hover:text-white hover:underline text-sm";

  if (newTab) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={baseClass}>
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-zinc-700/50">
      {/* Phần 1: Các cột link và icon mạng xã hội */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 mb-8">
        {/* Grid 4 cột cho các link */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          {/* Cột 1: Công ty */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white mb-2">Công ty</h3>
            <FooterLink href="/about">Giới thiệu</FooterLink>
            <FooterLink href="/jobs">Việc làm</FooterLink>
            <FooterLink href="/for-the-record">For the Record</FooterLink>
          </div>

          {/* Cột 2: Cộng đồng */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white mb-2">Cộng đồng</h3>
            <FooterLink href="/artists">Dành cho các Nghệ sĩ</FooterLink>
            <FooterLink href="/developers">Nhà phát triển</FooterLink>
            <FooterLink href="/advertising">Quảng cáo</FooterLink>
            <FooterLink href="/investors">Nhà đầu tư</FooterLink>
            <FooterLink href="/vendors">Nhà cung cấp</FooterLink>
          </div>

          {/* Cột 3: Liên kết hữu ích */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white mb-2">Liên kết hữu ích</h3>
            <FooterLink href="/support">Hỗ trợ</FooterLink>
            <FooterLink href="/mobile-app">
              Ứng dụng Di động Miễn phí
            </FooterLink>
            <FooterLink href="/import">Import your music</FooterLink>
          </div>

          {/* Cột 4: Các gói của Soundwave */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white mb-2">Các gói của Soundwave</h3>
            <FooterLink href="/premium-individual">
              Premium Individual
            </FooterLink>
            <FooterLink href="/premium-student">Premium Student</FooterLink>
            <FooterLink href="/soundwave-free">Soundwave Free</FooterLink>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-4">
          <div className="flex gap-4 items-start">
            <a
              href="https://github.com/Longnewbie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/gia-long-801b4b2b0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.facebook.com/gialong.ly.79"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </a>
          </div>

          <BankDialog />
        </div>
      </div>

      {/* Các link pháp lý và Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 pb-8 border-t border-zinc-700/50">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs text-zinc-400">
          <FooterLink href="/legal">Pháp lý</FooterLink>
          <FooterLink href="/privacy-center">
            Trung tâm an toàn và quyền riêng tư
          </FooterLink>
          <FooterLink href="/privacy-policy">
            Chính sách quyền riêng tư
          </FooterLink>
          <FooterLink href="/cookies">Cookie</FooterLink>
          <FooterLink href="/ads">Giới thiệu Quảng cáo</FooterLink>
          <FooterLink href="/accessibility">Hỗ trợ tiếp cận</FooterLink>
        </div>

        <p className="text-xs text-zinc-400 flex-shrink-0">
          &copy; {new Date().getFullYear()} Soundwave
        </p>
      </div>
    </footer>
  );
};

export default Footer;
