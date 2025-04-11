document.addEventListener('DOMContentLoaded', function() {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    const languagePopup = document.getElementById('language-popup');
    const languagePopupOverlay = document.getElementById('language-popup-overlay');
    const mainContent = document.getElementById('main-content');

    console.log("Ngôn ngữ đã lưu:", selectedLanguage); // Debug kiểm tra trạng thái lưu trữ

    // Nếu đã chọn ngôn ngữ, tải nội dung bằng fetch() thay vì hiển thị pop-up
    if (selectedLanguage === 'en') {
        loadContent('en');
    } else if (selectedLanguage === 'vi') {
        loadContent('vi');
    } else {
        // Nếu chưa chọn ngôn ngữ, hiển thị pop-up
        languagePopup.style.display = 'block';
        languagePopupOverlay.style.display = 'block';
        mainContent.classList.add('language-selected');
    }
});

function loadContent(lang) {
    localStorage.setItem('selectedLanguage', lang); // Lưu lựa chọn ngôn ngữ

    const languagePopup = document.getElementById('language-popup');
    const languagePopupOverlay = document.getElementById('language-popup-overlay');
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingMedia = document.getElementById('loading-media');
    const mainContent = document.getElementById('main-content');

    languagePopup.classList.add('hidden'); // Ẩn pop-up bằng opacity thay vì display: none
    languagePopupOverlay.classList.add('hidden');
    loadingAnimation.style.display = 'block';

    // Kiểm tra lại đường dẫn GIF loading
    let gifPath = '/mypor-v3-2/video/Test-character-hi.gif';
    loadingMedia.src = gifPath;

    let fetchUrl = lang === 'en' ? '/mypor-v3-2/en/index.html' : '/mypor-v3-2/vi/index.html';

    console.log("Đang fetch nội dung từ:", fetchUrl); // Debug kiểm tra URL fetch

    fetch(fetchUrl)
        .then(response => {
            if (!response.ok) throw new Error(`Lỗi tải nội dung (${lang})`);
            return response.text();
        })
        .then(html => {
            loadingAnimation.style.display = 'none';
            mainContent.innerHTML = html;
            mainContent.classList.add('language-selected');

            // Ẩn pop-up ngay sau khi nội dung load xong
            document.getElementById('language-popup').style.display = 'none';
            document.getElementById('language-popup-overlay').style.display = 'none';

            history.pushState(null, '', fetchUrl);
        })
        .catch(error => {
            console.error("Fetch thất bại:", error);
            alert(`Không thể tải phiên bản ngôn ngữ (${lang}).`);
            window.location.href = fetchUrl; // Điều hướng khi fetch thất bại
        });
	document.getElementById('language-popup').style.display = 'none';
document.getElementById('language-popup-overlay').style.display = 'none';

}
