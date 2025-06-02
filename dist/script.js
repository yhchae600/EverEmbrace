// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

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
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 30px rgba(44, 90, 160, 0.12)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 15px rgba(44, 90, 160, 0.08)';
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = [
        '.section-title',
        '.section-subtitle',
        '.about-item',
        '.product-card',
        '.service-card',
        '.contact-item',
        '.hero-title',
        '.hero-subtitle',
        '.sacred-title',
        '.sacred-quote',
        '.testimonial-quote'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create email content
            const emailSubject = `EverEmbrace Contact Form: ${subject}`;
            const emailBody = `Name: ${name}%0D%0A` +
                            `Email: ${email}%0D%0A` +
                            `Phone: ${phone || 'Not provided'}%0D%0A` +
                            `Subject: ${subject}%0D%0A%0D%0A` +
                            `Message:%0D%0A${message}`;
            
            // Create mailto link
            const mailtoLink = `mailto:yhchae772@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('이메일 클라이언트가 열렸습니다. 메시지를 전송해주세요.', 'success');
            
            // Reset form after a delay
            setTimeout(() => {
                this.reset();
            }, 1000);
        });
    }

    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        const overlay = card.querySelector('.product-overlay');
        const button = overlay ? overlay.querySelector('.btn') : null;
        
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productTitle = card.querySelector('.product-title').textContent;
                showProductModal(productTitle);
            });
        }
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animations
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Product image galleries data
    const productGalleries = {
        'product-1.jpg': {
            title: 'Sapphire Elegance Collection',
            images: [
                'product-1.jpg',           // 메인 이미지
                'product-1-view2.jpg',     // 측면 뷰
                'product-1-view3.jpg',     // 디테일 뷰
                'product-1-view4.jpg'      // 완성품 뷰
            ]
        },
        'product-2.jpg': {
            title: 'Remembrance Set Collection',
            images: [
                'product-2.jpg',           // 메인 이미지
                'product-2-view2.jpg',     // 세트 전체 뷰
                'product-2-view3.jpg',     // 개별 제품 뷰
                'product-2-view4.jpg'      // 포장 박스 뷰
            ]
        },
        'product-3.jpg': {
            title: 'Memorial Sanctuary Collection',
            images: [
                'product-3.jpg',           // 메인 이미지
                'product-3-view2.jpg',     // 측면 뷰
                'product-3-view3.jpg',     // 상단 뷰
                'product-3-view4.jpg'      // 마감 디테일 뷰
            ]
        }
    };

    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');

    // Add click event to all clickable images
    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const imageSrc = this.src.split('/').pop(); // Get filename only
            const gallery = productGalleries[imageSrc];
            
            if (gallery) {
                showImageGallery(gallery, imageSrc);
            } else {
                // Fallback to original modal for non-product images
                showOriginalModal(this);
            }
        });
    });

    // Original modal function for non-product images
    function showOriginalModal(imgElement) {
        // 모달 즉시 설정 (배경색 강제)
        modal.style.display = 'block';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        modal.style.background = 'rgba(0, 0, 0, 0.95)';
        
        // 모바일 전용 강제 설정
        if (window.innerWidth <= 768) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.zIndex = '9999';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            modal.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        // 이미지 설정 (투명 배경 강제)
        modalImg.style.opacity = '0';
        modalImg.style.transform = 'scale(0.8)';
        modalImg.style.backgroundColor = 'transparent';
        modalImg.style.background = 'transparent';
        modalImg.src = imgElement.src;
        modalCaption.textContent = imgElement.alt;
        
        // 모달 클래스 추가
        modal.classList.add('show');
        
        // 이미지 로드 완료 후 즉시 표시
        const showImage = () => {
            modalImg.classList.add('show');
            modalImg.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
            modalImg.style.backgroundColor = 'transparent';
            modalImg.style.background = 'transparent';
        };
        
        modalImg.onload = showImage;
        
        // 즉시 로드된 경우에도 실행
        if (modalImg.complete && modalImg.naturalHeight !== 0) {
            showImage();
        }
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    // New gallery modal function
    function showImageGallery(gallery, currentImage) {
        // Remove existing gallery modal if any
        const existingGalleryModal = document.getElementById('galleryModal');
        if (existingGalleryModal) {
            existingGalleryModal.remove();
        }

        // Create gallery modal
        const galleryModal = document.createElement('div');
        galleryModal.id = 'galleryModal';
        galleryModal.className = 'gallery-modal';
        
        galleryModal.innerHTML = `
            <div class="gallery-content">
                <span class="gallery-close">&times;</span>
                <div class="gallery-main">
                    <img id="galleryMainImage" src="${currentImage}" alt="${gallery.title}">
                </div>
                <div class="gallery-caption">
                    <h3>${gallery.title}</h3>
                    <p>Explore different views</p>
                </div>
                <div class="gallery-thumbnails">
                    ${gallery.images.map((img, index) => `
                        <div class="thumbnail ${img === currentImage ? 'active' : ''}" data-src="${img}">
                            <img src="${img}" alt="${gallery.title} - View ${index + 1}" onerror="this.src='${currentImage}'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(galleryModal);

        // Add gallery styles
        const style = document.createElement('style');
        style.textContent = `
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .gallery-modal.show {
                opacity: 1;
            }

            .gallery-content {
                position: relative;
                max-width: 95vw;
                max-height: 95vh;
                background: transparent;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .gallery-close {
                position: absolute;
                top: -50px;
                right: 0;
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10001;
                transition: all 0.3s ease;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .gallery-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            .gallery-main {
                margin-bottom: 20px;
                max-height: 60vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #galleryMainImage {
                width: 600px;
                height: 450px;
                object-fit: cover;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transition: all 0.3s ease;
            }

            .gallery-caption {
                text-align: center;
                color: white;
                margin-bottom: 20px;
            }

            .gallery-caption h3 {
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                margin-bottom: 10px;
                color: #D4AF37;
            }

            .gallery-caption p {
                font-size: 0.9rem;
                opacity: 0.8;
                margin: 0;
            }

            .gallery-thumbnails {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                max-width: 90vw;
                max-height: 20vh;
                overflow-y: auto;
                padding: 10px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                backdrop-filter: blur(10px);
            }

            .thumbnail {
                width: 80px;
                height: 80px;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
                opacity: 0.7;
            }

            .thumbnail:hover {
                opacity: 1;
                transform: scale(1.05);
                border-color: #D4AF37;
                box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            }

            .thumbnail.active {
                border-color: #2C5AA0;
                opacity: 1;
                box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
            }

            .thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 6px;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .gallery-content {
                    max-width: 100vw;
                    padding: 10px;
                }

                .gallery-close {
                    top: -40px;
                    font-size: 30px;
                    width: 40px;
                    height: 40px;
                }

                #galleryMainImage {
                    width: 320px;
                    height: 240px;
                    object-fit: cover;
                }

                .gallery-caption h3 {
                    font-size: 1.2rem;
                }

                .gallery-caption p {
                    font-size: 0.8rem;
                }

                .thumbnail {
                    width: 60px;
                    height: 60px;
                }

                .gallery-thumbnails {
                    max-height: 25vh;
                    gap: 8px;
                }
            }
        `;
        document.head.appendChild(style);

        // Show modal with animation
        setTimeout(() => {
            galleryModal.classList.add('show');
        }, 100);

        // Gallery functionality
        const galleryMainImage = document.getElementById('galleryMainImage');
        const thumbnails = galleryModal.querySelectorAll('.thumbnail');

        // Thumbnail click events
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newSrc = this.dataset.src;
                const originalSrc = currentImage; // Store original image as fallback
                
                // Update main image with error handling
                galleryMainImage.style.opacity = '0.5';
                galleryMainImage.style.transform = 'scale(0.95)';
                
                // Create a temporary image to test if the new source exists
                const testImage = new Image();
                testImage.onload = function() {
                    // Image exists, update main image
                    setTimeout(() => {
                        galleryMainImage.src = newSrc;
                        
                        // Apply different styles based on image type and screen size
                        const isMobile = window.innerWidth <= 768;
                        
                        if (newSrc === 'product-1-view2.jpg' || newSrc === 'product-3-view3.jpg' || newSrc === 'product-3-view4.jpg') {
                            // Only these 3 specific images - maintain aspect ratio with larger height
                            galleryMainImage.style.width = 'auto';
                            galleryMainImage.style.height = 'auto';
                            galleryMainImage.style.maxWidth = isMobile ? '320px' : '600px';
                            galleryMainImage.style.maxHeight = isMobile ? '350px' : '600px';
                            galleryMainImage.style.objectFit = 'contain';
                        } else {
                            // All other images (main products and other view images) - fixed size
                            galleryMainImage.style.width = isMobile ? '320px' : '600px';
                            galleryMainImage.style.height = isMobile ? '240px' : '450px';
                            galleryMainImage.style.maxWidth = 'none';
                            galleryMainImage.style.maxHeight = 'none';
                            galleryMainImage.style.objectFit = 'cover';
                        }
                        
                        galleryMainImage.style.opacity = '1';
                        galleryMainImage.style.transform = 'scale(1)';
                    }, 150);
                };
                
                testImage.onerror = function() {
                    // Image doesn't exist, use original image
                    setTimeout(() => {
                        galleryMainImage.src = originalSrc;
                        
                        // Reset to main image style
                        const isMobile = window.innerWidth <= 768;
                        galleryMainImage.style.width = isMobile ? '320px' : '600px';
                        galleryMainImage.style.height = isMobile ? '240px' : '450px';
                        galleryMainImage.style.maxWidth = 'none';
                        galleryMainImage.style.maxHeight = 'none';
                        galleryMainImage.style.objectFit = 'cover';
                        
                        galleryMainImage.style.opacity = '1';
                        galleryMainImage.style.transform = 'scale(1)';
                    }, 150);
                };
                
                // Start testing the image
                testImage.src = newSrc;

                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Close functionality
        const closeGallery = () => {
            galleryModal.style.opacity = '0';
            setTimeout(() => {
                galleryModal.remove();
                style.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        };

        galleryModal.querySelector('.gallery-close').addEventListener('click', closeGallery);
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });

        // ESC key to close
        const handleEscapeGallery = (e) => {
            if (e.key === 'Escape') {
                closeGallery();
                document.removeEventListener('keydown', handleEscapeGallery);
            }
        };
        document.addEventListener('keydown', handleEscapeGallery);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close modal function - 배경 초기화 포함
    function closeModal() {
        modal.classList.remove('show');
        modalImg.classList.remove('show');
        modalImg.style.opacity = '0';
        modalImg.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modal.querySelector('.modal-content')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Logo click to scroll to top
    const logo = document.querySelector('.logo-img, .footer-logo-img');
    const navLogo = document.querySelector('.nav-logo');

    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Also handle footer logo click
    if (logo) {
        document.querySelectorAll('.logo-img, .footer-logo-img').forEach(logoElement => {
            logoElement.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Enhanced notification with icon
    const icon = type === 'success' ? '✧' : type === 'error' ? '✕' : 'ℹ';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f44336, #da190b)' : 
                    'linear-gradient(135deg, #2C5AA0, #1E3D72)'};
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        box-shadow: 0 15px 50px rgba(44, 90, 160, 0.15);
        z-index: 9999;
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 450px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Inter', sans-serif;
    `;

    document.body.appendChild(notification);

    // Enhanced notification content styling
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    const iconElement = notification.querySelector('.notification-icon');
    iconElement.style.cssText = `
        font-size: 1.2rem;
        flex-shrink: 0;
    `;

    const messageElement = notification.querySelector('.notification-message');
    messageElement.style.cssText = `
        flex: 1;
        line-height: 1.5;
        font-size: 0.95rem;
    `;

    const closeElement = notification.querySelector('.notification-close');
    closeElement.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        padding: 0;
        margin: 0;
        flex-shrink: 0;
    `;

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
    });

    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// Enhanced product modal
function showProductModal(productTitle) {
    // Remove existing modal
    document.querySelectorAll('.modal').forEach(m => m.remove());

    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Enhanced modal content with more thoughtful messaging
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${productTitle}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-intro">
                    <p class="modal-quote">"More than ashes – this memorial holds love, memory, and an eternal bond."</p>
                    <p class="modal-description">Thank you for your interest in our ${productTitle}. We understand this is a deeply personal decision, and our compassionate team is here to provide gentle guidance throughout your journey. Each piece is thoughtfully handcrafted and presented in premium velvet packaging, reflecting the reverence your loved one deserves.</p>
                </div>
                <div class="modal-features">
                    <h4>What Makes This Special:</h4>
                    <ul class="feature-list">
                        <li>✧ Thoughtfully handcrafted with sacred intention</li>
                        <li>✧ Sturdy and secure construction for lasting protection</li>
                        <li>✧ Presented in luxury velvet packaging</li>
                        <li>✧ Includes gentle transfer assistance guide</li>
                        <li>✧ Lifetime craftsmanship guarantee</li>
                    </ul>
                </div>
                <div class="modal-form">
                    <h3>Request Compassionate Guidance</h3>
                    <p class="form-note">Share a little about your needs, and we'll reach out within 24 hours to provide personalized support.</p>
                    <form class="quick-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <input type="tel" placeholder="Your Phone (optional)">
                        <textarea placeholder="Tell us about your loved one or any special requests..." rows="4"></textarea>
                        <button type="submit" class="btn btn-primary btn-full">Request Guidance</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal-overlay"></div>
    `;

    // Enhanced modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.4s ease;
        padding: 20px;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 0;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 20px 60px rgba(44, 90, 160, 0.2);
        border: 1px solid #e8edf7;
    `;

    const modalOverlay = modal.querySelector('.modal-overlay');
    modalOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 26, 26, 0.8);
        backdrop-filter: blur(8px);
    `;

    document.body.appendChild(modal);

    // Style modal components
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        padding: 2.5rem 3rem 1.5rem;
        border-bottom: 1px solid #e8edf7;
        background: linear-gradient(135deg, #f8faff, #ffffff);
        border-radius: 20px 20px 0 0;
    `;

    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        padding: 2rem 3rem 3rem;
    `;

    const modalQuote = modal.querySelector('.modal-quote');
    if (modalQuote) {
        modalQuote.style.cssText = `
            font-style: italic;
            color: #2C5AA0;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            text-align: center;
            font-weight: 500;
        `;
    }

    const modalDescription = modal.querySelector('.modal-description');
    if (modalDescription) {
        modalDescription.style.cssText = `
            line-height: 1.7;
            color: #4a4a4a;
            margin-bottom: 2rem;
        `;
    }

    const modalFeatures = modal.querySelector('.modal-features');
    if (modalFeatures) {
        modalFeatures.style.cssText = `
            margin-bottom: 2.5rem;
            padding: 1.5rem;
            background: #f8faff;
            border-radius: 12px;
            border-left: 4px solid #D4AF37;
        `;

        const featureList = modal.querySelector('.feature-list');
        if (featureList) {
            featureList.style.cssText = `
                list-style: none;
                padding: 0;
                margin: 1rem 0 0 0;
            `;

            featureList.querySelectorAll('li').forEach(li => {
                li.style.cssText = `
                    padding: 0.5rem 0;
                    color: #1a1a1a;
                    font-weight: 500;
                `;
            });
        }
    }

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);

    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 400);
        document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Enhanced form handling
    modal.querySelector('.quick-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Your request has been received with care. Our compassionate team will contact you within 24 hours to provide personalized guidance during this meaningful time.', 'success');
        closeModal();
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // ESC key to close
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Enhanced parallax effect for hero section
function initParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroImg.style.transform = `perspective(1000px) rotateY(-8deg) translateY(${rate}px)`;
        });
    }
}

