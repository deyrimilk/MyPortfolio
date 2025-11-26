const portrait = document.querySelector(".hero__portrait");
const media = document.querySelector(".hero__media");
const buttons = document.querySelectorAll("[data-action]");

const toast = document.createElement("div");
toast.className = "hero__toast";
document.body.appendChild(toast);
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.setAttribute("data-visible", "true");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.removeAttribute("data-visible");
  }, 2300);
}

if (media && portrait) {
  const handlePointerMove = (event) => {
    const rect = media.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `translate3d(${x * 24}px, ${y * 18}px, 0)`;
    portrait.style.filter = "brightness(1.02)";
  };

  const resetTransform = () => {
    portrait.style.transform = "translate3d(0, 0, 0)";
    portrait.style.filter = "none";
  };

  media.addEventListener("pointermove", handlePointerMove);
  media.addEventListener("pointerleave", resetTransform);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const action = button.dataset.action;

    if (action === "works") {
      const target = document.getElementById("portfolio");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add a subtle visual feedback
        button.style.opacity = "0.7";
        setTimeout(() => {
          button.style.opacity = "1";
        }, 300);
      }
    }

    if (action === "contact") {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add a subtle visual feedback
        button.style.opacity = "0.7";
        setTimeout(() => {
          button.style.opacity = "1";
        }, 300);
      }
    }
  });
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll(".nav__links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    
    // Only handle anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Update active state
        navLinks.forEach((navLink) => {
          navLink.classList.remove("is-active");
        });
        link.classList.add("is-active");
      }
    }
  });
});

// Carousel functionality
function initCarousel(carouselElement) {
  const track = carouselElement.querySelector(".carousel__track");
  const slides = carouselElement.querySelectorAll(".carousel__slide");
  const prevBtn = carouselElement.querySelector(".carousel__btn--prev");
  const nextBtn = carouselElement.querySelector(".carousel__btn--next");
  const indicatorsContainer = carouselElement.querySelector(".carousel__indicators");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create indicators
  if (indicatorsContainer && totalSlides > 1) {
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = "carousel__indicator";
      if (i === 0) indicator.classList.add("active");
      indicator.setAttribute("aria-label", `Go to slide ${i + 1}`);
      indicator.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update indicators
    const indicators = indicatorsContainer?.querySelectorAll(".carousel__indicator");
    indicators?.forEach((ind, index) => {
      ind.classList.toggle("active", index === currentIndex);
    });

    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Keyboard navigation
  carouselElement.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Touch/swipe support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });

  // Initialize
  updateCarousel();
}

// Initialize all carousels
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(initCarousel);
});
