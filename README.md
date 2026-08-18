# Sổ Chi Tiêu

Ứng dụng ghi chép thu chi cá nhân — chạy hoàn toàn trên máy bạn, không tài khoản, không máy chủ, không thu thập dữ liệu.

**Dùng ngay:** https://nguyentthlong.github.io/so-chi-tieu/

## Tính năng

- Ghi thu nhập / chi tiêu theo danh mục (icon + màu tùy chỉnh)
- Giao dịch định kỳ — tự sinh lại theo chu kỳ ngày/tuần/tháng/năm
- Đặt ngân sách theo tháng cho từng danh mục, cảnh báo khi sắp/đã vượt
- Thống kê theo tháng/6 tháng/năm/tùy chọn khoảng ngày, kèm biểu đồ
- Xuất/nhập dữ liệu (JSON, CSV); tự sao lưu trước khi xóa toàn bộ dữ liệu
- Chế độ sáng/tối
- Cài lên máy như app thật (PWA), dùng offline sau lần mở đầu tiên

## Cài lên điện thoại

Thêm biểu tượng app vào màn hình chính điện thoại — mở nhanh như app thật, dùng được cả khi mất mạng.

Mở link https://nguyentthlong.github.io/so-chi-tieu/ bằng trình duyệt trên điện thoại.

**Cách nhanh:** vào **Cài đặt → Cài app lên máy → Thêm vào Màn hình chính** trong app — trên Android (trình duyệt hỗ trợ) sẽ cài thẳng chỉ với 1 chạm; trên iPhone, Apple không cho phép cài tự động nên app sẽ chỉ đúng bước cần bấm thay vì bạn phải tự mò.

**Hoặc làm thủ công:**

**Android (Chrome)**
1. Nhấn menu ⋮ ở góc trên
2. Chọn "Thêm vào Màn hình chính" / "Cài đặt ứng dụng"

**iPhone (Safari)**
1. Từ iOS 26: nhấn "•••" cạnh thanh địa chỉ trước, rồi chọn Chia sẻ. Bản cũ hơn: nhấn thẳng nút Chia sẻ (hình vuông mũi tên lên)
2. Chọn "Thêm vào Màn hình chính"

Bản cập nhật mới của app có thể cần mở lại app 2 lần mới thấy, do cơ chế cache ngoại tuyến.

> Chỉ hoạt động khi mở qua link `https://...` ở trên — sẽ không hiện ra nếu bạn tải file `so-chi-tieu.html` về máy rồi mở trực tiếp.

## Dữ liệu của bạn

Toàn bộ dữ liệu (giao dịch, danh mục, ngân sách...) chỉ lưu trong trình duyệt trên chính thiết bị của bạn, không gửi đi đâu, không đồng bộ, không sao lưu đám mây. Vì vậy:

- Xóa dữ liệu trình duyệt hoặc gỡ app sẽ **mất hết dữ liệu** nếu chưa xuất file sao lưu.
- Nên dùng "Xuất dữ liệu (JSON)" trong Cài đặt định kỳ để tự sao lưu.
- Mở app cùng lúc trên nhiều tab/thiết bị **không đồng bộ** dữ liệu với nhau — app sẽ cảnh báo nếu phát hiện có tab khác đang mở.

## Chạy cục bộ / tự deploy

App là một file HTML tĩnh duy nhất (`so-chi-tieu.html`), không cần cài đặt hay build gì thêm:

```bash
git clone https://github.com/nguyentthlong/so-chi-tieu.git
```

Mở `so-chi-tieu.html` bằng trình duyệt là dùng được ngay. Riêng tính năng cài lên máy (PWA) cần host qua HTTPS hoặc `localhost` mới hoạt động — mở trực tiếp file trên máy sẽ không có tùy chọn cài đặt.

Muốn deploy bản của riêng bạn lên GitHub Pages: vào **Settings → Pages** của repo, chọn nhánh `main` và thư mục gốc (`/`).
