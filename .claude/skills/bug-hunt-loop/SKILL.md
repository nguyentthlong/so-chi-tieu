---
name: bug-hunt-loop
description: Vòng lặp tự động TÌM bug -> SỬA bug -> XÁC MINH bug cho so-chi-tieu.html (app sổ chi tiêu offline, không backend). Luân phiên nhiều kỹ thuật tìm bug (đọc lại từng khu vực chức năng, liệt kê edge case, đối chiếu bất biến, so khớp 2 nơi tính cùng 1 con số, research internet cho các quyết định business logic), sửa tối thiểu đúng style hiện có, verify bằng node --check + test tái hiện trong Browser pane, rồi lặp lại cho đến khi 1 vòng đầy đủ không tìm ra bug mới. Dùng khi được yêu cầu "tìm bug", "soát bug", "kiểm tra lỗi logic" cho app này, đặc biệt khi được yêu cầu lặp lại nhiều vòng hoặc tự chạy đến khi hết bug.
---

# Bug Hunt Loop — Sổ Chi Tiêu

## Phạm vi
`so-chi-tieu.html` (toàn bộ `<script>` — data layer, recurring engine, budget, transactions, stats/charts, category CRUD, import/export, settings), và `manifest.json` / `service-worker.js` khi liên quan đến hành vi PWA.

## Nguyên tắc chung
- Chỉ báo/sửa **bug thật**: phải nêu được kịch bản cụ thể "input/state nào → hành vi sai gì". Không đoán mò, không suy diễn "có thể lỗi".
- Không refactor, không thêm tính năng, không "dọn dẹp" ngoài phạm vi bug đang sửa. Ba dòng lặp lại vẫn tốt hơn một abstraction sớm.
- Giữ nguyên style code hiện có: toast tiếng Việt ngắn gọn, comment giải thích **WHY** (lý do không hiển nhiên) chứ không giải thích WHAT, không thêm validation/error-handling cho tình huống không thể xảy ra.
- Mỗi bug sửa xong **phải** verify trước khi coi là xong việc.

## Vòng lặp (1 iteration)

### Bước 1 — TÌM
Mỗi vòng chọn 1-2 kỹ thuật **chưa dùng gần đây** trong số:

1. **Đọc lại 1 khu vực chức năng với góc nhìn mới** — chọn 1 khu vực còn lại trong danh sách: data layer & storage, recurring engine (`occurrenceDate`/`generateDueRecurring`), budget screen, transaction modal & list, stats/charts, category CRUD & reorder, import/export, settings, PWA (manifest/service-worker).
2. **Liệt kê edge case có hệ thống**: giá trị biên (0, âm, rất lớn, thập phân, NaN/Infinity), trạng thái rỗng (0 category/0 transaction), hành động trùng/đua nhau (double-tap, 2 tab cùng mở), timezone/locale, ngày cuối tháng/năm nhuận, JSON import bị chỉnh tay, localStorage đầy/bị chặn, ký tự đặc biệt/Unicode/emoji trong tên tự nhập.
3. **Đối chiếu bất biến (invariants)**: với mỗi chỗ mutate `transactions`/`categories`/`budgets`/`recurringRules`/`settings`, rà mọi chỗ ĐỌC hoặc GIẢ ĐỊNH điều gì đó về state đó — tìm giả định nào đã sai sau khi state đổi.
4. **So khớp 2 nơi tính cùng 1 con số theo 2 đường khác nhau** (ví dụ: tổng ở summary card vs tổng cộng dồn trong chart; tổng ngân sách vs tổng từng dòng) — hai đường phải luôn cho cùng kết quả với mọi state hợp lệ.
5. **Research internet cho quyết định business logic**: cách tính ngân sách/rollover, cách sinh giao dịch định kỳ, làm tròn tiền tệ, xử lý múi giờ, referential integrity giữa transaction/category/budget/recurring — tra cứu cách các app quản lý chi tiêu phổ biến (Money Lover, Money Manager, YNAB, Mint...) xử lý các case tương tự và các lỗi thường gặp đã biết ở loại app này, đối chiếu xem app hiện tại có mắc lỗi tương tự không. Dùng WebSearch, không đoán.

Ghi lại (trong đầu hoặc tạm) kỹ thuật đã dùng ở các vòng trước để không lặp lại vô ích.

### Bước 2 — SỬA
- Sửa tối thiểu, đúng chỗ phát sinh lỗi, không lan ra chỗ khác.
- Thêm đúng 1 dòng/1 đoạn comment giải thích WHY nếu lý do sửa không hiển nhiên khi đọc lại code sau này.

### Bước 3 — XÁC MINH
- Trích `<script>` ra file tạm, chạy `node --check` — đảm bảo không lỗi cú pháp.
- Mở file trong Browser pane (`mcp__Claude_Browser__navigate` tới `file:///...`), dùng `javascript_tool` để dựng đúng kịch bản tái hiện bug: chứng minh (a) hành vi sai trước khi sửa (bằng cách mô phỏng lại phép tính cũ hoặc dùng lịch sử) và (b) hành vi đúng sau khi sửa.
- Kiểm tra `read_console_messages` không phát sinh lỗi mới.

### Bước 4 — LẶP LẠI
Quay lại Bước 1 với kỹ thuật khác chưa dùng.

## Điều kiện dừng
Dừng khi **một vòng đầy đủ** — đã lần lượt thử hết cả 5 kỹ thuật ở Bước 1, kể cả research internet — không tìm ra bug mới nào. Khi dừng, báo cáo:
- Danh sách bug đã tìm/sửa/verify trong phiên (kèm vị trí file:dòng).
- Những kỹ thuật đã dùng để đi đến kết luận "hết bug".
- Bất kỳ nghi vấn mức độ thấp/không chắc chắn nào cố ý bỏ qua, kèm lý do.
