document.addEventListener('DOMContentLoaded', function () {
  // Kiểm tra để tránh hiển thị popup khi đang ở trang ngôn ngữ
  const path = window.location.pathname;
  if (!path.includes('vi') && !path.includes('en')) {
      // Hiện popup + overlay + blur nội dung chính
      document.getElementById('language-popup').style.display = 'block';
      document.getElementById('language-popup-overlay').style.display = 'block';
      document.getElementById('main-content').classList.remove('language-selected');
  }
});

function loadContent(lang) {
// Ẩn popup (giữ overlay + blur)
document.getElementById('language-popup').style.display = 'none';
document.getElementById('loading-media').classList.add('fade-in');

// Hiện GIF loading + thêm hiệu ứng fade-in
const gif = document.getElementById('loading-media');
gif.classList.add('fade-in');
document.getElementById('loading-animation').style.display = 'block';

// Lấy tên repo tự động từ URL
const repoName = window.location.pathname.split('/')[1];

// Chuyển trang sau 3 giây
setTimeout(() => {
  // Đảm bảo redirect đúng với repoName và lang
  window.location.href = `/${repoName}/${lang}/index.html`;
}, 3000);
}
