// Ahlain Hospital - Dental Care Single Page Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Ahlain Dental Hospital single-page website...');
    
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    function toggleMobileMenu() {
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled');
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Smooth scroll to section
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            console.log('Scrolling to section:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100; // Add offset for better detection

        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.id;
            }
        });

        // Update nav links
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('href').substring(1); // Remove # from href
            if (linkSection === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Handle navigation link clicks
    function handleNavClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const link = event.currentTarget;
        const targetSection = link.getAttribute('href').substring(1); // Remove # from href
        
        console.log('Nav link clicked:', targetSection);
        
        if (targetSection) {
            scrollToSection(targetSection);
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    }

    // Event listeners setup
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
        console.log('Mobile menu toggle listener added');
    } else {
        console.warn('Mobile menu toggle not found');
    }

    // Add click event to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
        console.log('Added click listener to nav link:', link.getAttribute('href'));
    });

    // Handle logo/brand click to go home
    const navBrand = document.querySelector('.nav__brand');
    if (navBrand) {
        navBrand.addEventListener('click', function(event) {
            event.preventDefault();
            scrollToSection('home');
        });
        navBrand.style.cursor = 'pointer';
        console.log('Brand click listener added');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu || !navToggle) return;
        
        const isNavClick = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isNavClick && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Scroll event listener for active nav highlighting
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Throttle scroll events
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
            handleHeaderScroll();
        }, 10);
    });

    // Phone number click handling
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            console.log('Phone link clicked:', this.href);
            // Allow default behavior for phone links
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // ESC key closes mobile menu
        if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }

        // Enter key on nav toggle opens/closes menu
        if (event.key === 'Enter' && event.target === navToggle) {
            event.preventDefault();
            toggleMobileMenu();
        }
    });

    // Image loading handling
    function handleImageLoading() {
        const images = document.querySelectorAll('img');
        console.log('Found', images.length, 'images to process');
        
        images.forEach((img, index) => {
            console.log(`Image ${index + 1}:`, img.src);
            
            img.addEventListener('load', function() {
                console.log('Image loaded successfully:', this.src);
            });
            
            img.addEventListener('error', function() {
                console.error('Image failed to load:', this.src);
                // Set a fallback background
                this.style.backgroundColor = '#f8f9fa';
                this.style.minHeight = this.offsetHeight + 'px';
            });
            
            // Force reload if image hasn't loaded properly
            if (!img.complete || img.naturalWidth === 0) {
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 100);
            }
        });
    }

    // Initialize image handling
    handleImageLoading();

    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Add fade-in class to animated elements
        const animatedElements = document.querySelectorAll(
            '.service-card, .service-detail-card, .highlight-card, .stat-card, .gallery-item, .mvv-item, .info-item, .contact-item'
        );

        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });

        console.log('Scroll animations initialized for', animatedElements.length, 'elements');
    }

    // Initialize animations
    setTimeout(initScrollAnimations, 500);

    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(31, 184, 205, 0.1)';
        } else {
            header.style.background = 'var(--dental-white)';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = 'none';
        }
    }

    // Add hover effects to interactive elements
    function initHoverEffects() {
        const serviceCards = document.querySelectorAll('.service-card, .service-detail-card, .highlight-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 20px 40px rgba(31, 184, 205, 0.15)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-sm)';
            });
        });

        // Gallery hover effects
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Emergency contact effects
        const emergencyElements = document.querySelectorAll('.emergency-phone, .emergency-box');
        emergencyElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        console.log('Hover effects initialized');
    }

    // Initialize hover effects
    initHoverEffects();

    // Statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            
            if (!isNaN(target.replace('+', ''))) {
                const numericTarget = parseInt(target.replace('+', ''));
                const increment = numericTarget / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericTarget) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                    }
                }, 40);
            }
        });
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero__stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Handle button clicks for smooth scrolling
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Handle any anchor link that points to a section
        if (target.matches('a[href^="#"]') && target.getAttribute('href') !== '#') {
            const sectionId = target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                event.preventDefault();
                scrollToSection(sectionId);
                closeMobileMenu();
            }
        }
    });

    // Initialize page with proper active nav link
    function initializePage() {
        console.log('Setting up initial page state...');
        
        // Set initial active nav link based on scroll position
        updateActiveNavLink();
        
        // If page loads at top, ensure home is active
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        console.log('Page initialization complete');
        console.log('Available sections:', Array.from(sections).map(s => s.id));
        console.log('Navigation links:', Array.from(navLinks).map(l => l.getAttribute('href')));
    }

    // Call initialization
    initializePage();

    // Smooth scroll behavior for hash links in URL
    if (window.location.hash) {
        setTimeout(() => {
            const sectionId = window.location.hash.substring(1);
            scrollToSection(sectionId);
        }, 100);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            scrollToSection(sectionId);
        }
    });

    // Update URL hash when scrolling (optional - creates cleaner URLs)
    let hashUpdateTimeout;
    function updateURLHash() {
        if (hashUpdateTimeout) {
            clearTimeout(hashUpdateTimeout);
        }
        
        hashUpdateTimeout = setTimeout(() => {
            const activeNavLink = document.querySelector('.nav__link.active');
            if (activeNavLink) {
                const sectionId = activeNavLink.getAttribute('href');
                if (window.location.hash !== sectionId) {
                    history.replaceState(null, null, sectionId);
                }
            }
        }, 1000);
    }

    // Add scroll listener for URL updates
    window.addEventListener('scroll', updateURLHash);

    // Debug information
    function debugInfo() {
        console.log('=== Debug Information ===');
        console.log('Sections found:', sections.length);
        console.log('Nav links found:', navLinks.length);
        console.log('Mobile toggle found:', !!navToggle);
        console.log('Mobile menu found:', !!navMenu);
        
        sections.forEach(section => {
            console.log(`Section ${section.id}: top=${section.offsetTop}, height=${section.offsetHeight}`);
        });
        
        navLinks.forEach(link => {
            console.log(`Nav link: ${link.getAttribute('href')} - active=${link.classList.contains('active')}`);
        });
    }

    // Run debug after initialization
    setTimeout(debugInfo, 2000);

    // Export for debugging
    window.AhlainDentalHospital = {
        scrollToSection: scrollToSection,
        updateActiveNavLink: updateActiveNavLink,
        toggleMobileMenu: toggleMobileMenu,
        closeMobileMenu: closeMobileMenu,
        sections: sections,
        navLinks: navLinks
    };

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Ahlain Dental Hospital single-page website loaded in ${Math.round(loadTime)}ms`);
        
        // Final check for active nav link after everything is loaded
        setTimeout(updateActiveNavLink, 100);
    });

    // Add loading animation for page elements
    function addPageLoadAnimation() {
        const hero = document.querySelector('.hero');
        const companyOverview = document.querySelector('.company-overview');
        
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (companyOverview) {
            companyOverview.style.opacity = '0';
            companyOverview.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                companyOverview.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                companyOverview.style.opacity = '1';
                companyOverview.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // Initialize page load animations
    addPageLoadAnimation();

    console.log('All dental website features initialized successfully for single-page experience');
});