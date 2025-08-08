// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.work-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// About Section Full Carousel Functionality
class AboutCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 6; // About + 5 hobbies
        this.track = document.getElementById('aboutTrack');
        this.prevBtn = document.getElementById('aboutPrevBtn');
        this.nextBtn = document.getElementById('aboutNextBtn');
        this.indicators = document.querySelectorAll('.about-indicator');
        this.title = document.getElementById('aboutTitle');
        
        this.slideNames = ['About Me', 'Reading', 'Badminton', 'Running', 'Speedcubing', 'Making Videos'];
        
        this.init();
    }
    
    init() {
        // Add event listeners for navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add event listeners for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Add keyboard navigation when About section is in view
        document.addEventListener('keydown', (e) => {
            if (this.isAboutSectionInView()) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
    }
    
    isAboutSectionInView() {
        const aboutSection = document.getElementById('about');
        const rect = aboutSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    updateCarousel() {
        // Move the track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update title based on slide index
        this.title.textContent = this.currentSlide === 0 ? 'About Me' : 'My Hobbies';
        
        // Update active states
        document.querySelectorAll('.about-slide').forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Add smooth transition class
        this.track.style.transition = 'transform 0.6s ease';
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    // Optional: Auto-play functionality
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 8000); // Change slide every 8 seconds
    }
}

// Initialize About carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutCarousel();

});

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for external links (optional analytics)
document.querySelectorAll('a[href^="http"], a[href^="mailto"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here
        console.log('External link clicked:', link.href);
    });
});

// Add form validation if contact form is added later
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading for images (when added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// YouTube Player API
let player;

// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'TgsV1iWVGXk',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // Set up play/pause button
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playBtn = document.getElementById('playBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const videoContainer = document.getElementById('aboutVideoContainer');
    const videoOverlay = document.querySelector('.video-overlay');
    
    // Toggle play/pause
    function togglePlay() {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseIcon.className = 'fas fa-play';
            videoOverlay.style.opacity = '1';
        } else {
            player.playVideo();
            playPauseIcon.className = 'fas fa-pause';
            videoOverlay.style.opacity = '0';
        }
    }
    
    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) { /* IE11 */
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', function() {
        togglePlay();
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
    });
    
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    
    // Handle spacebar for play/pause
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            togglePlay();
        }
    });
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    const playPauseIcon = document.getElementById('playPauseIcon');
    const playBtn = document.getElementById('playBtn');
    
    switch(event.data) {
        case YT.PlayerState.PLAYING:
            playPauseIcon.className = 'fas fa-pause';
            playBtn.style.opacity = '0';
            playBtn.style.pointerEvents = 'none';
            break;
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
            playPauseIcon.className = 'fas fa-play';
            playBtn.style.opacity = '1';
            playBtn.style.pointerEvents = 'auto';
            break;
    }
}

// Handle fullscreen change events
function handleFullscreenChange() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const icon = fullscreenBtn.querySelector('i');
    
    if (document.fullscreenElement) {
        icon.className = 'fas fa-compress';
    } else {
        icon.className = 'fas fa-expand';
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('aboutVideoContainer');
    const video = document.getElementById('aboutVideo');
    const playBtn = document.getElementById('playBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    // Only proceed if all elements exist
    if (videoContainer && video && playBtn && playPauseBtn && playPauseIcon && fullscreenBtn) {
        // Play/Pause functionality
        function togglePlay() {
            if (video.paused) {
                video.play();
                videoContainer.classList.add('playing');
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
            } else {
                video.pause();
                videoContainer.classList.remove('playing');
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            }
        }
        
        // Click on video container to play/pause
        videoContainer.addEventListener('click', function(e) {
            // Only trigger if not clicking on controls
            if (!e.target.closest('.control-btn')) {
                togglePlay();
            }
        });
        
        // Play button in the center
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // If YouTube iframe is present, send play command
            const ytIframe = document.getElementById('aboutYoutubeIframe');
            if (ytIframe) {
                ytIframe.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'playVideo',
                    args: []
                }), '*');
            } else {
                togglePlay();
            }
        });
        
        // Play/Pause button in controls
        playPauseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            togglePlay();
        });
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Toggle fullscreen for the video only
            const isFullscreen = document.fullscreenElement === video ||
                document.webkitFullscreenElement === video ||
                document.mozFullScreenElement === video ||
                document.msFullscreenElement === video;
            if (isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }
        });
        
        // Update play/pause icon when video ends
        video.addEventListener('ended', function() {
            videoContainer.classList.remove('playing');
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        });
        
        // Keyboard controls when video is focused
        video.addEventListener('keydown', function(e) {
            if (e.code === 'Space' || e.code === 'KeyK') {
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'KeyF') {
                e.preventDefault();
                fullscreenBtn.click();
            } else if (e.code === 'Escape') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
        });
    }
});

// Food Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const foodCarousels = document.querySelectorAll('.food-carousel');
    
    foodCarousels.forEach(carousel => {
        const track = carousel.querySelector('.food-carousel-track');
        const slides = Array.from(track.querySelectorAll('.food-slide'));
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        
        let currentSlide = 0;
        
        // Function to update the carousel display
        function updateCarousel() {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            // Add active class to current slide
            slides[currentSlide].classList.add('active');
        }
        
        // Event listeners for arrow buttons
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }
        });
        
        // Initialize the carousel
        updateCarousel();
    });
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2b6cb0, #3182ce);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();
