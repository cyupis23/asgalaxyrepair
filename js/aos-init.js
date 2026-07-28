/**
 * ========================================
 * AS GALAXY REPAIR - AOS INITIALIZATION
 * ========================================
 * File: aos-init.js
 * Fungsi: Menginisialisasi library AOS (Animate On Scroll)
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Cek apakah AOS tersedia
    if (typeof AOS !== 'undefined') {
        AOS.init({
            // Durasi animasi (ms)
            duration: 900,
            
            // Apakah animasi hanya berjalan sekali
            once: true,
            
            // Easing function
            easing: 'ease-out',
            
            // Delay antar elemen (ms)
            delay: 0,
            
            // Offset trigger (px)
            offset: 120,
            
            // Anchor placement
            anchorPlacement: 'top-bottom',
            
            // Disable on mobile?
            disable: false,
            
            // Mulai animasi saat elemen terlihat
            startEvent: 'DOMContentLoaded'
        });

        console.log('✅ AOS initialized successfully');
    } else {
        console.warn('⚠️ AOS library not loaded - using fallback');
        
        // Fallback: tampilkan semua elemen jika AOS tidak load
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }
});