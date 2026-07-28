/**
 * ========================================
 * AS GALAXY REPAIR - MAIN SCRIPT
 * ========================================
 * File: script.js
 * Fungsi: JavaScript utama untuk semua interaksi
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. NAVBAR - Close menu saat link diklik (mobile)
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    if (navToggle && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navToggle.checked = false;
                }
            });
        });
    }

    // ============================================
    // 2. NAVBAR - Active link berdasarkan scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu li a');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Jalankan saat scroll
    window.addEventListener('scroll', updateActiveLink);

    // Jalankan saat load
    updateActiveLink();

    // ============================================
    // 3. SMOOTH SCROLL untuk semua anchor link
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 4. COUNTER ANIMASI (untuk stats/angka)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            element.textContent = currentValue + '+';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // 5. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary, #00e5ff);
        color: var(--darker, #060a14);
        border: none;
        font-size: 1.3rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
        transform: translateY(20px);
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 6. FORM VALIDASI (jika ada form contact)
    // ============================================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            let isValid = true;
            let errorMessage = '';

            // Validasi Nama
            if (name && name.value.trim().length < 2) {
                isValid = false;
                errorMessage += '• Nama minimal 2 karakter\n';
                name.style.borderColor = '#ff4d6d';
            }

            // Validasi Email
            if (email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    isValid = false;
                    errorMessage += '• Email tidak valid\n';
                    email.style.borderColor = '#ff4d6d';
                }
            }

            // Validasi Pesan
            if (message && message.value.trim().length < 10) {
                isValid = false;
                errorMessage += '• Pesan minimal 10 karakter';
                message.style.borderColor = '#ff4d6d';
            }

            if (!isValid) {
                alert('⚠️ Mohon perbaiki data berikut:\n\n' + errorMessage);
                return;
            }

            // Jika valid
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;

            // Simulasi pengiriman
            setTimeout(() => {
                alert('✅ Pesan berhasil dikirim!\n\nTim AS Galaxy Repair akan segera menghubungi Anda.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset border
                [name, email, message].forEach(field => {
                    if (field) field.style.borderColor = '';
                });
            }, 1500);
        });

        // Reset border saat input
        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    // ============================================
    // 7. TAHUN OTOMATIS DI FOOTER
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // ============================================
    // 8. LAZY LOAD IMAGE (jika diperlukan)
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // 9. PREVENT DOUBLE CLICK PADA LINK
    // ============================================
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
            }
        });
    });

    console.log('🚀 AS Galaxy Repair - Website loaded successfully!');
    console.log('📱 Smart Device Solution - Cepat, Tepat, Bergaransi');
});