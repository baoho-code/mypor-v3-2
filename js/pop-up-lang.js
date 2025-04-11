document.addEventListener('DOMContentLoaded', function() {
  const languagePopup = document.getElementById('language-popup');
  const languagePopupOverlay = document.getElementById('language-popup-overlay');
  const mainContent = document.getElementById('main-content');

  // Kiểm tra nếu popup đã bị đóng, thì không hiển thị lại
  if (!localStorage.getItem('popupClosed')) {
    languagePopup.style.display = 'block';
    languagePopupOverlay.style.display = 'block';
    mainContent.classList.add('language-selected');
  }
});

function loadContent(lang) {
    const languagePopup = document.getElementById('language-popup');
    const languagePopupOverlay = document.getElementById('language-popup-overlay');
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingMedia = document.getElementById('loading-media');
    const mainContent = document.getElementById('main-content');

    // Đánh dấu popup đã bị đóng
    localStorage.setItem('popupClosed', 'true');

    languagePopup.style.display = 'none';
    languagePopupOverlay.style.display = 'none';
    loadingAnimation.style.display = 'block';
    loadingMedia.src = 'video/Test-character-hi.gif';

    let fetchUrl = lang === 'en' ? 'https://baoho-code.github.io/my-por-v3-2/en/index.html' : 'https://baoho-code.github.io/my-por-v3-2/vi/index.html';

    fetch(fetchUrl)
        .then(response => {
            if (!response.ok) throw new Error(`Lỗi tải nội dung (${lang})`);
            return response.text();
        })
        .then(html => {
            loadingAnimation.style.display = 'none';
            mainContent.innerHTML = html;
            mainContent.classList.add('language-selected');
            history.pushState(null, '', fetchUrl); // Cập nhật URL mà không reload
        })
        .catch(error => {
            console.error(error);
            alert(`Không thể tải phiên bản ngôn ngữ (${lang}).`);
            window.location.href = fetchUrl;
        });
}

// JavaScript Document