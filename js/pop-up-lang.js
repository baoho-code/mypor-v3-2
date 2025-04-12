document.addEventListener('DOMContentLoaded', function () {
    // Hiện popup + overlay + blur nội dung chính
    document.getElementById('language-popup').style.display = 'block';
    document.getElementById('language-popup-overlay').style.display = 'block';
    document.getElementById('main-content').classList.remove('language-selected');
  });
function loadContent(lang) {
  // Ẩn popup (giữ overlay + blur)
  document.getElementById('language-popup').style.display = 'none';
	document.getElementById('loading-media').classList.add('fade-in');


  // Hiện GIF loading + thêm hiệu ứng fade-in
  const gif = document.getElementById('loading-media');
  gif.classList.add('fade-in');
  document.getElementById('loading-animation').style.display = 'block';

  // Chuyển trang sau 3 giây
  setTimeout(() => {
    window.location.href = `/${lang}/index.html`;
  }, 3000);
}
