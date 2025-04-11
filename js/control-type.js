// JavaScript Document
var typed = new Typed('.element', {
               	strings: ["Web Designer.", "Graphic Designer.","Apps Designer."],
       	 	typeSpeed:50,
        		backSpeed:50,
        		loop:true,
        		});
document.getElementById("demo").onclick = function() {myFunction()};
function myFunction() {
  document.getElementById("demo1").classList.toggle("show"); document.getElementById("demo").classList.toggle("hide")
}

$('.timeline-panel').click(function() {
    $('.timeline-body', this).toggle(); // Toggle nội dung
    $(this).closest('li').toggleClass('active'); // Thêm/xóa class active cho li cha
});


// Control count up

$('.counter').countUp();
// Code cũ của bạn
$('.knc-per').hover(
    function() {
        $('.hover-content').fadeIn(300);
    },
    function() {
        $('.hover-content').fadeOut(300);
    }
);

// Thêm code mới cho counter
$(document).ready(function() {
    // Lưu giá trị ban đầu của counter
    $('.counter').each(function() {
        $(this).data('original-value', $(this).text());
    });
});

// Hàm reset và chạy lại counter
function resetAndCount(element) {
    // Reset counter về giá trị ban đầu
    $(element).find('.counter').each(function() {
        $(this).text($(this).data('original-value'));
    });
    
    // Chạy lại counter
    $(element).find('.counter').countUp({
        time: 1000,
        delay: 10
    });
}

// Thêm xử lý counter vào hover event cho knc-1
$('.knc-1').hover(
    function() {
        $('.hover-content').fadeIn(300);
        resetAndCount(this); // Truyền element hiện tại vào hàm
    },
    function() {
        $('.hover-content').fadeOut(300);
    }
);

// Pop-up language



