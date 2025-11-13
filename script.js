/* =============================================
   ULTIMATE PORTFOLIO - OPTIMIZED JAVASCRIPT
   Interactive Features & Animations
   ============================================= */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  /* =============================================
       1. LOADING SCREEN
       ============================================= */

  const loaderWrapper = document.querySelector(".loader-wrapper");

  // Show loader for minimum time for better UX
  const minimumLoadTime = 800;
  const loadStartTime = Date.now();

  function hideLoader() {
    const loadTime = Date.now() - loadStartTime;
    const remainingTime = Math.max(0, minimumLoadTime - loadTime);

    setTimeout(() => {
      loaderWrapper.classList.add("fade-out");
      // Remove loader from DOM after fade
      setTimeout(() => {
        loaderWrapper.style.display = "none";
      }, 500);
    }, remainingTime);
  }

  // Hide loader when everything is loaded
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  /* =============================================
       2. NAVIGATION FUNCTIONALITY
       ============================================= */

  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Add scrolled class to header with throttling
  let scrollTimeout;
  function handleScroll() {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      scrollTimeout = null;
    }, 10);
  }

  window.addEventListener("scroll", handleScroll);

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active") && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Active navigation link on scroll with Intersection Observer
  const sections = document.querySelectorAll("section[id]");
  const sectionObserverOptions = {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove("active"));
        
        // Add active class to current link
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* =============================================
       3. THEME TOGGLE (DARK/LIGHT MODE)
       ============================================= */

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");

  // Check for saved theme preference or use system preference
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const currentTheme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update icon based on current theme
  if (themeIcon) {
    if (currentTheme === "dark") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const newTheme = theme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update icon
      if (themeIcon) {
        if (newTheme === "dark") {
          themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
          themeIcon.classList.replace("fa-sun", "fa-moon");
        }
      }
    });
  }

  /* =============================================
       4. TYPING EFFECT IN HERO SECTION
       ============================================= */

  const typedTextElement = document.querySelector(".typed-text");

  if (typedTextElement) {
    const textArray = [
      "Web Developer",
      "UI/UX Designer",
      "Frontend Expert",
      "Problem Solver",
      "Creative Thinker",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
      const currentText = textArray[textIndex];

      if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of text
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);
  }

  /* =============================================
       5. ANIMATED PARTICLES IN HERO
       ============================================= */

  const particlesContainer = document.getElementById("particles");

  if (particlesContainer) {
    function createParticle() {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 1;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float ${Math.random() * 8 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;

      particlesContainer.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode === particlesContainer) {
          particle.remove();
        }
      }, 12000);
    }

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 400);

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      createParticle();
    }

    // Cleanup on page hide
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(particleInterval);
      }
    });
  }

  /* =============================================
       6. PORTFOLIO FILTER FUNCTIONALITY
       ============================================= */

  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and set aria-selected
        filterBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        
        // Add active class to clicked button and set aria-selected
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        const filterValue = btn.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "all" || filterValue === itemCategory) {
            item.classList.remove("hide");
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            
            // Trigger reflow
            void item.offsetWidth;
            
            item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          } else {
            item.classList.add("hide");
          }
        });
      });
    });
  }

  /* =============================================
       7. TESTIMONIALS SLIDER
       ============================================= */

  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".dot");
  
  if (testimonialItems.length > 0) {
    let currentSlide = 0;
    let testimonialInterval;

    function showSlide(index) {
      // Hide all slides
      testimonialItems.forEach((item) => item.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Show current slide
      if (index >= testimonialItems.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = testimonialItems.length - 1;
      } else {
        currentSlide = index;
      }

      testimonialItems[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });

    // Auto-play testimonials
    function startAutoPlay() {
      testimonialInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      clearInterval(testimonialInterval);
    }

    startAutoPlay();

    // Pause auto-play on hover
    const testimonialSlider = document.querySelector(".testimonials-slider");
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", stopAutoPlay);
      testimonialSlider.addEventListener("mouseleave", startAutoPlay);
      testimonialSlider.addEventListener("focusin", stopAutoPlay);
      testimonialSlider.addEventListener("focusout", startAutoPlay);
    }

    // Cleanup interval on page hide
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  }

  /* =============================================
       8. CONTACT FORM VALIDATION & SUBMISSION
       ============================================= */

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        subject: formData.get("subject")?.toString().trim() || "",
        message: formData.get("message")?.toString().trim() || ""
      };

      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        showFormStatus("Please fill in all required fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormStatus("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual backend logic)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showFormStatus("Message sent successfully! I'll get back to you soon.", "success");
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      } catch (error) {
        showFormStatus("Sorry, there was an error sending your message. Please try again.", "error");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    function showFormStatus(message, type) {
      formStatus.textContent = message;
      formStatus.className = `form-status ${type}`;
      formStatus.style.display = "block";
      
      // Auto-hide error messages after 5 seconds
      if (type === "error") {
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      }
    }
  }

  /* =============================================
       9. BACK TO TOP BUTTON
       ============================================= */

  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Throttle scroll event
    let scrollThrottle;
    function throttledToggle() {
      if (scrollThrottle) return;
      
      scrollThrottle = setTimeout(() => {
        toggleBackToTop();
        scrollThrottle = null;
      }, 100);
    }

    window.addEventListener("scroll", throttledToggle);

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =============================================
       10. SCROLL REVEAL ANIMATION
       ============================================= */

  // Simple scroll reveal animation with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  const animatedElements = document.querySelectorAll("[data-aos]");
  animatedElements.forEach((el) => observer.observe(el));

  /* =============================================
       11. SKILL BARS ANIMATION
       ============================================= */

  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillProgress = entry.target;
            skillProgress.style.animation = "fillSkill 1.5s ease-in-out forwards";
            skillObserver.unobserve(skillProgress);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));
  }

  /* =============================================
       12. SMOOTH SCROLLING FOR ANCHOR LINKS
       ============================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#"
      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  /* =============================================
       13. PERFORMANCE OPTIMIZATIONS
       ============================================= */

  // Lazy load images that are not critical
  const lazyImages = document.querySelectorAll("img[loading='lazy']");

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Image is already loading due to native lazy loading
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  /* =============================================
       14. CONSOLE MESSAGE (Easter Egg)
       ============================================= */

  console.log(
    "%c🚀 Welcome to Ryan Kangata's Portfolio!",
    "color: #4f46e5; font-size: 18px; font-weight: bold;"
  );
  console.log(
    "%cLooking for a skilled developer? Let's create something amazing together!",
    "color: #ec4899; font-size: 14px;"
  );
  console.log(
    "%cEmail: ryanxkangata@gmail.com | Phone: +254 794416429",
    "color: #10b981; font-size: 12px;"
  );
});

/* =============================================
   15. UTILITY FUNCTIONS
   ============================================= */

// Function to detect if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to get random number in range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Debounce function for performance
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* =============================================
   END OF JAVASCRIPT
   ============================================= */