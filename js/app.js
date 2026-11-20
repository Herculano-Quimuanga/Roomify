/**
 * ROOMIFY - Master Interactive Script
 * Modern, accessible, responsive behaviors
 */

// Home Navigation on brand logo click
document.querySelectorAll(".logo-brand").forEach(logo => {
    logo.addEventListener('click', () => {
        window.location = 'index.html';
    });
});

// Navigate to download page
function gotoDonw() {
    window.location = 'donwload.html';
}

// Smooth scroll to target section
function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile responsive menu toggle
const nav = document.querySelector(".navigator");
const menu = document.querySelector(".responsivy");

if (menu && nav) {
    menu.addEventListener('click', () => {
        nav.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('disable-scroll', nav.classList.contains('active'));
    });

    // Close menu when clicking any nav link on mobile
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('disable-scroll');
            }
        });
    });
}

// Sticky header elevation on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, { passive: true });

// FAQ accordion toggling
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');
    
    // Toggle active state with smooth slide
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        if (icon) icon.classList.remove('rotate');
    } else {
        // Optional: close other open FAQs for accordion effect
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        document.querySelectorAll('.faq .icon').forEach(ic => {
            ic.classList.remove('rotate');
        });

        answer.style.display = 'block';
        if (icon) icon.classList.add('rotate');
    }
}

// Section 3: Flexible Solutions Tabs
function showContent(contentId) {
    // Highlight active link
    document.querySelectorAll('.third-section .link').forEach(link => {
        link.classList.remove('active');
    });

    // Handle when clicked directly or on inner child (icon / span)
    const currentLink = window.event ? (window.event.currentTarget || window.event.target.closest('.link')) : null;
    if (currentLink) {
        currentLink.classList.add('active');
    }

    // Toggle content visibility
    document.querySelectorAll('.third-section .content').forEach(content => {
        content.classList.remove('active');
    });

    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Section 5: Team Collaboration Tabs
function showNavContent(contentId) {
    // Highlight active nav-link
    document.querySelectorAll('.fifth-section .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const currentNavLink = window.event ? (window.event.currentTarget || window.event.target.closest('.nav-link')) : null;
    if (currentNavLink) {
        currentNavLink.classList.add('active');
    }

    // Toggle content visibility
    document.querySelectorAll('.fifth-section .nav-content').forEach(content => {
        content.classList.remove('active');
    });

    const targetNavContent = document.getElementById(contentId);
    if (targetNavContent) {
        targetNavContent.classList.add('active');
    }
}

// Live statistics counter animation
document.addEventListener('DOMContentLoaded', function () {
    const statsSection = document.getElementById('statsSection');
    const stats = document.querySelectorAll('.stat h1');
    let statsAnimated = false;

    function runCounterAnimation() {
        if (statsAnimated) return;
        statsAnimated = true;

        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target') || 0;
            const duration = 2200;
            const frameRate = 16;
            const totalSteps = duration / frameRate;
            const increment = target / totalSteps;

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Update only text node, keep suffix span intact
                if (stat.childNodes.length > 0) {
                    stat.childNodes[0].nodeValue = Math.ceil(current);
                }
            }, frameRate);
        });
    }

    // Modern IntersectionObserver with fallback
    if ('IntersectionObserver' in window && statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounterAnimation();
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.25 });
        observer.observe(statsSection);
    } else if (statsSection) {
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        function checkStatsScroll() {
            if (isInViewport(statsSection) && !statsAnimated) {
                runCounterAnimation();
                window.removeEventListener('scroll', checkStatsScroll);
            }
        }

        window.addEventListener('scroll', checkStatsScroll, { passive: true });
        checkStatsScroll();
    }
});

// Modals: Login & Sign Up
const btn_login = document.getElementById("login");
const btn_sign = document.getElementById("sing");
const modal_login = document.querySelector(".modal-login");
const modal_sign = document.querySelector(".modal-sign");
const btn_close = document.querySelector(".close-modal");
const btn_close_sign = document.querySelector(".close-modal-sign");
const newAccount = document.getElementById('newAccount');
const haveAccount = document.getElementById('haveAccount');

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('disable-scroll');
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('disable-scroll');
    }
}

if (btn_login) {
    btn_login.addEventListener('click', () => openModal(modal_login));
}

if (btn_sign) {
    btn_sign.addEventListener('click', () => openModal(modal_sign));
}