// Initialize parallax after page load
window.addEventListener('load', initParallax);

// Enhanced typing effect for hero title
function typeEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = 'Forever in Heart,<br>Held in Embrace';
        heroTitle.innerHTML = '';
        heroTitle.style.borderRight = '3px solid #D4AF37';
        
        // Convert HTML to array including BR tags
        const htmlParts = originalHTML.split('<br>');
        let currentText = '';
        let partIndex = 0;
        let charIndex = 0;
        
        const timer = setInterval(() => {
            if (partIndex < htmlParts.length) {
                if (charIndex < htmlParts[partIndex].length) {
                    currentText += htmlParts[partIndex].charAt(charIndex);
                    heroTitle.innerHTML = currentText + (partIndex < htmlParts.length - 1 ? '' : '');
                    charIndex++;
                } else {
                    // Move to next part (after <br>)
                    if (partIndex < htmlParts.length - 1) {
                        currentText += '<br>';
                        heroTitle.innerHTML = currentText;
                    }
                    partIndex++;
                    charIndex = 0;
                }
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1500);
            }
        }, 80);
    }
}

// Initialize typing effect
window.addEventListener('load', () => {
    setTimeout(typeEffect, 800);
});

// Enhanced advanced animations
function addAdvancedAnimations() {
    // Floating animation for product cards
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.classList.add('float-animation');
    });

    // Pulse animation for service icons
    document.querySelectorAll('.service-icon').forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('pulse-animation');
        }, index * 300);
    });

    // Sacred moment animation
    const sacredTitle = document.querySelector('.sacred-title');
    if (sacredTitle) {
        sacredTitle.classList.add('luxury-accent');
    }
}

