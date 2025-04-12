document.addEventListener('DOMContentLoaded', function () {
  const languageSwitcher = document.getElementById('language-switcher');

  // Xác định ngôn ngữ hiện tại qua URL
  const currentPath = window.location.pathname;
  const currentLang = currentPath.includes('/vi/') ? 'vi' : 'en';

  // Đặt giá trị mặc định cho dropdown
  languageSwitcher.value = currentLang;

  // Khi người dùng chọn ngôn ngữ khác
  languageSwitcher.addEventListener('change', function () {
    const selectedLang = this.value;
    // Nếu người dùng đã đang ở đúng ngôn ngữ thì không làm gì
    if (selectedLang === currentLang) return;

    // Điều hướng sang ngôn ngữ mới
    const targetPage = window.location.pathname.split('/').pop(); // lấy tên file index.html
    window.location.href = `/${selectedLang}/${targetPage}`;
  });
});