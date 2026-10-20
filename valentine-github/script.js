// ============================================
// 💗 Valentine's Day - GitHub Pages JS
// File: script.js
// ============================================

// FLOATING HEARTS
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    const hearts = ['❤️', '💕', '💗', '💖', '💘', '🌹', '💝'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.classList.add('float-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 8) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}
createFloatingHearts();

// OPEN SURPRISE
function openSurprise() {
    const hero = document.getElementById('heroSection');
    const content = document.getElementById('valentineContent');

    hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(-30px)';

    setTimeout(function() {
        hero.style.display = 'none';
        content.style.display = 'block';
        content.offsetHeight;
        content.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
}

// READ MORE TOGGLE
function toggleReadMore() {
    const extended = document.getElementById('letterExtended');
    const btn = document.getElementById('btnReadMore');

    if (extended.classList.contains('show')) {
        extended.classList.remove('show');
        btn.textContent = 'Read More 💕';
    } else {
        extended.classList.add('show');
        btn.textContent = 'Read Less 💌';
    }
}

// LIGHTBOX
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const cap = document.getElementById('lightboxCaption');

    img.src = src;
    cap.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// SMOOTH EVADING NO BUTTON
const dodgeMessages = [
    "Nice try! 😂", "You can't catch me! 😭", "Just click YES! ❤️",
    "Nope, not happening! 😜", "I'm too fast for you! 💨", "Come on, just say YES! 💕"
];

let dodgeCount = 0;
let lastDodgeTime = 0;

function initEvadingButton() {
    const btnNo = document.getElementById('btnNo');
    const questionCard = document.getElementById('questionCard');

    if (!btnNo || !questionCard) return;

    btnNo.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

    function dodge() {
        const now = Date.now();
        if (now - lastDodgeTime < 150) return;
        lastDodgeTime = now;

        const cardRect = questionCard.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();

        const maxOffsetX = (cardRect.width / 2) - (btnRect.width / 2) - 30;
        const maxOffsetY = (cardRect.height / 2) - (btnRect.height / 2) - 30;

        let randomX = (Math.random() - 0.5) * 2 * maxOffsetX;
        let randomY = (Math.random() - 0.5) * 2 * maxOffsetY;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

        dodgeCount++;
        const dodgeMsg = document.getElementById('dodgeMessage');
        if (dodgeMsg) {
            dodgeMsg.textContent = dodgeMessages[(dodgeCount - 1) % dodgeMessages.length];
            dodgeMsg.classList.add('show');
            setTimeout(() => dodgeMsg.classList.remove('show'), 1500);
        }
    }

    document.addEventListener('mousemove', function(e) {
        if (!btnNo || btnNo.style.display === 'none') return;
        const rect = btnNo.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        if (distance < 110) dodge();
    });

    btnNo.addEventListener('mouseenter', dodge);
    btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); }, { passive: false });
    btnNo.addEventListener('click', (e) => { e.preventDefault(); dodge(); });
}

// YES BUTTON CELEBRATION
function clickedYes() {
    const questionCard = document.getElementById('questionCard');
    const celebration = document.getElementById('celebration');

    questionCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    questionCard.style.opacity = '0';
    questionCard.style.transform = 'scale(0.9)';

    setTimeout(function() {
        questionCard.style.display = 'none';
        celebration.classList.add('show');
        startConfetti();
    }, 500);
}

// CONFETTI
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#e91e63', '#f44336', '#ff4081', '#f8bbd0', '#fce4ec', '#ad1457', '#c2185b'];

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 10 - 5,
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(function(piece) {
            ctx.save();
            ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.globalAlpha = piece.opacity;
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();

            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotSpeed;

            if (piece.y > canvas.height + 20) piece.y = -20;
        });
        requestAnimationFrame(animateConfetti);
    }
    animateConfetti();
}

document.addEventListener('DOMContentLoaded', initEvadingButton);