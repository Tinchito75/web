document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation for bento items
    const bentoItems = document.querySelectorAll('.bento-item');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    bentoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });

    // Terminal typing effect
    const statusLine = document.querySelector('.status-line');
    if (statusLine) {
        const text = statusLine.textContent;
        statusLine.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                statusLine.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 1000);
    }

    // Dynamic Modal Logic
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // IDs of cards that should trigger the modal
    const triggerIds = ['hero-card', 'pitch-card', 'auto-card', 'scale-card', 'integ-card', 'roi-card'];

    function openModal(cardId) {
        if (!modalOverlay || !modalBody) return;

        // Get template content
        const template = document.getElementById(`data-${cardId}`);
        if (template) {
            modalBody.innerHTML = template.innerHTML;
            modalOverlay.classList.remove('hidden');
            document.body.classList.add('modal-open');
        }
    }

    function hideModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.add('hidden');
        document.body.classList.remove('modal-open');
        // Clear body after close for clean transitions next time
        setTimeout(() => {
            if (modalOverlay.classList.contains('hidden')) {
                modalBody.innerHTML = '';
            }
        }, 500);
    }

    // Attach listeners to all trigger cards
    triggerIds.forEach(id => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener('click', () => openModal(id));
        }
    });

    if (closeModal) {
        closeModal.addEventListener('click', (e) => {
            e.stopPropagation();
            hideModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // Screensaver Logic
    const screensaver = document.getElementById('screensaver');

    window.addEventListener('blur', () => {
        if (screensaver) screensaver.classList.remove('hidden');
    });

    window.addEventListener('focus', () => {
        if (screensaver) screensaver.classList.add('hidden');
    });

    // Dismiss screensaver
    ['keydown', 'mousedown'].forEach(evt => {
        document.addEventListener(evt, () => {
            if (screensaver) screensaver.classList.add('hidden');
        });
    });
});