if (newAccount) {
    newAccount.addEventListener('click', () => {
        closeModal(modal_login);
        openModal(modal_sign);
    });
}

if (haveAccount) {
    haveAccount.addEventListener('click', () => {
        closeModal(modal_sign);
        openModal(modal_login);
    });
}

if (btn_close) {
    btn_close.addEventListener('click', () => closeModal(modal_login));
}

if (btn_close_sign) {
    btn_close_sign.addEventListener('click', () => closeModal(modal_sign));
}

// Close modals when clicking background overlay or pressing Escape
window.addEventListener('click', (e) => {
    if (e.target === modal_login) closeModal(modal_login);
    if (e.target === modal_sign) closeModal(modal_sign);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(modal_login);
        closeModal(modal_sign);
    }
});

// Login Form Validation
const log_error = document.querySelectorAll('.log_error');
const log_inputs = document.querySelectorAll('.log_input');
const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

function AddError(index) {
    if (log_inputs[index]) {
        log_inputs[index].style.borderColor = '#ef4444';
        log_inputs[index].style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
    }
    if (log_error[index]) log_error[index].style.display = 'block';
}

function RemovError(index) {
    if (log_inputs[index]) {
        log_inputs[index].style.borderColor = '#2563eb';
        log_inputs[index].style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.15)';
    }
    if (log_error[index]) log_error[index].style.display = 'none';
}

function validateEmail() {
    if (log_inputs[0]) {
        if (!regex.test(log_inputs[0].value.trim())) {
            AddError(0);
        } else {
            RemovError(0);
        }
    }
}

function validatePass() {
    if (log_inputs[1]) {
        if (log_inputs[1].value.length < 8) {
            AddError(1);
        } else {
            RemovError(1);
        }
    }
}

// Sign Up Form Validation
const sign_inputs = document.querySelectorAll('.sing_error');
const sign_error = document.querySelectorAll('.error');

function ErrorSignAdd(index) {
    if (sign_inputs[index]) {
        sign_inputs[index].style.borderColor = '#ef4444';
        sign_inputs[index].style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
    }
    if (sign_error[index]) sign_error[index].style.display = 'block';
}

function ErrorSignRemove(index) {
    if (sign_inputs[index]) {
        sign_inputs[index].style.borderColor = '#2563eb';
        sign_inputs[index].style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.15)';
    }
    if (sign_error[index]) sign_error[index].style.display = 'none';
}

function namevalidate() {
    if (sign_inputs[0]) {
        if (sign_inputs[0].value.trim().length < 3) {
            ErrorSignAdd(0);
        } else {
            ErrorSignRemove(0);
        }
    }
}

function nameBeforevalidate() {
    if (sign_inputs[1]) {
        if (sign_inputs[1].value.trim().length < 4) {
            ErrorSignAdd(1);
        } else {
            ErrorSignRemove(1);
        }
    }
}

function emailValidate() {
    if (sign_inputs[2]) {
        if (!regex.test(sign_inputs[2].value.trim())) {
            ErrorSignAdd(2);
        } else {
            ErrorSignRemove(2);
        }
    }
}

function passvalidate() {
    if (sign_inputs[3]) {
        if (sign_inputs[3].value.length < 8) {
            ErrorSignAdd(3);
        } else {
            ErrorSignRemove(3);
            comparepass();
        }
    }
}

function comparepass() {
    if (sign_inputs[3] && sign_inputs[4]) {
        if (sign_inputs[3].value === sign_inputs[4].value && sign_inputs[4].value.length >= 8) {
            ErrorSignRemove(4);
        } else {
            ErrorSignAdd(4);
        }
    }
}

// 360-Degree Single Rotation for Pricing Cards
document.addEventListener('DOMContentLoaded', () => {
    const pricingSections = document.querySelectorAll('.six-section .geral-packge section');
    pricingSections.forEach(sec => {
        const gira = sec.querySelector('.gira');
        if (!gira) return;

        function triggerSpin() {
            if (!gira.classList.contains('spinning')) {
                gira.classList.add('spinning');
            }
        }

        // Trigger single 360 rotation on mouse enter without reverse on mouse leave
        sec.addEventListener('mouseenter', triggerSpin);
        sec.addEventListener('touchstart', triggerSpin, { passive: true });

        gira.addEventListener('animationend', () => {
            gira.classList.remove('spinning');
        });
    });
});

