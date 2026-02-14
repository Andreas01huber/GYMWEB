const overlay = document.getElementById('overlay');
const menuDrawer = document.getElementById('menuDrawer'); // optional
const cartDrawer = document.getElementById('cartDrawer');
const menuBtn = document.getElementById('menuBtn');
const cartBtn = document.getElementById('cartBtn');
const closeButtons = document.querySelectorAll('[data-close]');

const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

const newsletterPopup = document.getElementById('newsletterPopup');
const openPopupLink = document.getElementById('openPopupLink');
const closePopup = document.getElementById('closePopup');
const focusNewsletter = document.getElementById('focusNewsletter');

function showOverlay(show) {
  if (!overlay) return;
  overlay.hidden = !show;
}

function openDrawer(drawer) {
  if (!drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  showOverlay(true);
}

function closeDrawer(drawer) {
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

function closeNewsletterPopup() {
  if (!newsletterPopup) return;
  newsletterPopup.hidden = true;

  const menuOpen = !!menuDrawer && menuDrawer.classList.contains('open');
  const cartOpen = !!cartDrawer && cartDrawer.classList.contains('open');
  if (!menuOpen && !cartOpen) showOverlay(false);
}

function openNewsletterPopup() {
  if (!newsletterPopup) return;
  newsletterPopup.hidden = false;
  showOverlay(true);
}

function closeAllDrawers() {
  closeDrawer(menuDrawer);
  closeDrawer(cartDrawer);
  closeNewsletterPopup();
  showOverlay(false);
}

// Buttons
if (menuBtn) menuBtn.addEventListener('click', () => openDrawer(menuDrawer));
if (cartBtn) cartBtn.addEventListener('click', () => openDrawer(cartDrawer));

closeButtons.forEach((btn) => btn.addEventListener('click', closeAllDrawers));

if (overlay) {
  overlay.addEventListener('click', () => {
    closeAllDrawers();
  });
}

if (openPopupLink) openPopupLink.addEventListener('click', openNewsletterPopup);
if (closePopup) closePopup.addEventListener('click', closeNewsletterPopup);

if (focusNewsletter) {
  focusNewsletter.addEventListener('click', () => {
    closeNewsletterPopup();
    document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('email')?.focus();
  });
}

// Newsletter submit
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    if (!email || !email.value.trim()) return;

    if (newsletterSuccess) {
      newsletterSuccess.textContent = 'Danke! Dein 10%-Code wurde erfolgreich versendet.';
    }
    newsletterForm.reset();
    closeNewsletterPopup();
  });
}

// Auto open popup after 5 seconds
if (newsletterPopup) {
  setTimeout(() => {
    // only open if drawers are not open (avoid stacking annoyances)
    const menuOpen = !!menuDrawer && menuDrawer.classList.contains('open');
    const cartOpen = !!cartDrawer && cartDrawer.classList.contains('open');
    if (!menuOpen && !cartOpen) openNewsletterPopup();
  }, 5000);
}

// Quotes slider
const quotes = Array.from(document.querySelectorAll('.quote-slide'));
const prevQuote = document.getElementById('prevQuote');
const nextQuote = document.getElementById('nextQuote');
let quoteIndex = 0;

function renderQuote() {
  if (!quotes.length) return;
  quotes.forEach((q, i) => q.classList.toggle('active', i === quoteIndex));
}

if (prevQuote) {
  prevQuote.addEventListener('click', () => {
    quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
    renderQuote();
  });
}

if (nextQuote) {
  nextQuote.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    renderQuote();
  });
}

renderQuote();