// Khởi tạo Carousel
document.addEventListener('DOMContentLoaded', function() {

    // --- Shared Modal Setup ---
    console.log("Setting up shared modals...");
    const imageModalElement = document.getElementById('imageModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const videoModalElement = document.getElementById('videoModal'); // Get Video Modal
    const youtubeIframe = document.getElementById('youtubeIframe'); // Get Iframe

    // Check Image Modal Elements
    if (!imageModalElement) {
        console.error("ERROR: Image Modal container element with id 'imageModal' NOT FOUND!");
    }
    if (!fullscreenImage) {
        console.error("ERROR: Image element with id 'fullscreenImage' inside modal NOT FOUND!");
    }
    // Check Video Modal Elements
    if (!videoModalElement) {
        console.error("ERROR: Video Modal container element with id 'videoModal' NOT FOUND!");
    }
     if (!youtubeIframe) {
        console.error("ERROR: Iframe element with id 'youtubeIframe' inside video modal NOT FOUND!");
    }

    // Initialize modal instances only if elements are found
    const sharedImageModalInstance = (imageModalElement && fullscreenImage) ? new bootstrap.Modal(imageModalElement) : null;
    const sharedVideoModalInstance = (videoModalElement && youtubeIframe) ? new bootstrap.Modal(videoModalElement) : null; // Video Modal Instance

    if (sharedImageModalInstance) {
        console.log("SUCCESS: Shared image modal instance created.");
        // Add listener to clear image when image modal hides
        imageModalElement.addEventListener('hidden.bs.modal', function() {
            if (fullscreenImage) fullscreenImage.src = '';
        });
    } else {
        console.error("FAILED: Could not create shared image modal instance.");
    }

    if (sharedVideoModalInstance) {
        console.log("SUCCESS: Shared video modal instance created.");
        // Add listener to clear iframe when video modal hides (stops video)
        videoModalElement.addEventListener('hidden.bs.modal', function () {
            if (youtubeIframe) youtubeIframe.src = '';
        });
    } else {
        console.error("FAILED: Could not create shared video modal instance.");
    }

    // --- Carousel Initialization Logic ---
    const carouselSections = document.querySelectorAll('.carousel-section');
    let resizeTimeout;

    // Function to initialize or re-initialize a specific carousel
    function setupCarousel(carouselElement) {
        if (!carouselElement) return;
        const carouselId = carouselElement.id;
        console.log(`Setting up or recalculating for: ${carouselId}`);

        const carouselInner = carouselElement.querySelector('.thumbnails-wrapper');
        const items = carouselInner ? carouselInner.querySelectorAll('.col') : [];
        const carouselContainer = carouselElement.closest('.carousel-container');
        const prevButton = carouselContainer ? carouselContainer.querySelector('.carousel-control-prev') : null;
        const nextButton = carouselContainer ? carouselContainer.querySelector('.carousel-control-next') : null;
        const indicatorContainer = carouselContainer ? carouselContainer.querySelector('.custom-indicators') : null;
        const indicators = indicatorContainer ? indicatorContainer.querySelectorAll('button') : [];

        // --- Safety Check ---
        if (!carouselInner || !prevButton || !nextButton || items.length === 0 || carouselElement.offsetWidth === 0) {
            console.warn(`Carousel ${carouselId}: Missing elements, no items, or hidden. Cannot initialize/recalculate.`);
            if(prevButton) prevButton.disabled = true;
            if(nextButton) nextButton.disabled = true;
            delete carouselElement.carouselState; // Clear potentially outdated state
            return;
        }

        // --- State Variables (Attached directly to the DOM element) ---
        if (!carouselElement.carouselState) {
             carouselElement.carouselState = { currentPosition: 0 };
        }
        let state = carouselElement.carouselState;

        // --- Calculations ---
        const containerWidth = carouselElement.offsetWidth;
        // Check if items[0] exists before accessing offsetWidth
         if (!items[0]) {
             console.error(`Carousel ${carouselId} has no items to measure.`);
             return; // Cannot proceed without items
         }
        state.thumbnailWidth = items[0].offsetWidth;
        state.gap = 20;
        state.totalWidth = state.thumbnailWidth + state.gap;
        const totalContentWidth = (items.length * state.thumbnailWidth) + ((items.length - 1) * state.gap);
        state.maxPosition = Math.min(0, containerWidth - totalContentWidth);

        console.log(`Carousel ${carouselId} Params: containerW=${containerWidth}, thumbW=${state.thumbnailWidth}, totalContentW=${totalContentWidth.toFixed(2)}, maxPos=${state.maxPosition.toFixed(2)}`);

        // --- Core Functions (Use 'state') ---
        function updateCarouselPosition() {
            if (typeof state.totalWidth === 'undefined' || state.totalWidth === 0) return;
            state.currentPosition = Math.max(state.maxPosition, Math.min(0, state.currentPosition));
            carouselInner.style.transform = `translateX(${state.currentPosition.toFixed(2)}px)`;
            updateButtonState();
            updateActiveIndicator();
        }

        function updateButtonState() {
            if (typeof state.currentPosition === 'undefined' || typeof state.maxPosition === 'undefined') return;
            if(prevButton) prevButton.disabled = state.currentPosition >= -1;
            if(nextButton) nextButton.disabled = state.currentPosition <= state.maxPosition + 1;
        }

        function updateActiveIndicator() {
            // Check if state is initialized before using it
            if (indicators.length === 0 || !carouselElement.carouselState || typeof state.totalWidth === 'undefined' || state.totalWidth === 0) return;
            let activeIndex;
            const scrollOffset = Math.abs(state.currentPosition);
            // Use a slightly larger tolerance for max position check
            if (Math.abs(state.currentPosition - state.maxPosition) < state.totalWidth * 0.1) { // Check if within 10% of end
                activeIndex = items.length - 1;
            } else {
                activeIndex = Math.round(scrollOffset / state.totalWidth);
            }
            const clampedIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === clampedIndex);
            });
        }

        function goToSlide(index) {
            // Check if state is initialized before using it
            if (!carouselElement.carouselState || typeof state.totalWidth === 'undefined' || state.totalWidth === 0 || index < 0 || index >= items.length) return;
            const targetPosition = -index * state.totalWidth;
            state.currentPosition = Math.max(state.maxPosition, Math.min(0, targetPosition));
            updateCarouselPosition();
        }

        // --- Attach Event Listeners (Only Once Per Element) ---
        if (!carouselElement.listenersAttached) {
             console.log(`Attaching listeners for ${carouselId}`);
             indicators.forEach((indicator, index) => {
                 indicator.addEventListener('click', function() {
                     // Ensure state exists when clicking
                     if (carouselElement.carouselState) {
                        goToSlide(index);
                     }
                 });
             });

             prevButton.addEventListener('click', function() {
                 if (!prevButton.disabled && carouselElement.carouselState && typeof carouselElement.carouselState.totalWidth !== 'undefined') {
                     const currentNearestIndex = Math.round(Math.abs(carouselElement.carouselState.currentPosition) / carouselElement.carouselState.totalWidth);
                     goToSlide(currentNearestIndex - 1);
                 }
             });

             nextButton.addEventListener('click', function() {
                 if (!nextButton.disabled && carouselElement.carouselState && typeof carouselElement.carouselState.totalWidth !== 'undefined') {
                     const currentNearestIndex = Math.round(Math.abs(carouselElement.carouselState.currentPosition) / carouselElement.carouselState.totalWidth);
                     goToSlide(currentNearestIndex + 1);
                 }
             });

             // --- Attach Button Click Listeners (Image, Video, or Link) ---
             // Select potential action elements within the overlay
             const overlayElements = carouselInner.querySelectorAll('.overlay button, .overlay a');
             overlayElements.forEach(element => {
                 if (element.classList.contains('view-btn')) {
                     // Image Modal Button
                     element.addEventListener('click', function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         const imgSrc = this.getAttribute('data-img');
                         console.log(`View btn (modal) clicked in ${carouselId}, src: ${imgSrc}`);
                         if (sharedImageModalInstance && imgSrc && fullscreenImage) {
                             fullscreenImage.src = imgSrc;
                             sharedImageModalInstance.show();
                         } else {
                             console.error("Image Modal trigger failed.", { imgSrcExists: !!imgSrc, fullscreenImageExists: !!fullscreenImage, imageModalInstanceExists: !!sharedImageModalInstance });
                         }
                     });
                 } else if (element.classList.contains('view-video-btn')) {
                     // Video Modal Button
                     element.addEventListener('click', function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         const videoUrl = this.getAttribute('data-youtube-url');
                         console.log(`View video btn clicked in ${carouselId}, url: ${videoUrl}`);
                         if (sharedVideoModalInstance && videoUrl && youtubeIframe) {
                             youtubeIframe.src = videoUrl; // Set iframe src
                             sharedVideoModalInstance.show(); // Show video modal
                         } else {
                             console.error("Video Modal trigger failed.", { videoUrlExists: !!videoUrl, youtubeIframeExists: !!youtubeIframe, videoModalInstanceExists: !!sharedVideoModalInstance });
                         }
                     });
                  } else if (element.classList.contains('view-link-btn')) {
                     // This is an <a> tag styled as a button - DO NOTHING here in JS
                     // Let the browser handle the link click normally
                     console.log(`Link button found in ${carouselId} - letting browser handle click.`);
                     // No event listener needed as we want default browser behavior
                 }
             });

             carouselElement.listenersAttached = true;
         }

        // --- Apply Initial State after calculations ---
        // Check if state was successfully calculated before applying
        if (carouselElement.carouselState && typeof carouselElement.carouselState.maxPosition !== 'undefined') {
            state.currentPosition = 0;
            updateCarouselPosition();
        } else {
            // If calculation failed (e.g., hidden), ensure buttons are disabled
             if(prevButton) prevButton.disabled = true;
             if(nextButton) nextButton.disabled = true;
        }


    } // End setupCarousel function

    // --- Global Listeners ---

    // Initial setup for the *visible* carousel on load
    carouselSections.forEach(section => {
        const parentTabPane = section.closest('.tab-pane');
        if (parentTabPane && parentTabPane.classList.contains('show') && parentTabPane.classList.contains('active')) {
             const carouselElem = section.querySelector('.carousel');
             if (carouselElem) {
                 console.log(`Initial setup for active carousel: ${carouselElem.id}`);
                 setupCarousel(carouselElem);
             }
        }
    });

    // Debounced Resize Listener
    const debouncedResizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
             console.log("Window resize detected. Recalculating visible carousels.");
            const activeTabPane = document.querySelector('.tab-pane.active.show');
            if (activeTabPane) {
                const activeCarousel = activeTabPane.querySelector('.carousel-section .carousel');
                if (activeCarousel) {
                    // Reset attached listeners flag so they can be re-attached if needed
                    // Though typically not necessary unless elements were dynamically added/removed
                    // delete activeCarousel.listenersAttached; 
                    setupCarousel(activeCarousel); // Recalculate for the visible one
                }
            }
        }, 250);
    };
    window.addEventListener('resize', debouncedResizeHandler);

    // Bootstrap Tab Change Listener
    const tabTriggers = document.querySelectorAll('#pills-tab button[data-bs-toggle="pill"]');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('shown.bs.tab', event => {
            const targetPaneId = event.target.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetPaneId);
            if (targetPane) {
                console.log(`Tab shown: ${targetPaneId}`);
                const carouselInPane = targetPane.querySelector('.carousel-section .carousel');
                if (carouselInPane) {
                     // Reset attached listeners flag so they can be re-attached if needed
                     // delete carouselInPane.listenersAttached; 
                     setupCarousel(carouselInPane); // Always run setup when tab shown
                }
            }
        });
    });

});

AOS.init();