/**
 * ========================================
 * AS GALAXY REPAIR - PARTICLES INITIALIZATION
 * ========================================
 * File: particles-init.js
 * Fungsi: Menginisialisasi background particles (efek bintang)
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Cek apakah particlesJS tersedia
    if (typeof particlesJS !== 'undefined') {
        
        particlesJS('particles-js', {
            // ========== KONFIGURASI PARTIKEL ==========
            particles: {
                // Jumlah partikel
                number: {
                    value: 70,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                
                // Warna partikel
                color: {
                    value: '#00e5ff'
                },
                
                // Bentuk partikel
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                
                // Opasitas
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                
                // Ukuran
                size: {
                    value: 3.5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                
                // Garis penghubung
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: '#00e5ff',
                    opacity: 0.25,
                    width: 1.2
                },
                
                // Pergerakan
                move: {
                    enable: true,
                    speed: 1.8,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            
            // ========== INTERAKSI ==========
            interactivity: {
                detect_on: 'canvas',
                events: {
                    // Hover
                    onhover: {
                        enable: true,
                        mode: 'repulse'  // repulse / grab / bubble
                    },
                    // Klik
                    onclick: {
                        enable: true,
                        mode: 'push'  // push / remove / bubble / repulse
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 120,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            
            // ========== RETINA SUPPORT ==========
            retina_detect: true
        });

        console.log('✨ Particles initialized successfully');
        
    } else {
        console.warn('⚠️ Particles library not loaded - using fallback');
        
        // Fallback: buat efek bintang sederhana dengan CSS/JS
        createStarFallback();
    }

    // ============================================
    // FALLBACK: Stars efek jika particles.js tidak load
    // ============================================
    function createStarFallback() {
        const container = document.getElementById('particles-js');
        if (!container) return;

        container.style.background = 'radial-gradient(ellipse at center, #0a0e1a 0%, #060a14 100%)';
        
        // Buat 50 bintang dengan JavaScript
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                top: ${y}%;
                left: ${x}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: twinkle ${duration}s ease-in-out ${delay}s infinite alternate;
                box-shadow: 0 0 ${size * 2}px rgba(0, 229, 255, 0.2);
            `;
            
            container.appendChild(star);
        }

        // Tambahkan keyframe twinkle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);

        console.log('⭐ Stars fallback activated');
    }
});