// Enhanced CSS for additional animations
const additionalStyles = `
    .float-animation {
        animation: premiumFloat 8s ease-in-out infinite;
    }

    @keyframes premiumFloat {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    .pulse-animation {
        animation: premiumPulse 3s ease-in-out infinite;
    }

    @keyframes premiumPulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 2px 15px rgba(44, 90, 160, 0.08);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 20px 60px rgba(212, 175, 55, 0.1);
        }
    }

    .loaded .hero-title {
        animation: elegantSlideIn 1.2s ease-out;
    }

    .loaded .hero-subtitle {
        animation: elegantSlideIn 1.2s ease-out 0.4s both;
    }

    .loaded .hero-buttons {
        animation: elegantSlideIn 1.2s ease-out 0.8s both;
    }

    @keyframes elegantSlideIn {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
    }

    .modal-header h2 {
        font-family: 'Playfair Display', serif;
        color: #1a1a1a;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #7a7a7a;
        transition: all 0.3s ease;
        padding: 0.5rem;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        color: #1a1a1a;
        background: #f8faff;
        transform: rotate(90deg);
    }

    .modal-form h3 {
        font-family: 'Playfair Display', serif;
        color: #1a1a1a;
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .form-note {
        color: #4a4a4a;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .modal-features h4 {
        font-family: 'Playfair Display', serif;
        color: #1a1a1a;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    .quick-form input,
    .quick-form textarea {
        width: 100%;
        padding: 15px 20px;
        margin-bottom: 1.2rem;
        border: 2px solid #e8edf7;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        font-family: inherit;
        background: #f8faff;
    }

    .quick-form input:focus,
    .quick-form textarea:focus {
        outline: none;
        border-color: #2C5AA0;
        background: white;
        box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }

    .testimonial-quote {
        animation: fadeInScale 1s ease-out;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

// Add enhanced styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize enhanced animations after load
window.addEventListener('load', () => {
    setTimeout(addAdvancedAnimations, 1200);
});

// Performance optimization: Enhanced debounce scroll events
function debounce(func, wait) {
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

// Apply enhanced debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Add any additional scroll-based functionality here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler); 