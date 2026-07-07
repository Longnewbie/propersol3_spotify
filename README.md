# Dự án Spotify Clone

Một ứng dụng web full-stack lấy cảm hứng từ Spotify, với các tính năng tương tác theo thời gian thực, xác thực người dùng và phát trực tuyến phương tiện (media streaming).

## ✨ Các tính năng nổi bật (Features)

- **Xác thực & Quản lý người dùng**: Tích hợp Clerk cho đăng nhập, đăng ký và quản lý phiên người dùng an toàn.
- **Phát trực tuyến âm nhạc**: Phát các bài hát, hiển thị danh sách phát và phát theo từng album.
- **Tính năng Yêu thích (Favorites)**: Cho phép người dùng thêm các bài hát yêu thích vào danh sách cá nhân.
- **Trò chuyện trực tuyến (Real-time Chat)**: Nhắn tin và giao tiếp giữa các người dùng theo thời gian thực thông qua Socket.io.
- **Trang Quản trị (Admin Dashboard)**: Cung cấp giao diện quản trị riêng biệt để thêm, xóa và chỉnh sửa thông tin bài hát, album.
- **Tải lên phương tiện**: Hỗ trợ quản lý hình ảnh và upload các file audio trực tiếp thông qua Cloudinary.
- **Thống kê (Statistics)**: Thống kê hệ thống về số lượng bài hát, người dùng và album hiện có.

## 🏗 Kiến trúc (Architecture)

Dự án này tuân theo kiến trúc Client-Server hiện đại với sự phân chia trách nhiệm rõ ràng.

- **Frontend (Client)**: Được xây dựng bằng React và Vite. Frontend xử lý giao diện người dùng, quản lý state và định tuyến (routing). Nó giao tiếp với backend thông qua REST APIs và WebSocket (Socket.io) để cập nhật dữ liệu theo thời gian thực.
- **Backend (Server)**: Được xây dựng bằng Node.js và Express đóng vai trò là API gateway. Xử lý logic nghiệp vụ, các thao tác với cơ sở dữ liệu, tích hợp dịch vụ của bên thứ ba và các kết nối socket thời gian thực. Backend được cấu trúc theo mô hình MVC.
- **Cơ sở dữ liệu (Database)**: MongoDB được sử dụng làm cơ sở dữ liệu NoSQL chính, với Mongoose hoạt động như thư viện Object Data Modeling (ODM).
- **Lưu trữ phương tiện (Media Storage)**: Cloudinary được tích hợp để tối ưu hoá việc tải lên, lưu trữ và phân phối các tệp phương tiện như hình ảnh và âm thanh.

### Cấu trúc thư mục Backend
- `src/models/`: Các schema Mongoose định nghĩa cấu trúc dữ liệu.
- `src/controller/`: Logic nghiệp vụ cốt lõi xử lý các request và gửi response.
- `src/routes/`: Định nghĩa các API endpoint và ánh xạ URL đến các controller tương ứng.
- `src/middleware/`: Các middleware của Express dành cho các tác vụ như kiểm tra request và bảo vệ route.
- `src/lib/` & `src/helper/`: Các hàm tiện ích dùng chung, thiết lập kết nối cơ sở dữ liệu và file cấu hình.
- `src/seeds/`: Các script để thêm dữ liệu mẫu vào cơ sở dữ liệu (ví dụ: albums, bài hát).

## 🚀 Công nghệ sử dụng (Technologies Used)

### Frontend (`/fe`)
- **Cốt lõi**: React 18, Vite, TypeScript
- **CSS / Style**: Tailwind CSS (kết hợp `tailwind-merge` và `clsx` để quản lý class)
- **UI Components**: Radix UI (các primitive dễ tiếp cận, không style sẵn), Lucide React (icons)
- **Quản lý State**: Zustand
- **Định tuyến (Routing)**: React Router DOM v7
- **Xác thực (Authentication)**: Clerk (`@clerk/clerk-react`)
- **Thời gian thực (Real-time)**: Socket.io Client
- **Lấy dữ liệu (Data Fetching)**: Axios
- **Form/UI phụ trợ**: `react-resizable-panels`, `react-hot-toast`

### Backend (`/be`)
- **Cốt lõi**: Node.js, Express.js
- **Cơ sở dữ liệu**: MongoDB, Mongoose
- **Xác thực**: Clerk (`@clerk/express`)
- **Thời gian thực**: Socket.io
- **Xử lý tệp (File Handling)**: `express-fileupload`, Cloudinary
- **Cron Jobs**: `node-cron` (cho các tác vụ chạy ngầm định kỳ)
- **Công cụ phát triển**: Nodemon