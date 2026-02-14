const overlay = document.getElementById('overlay');
const menuDrawer = document.getElementById('menuDrawer');
const cartDrawer = document.getElementById('cartDrawer');
const menuBtn = document.getElementById('menuBtn');
const cartBtn = document.getElementById('cartBtn');
const closeButtons = document.querySelectorAll('[data-close]');

function showOverlay(show) {
  if (overlay) overlay.hidden = !show;
}

function openDrawer(drawer) {
  if (!drawer) return;
  drawer.classList.add('open');
  showOverlay(true);
}

function closeAllDrawers() {
  if (menuDrawer) menuDrawer.classList.remove('open');
  if (cartDrawer) cartDrawer.classList.remove('open');
  showOverlay(false);
}

if (menuBtn) menuBtn.addEventListener('click', () => openDrawer(menuDrawer));
if (cartBtn) cartBtn.addEventListener('click', () => openDrawer(cartDrawer));
closeButtons.forEach((btn) => btn.addEventListener('click', closeAllDrawers));
if (overlay) overlay.addEventListener('click', () => {
  closeAllDrawers();
  closeNewsletterPopup();
});

const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    if (!email || !email.value.trim()) return;
    newsletterSuccess.textContent = 'Danke! Dein 10%-Code wurde erfolgreich versendet.';
    newsletterForm.reset();
    closeNewsletterPopup();
  });
}

const newsletterPopup = document.getElementById('newsletterPopup');
const openPopupLink = document.getElementById('openPopupLink');
const closePopup = document.getElementById('closePopup');
const focusNewsletter = document.getElementById('focusNewsletter');

function openNewsletterPopup() {
  if (!newsletterPopup) return;
  newsletterPopup.hidden = false;
  showOverlay(true);
}

function closeNewsletterPopup() {
  if (!newsletterPopup) return;
  newsletterPopup.hidden = true;
  if (!(menuDrawer?.classList.contains('open')) && !(cartDrawer?.classList.contains('open'))) {
    showOverlay(false);
  }
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
if (newsletterPopup) setTimeout(openNewsletterPopup, 5000);

const quotes = [...document.querySelectorAll('.quote-slide')];
const prevQuote = document.getElementById('prevQuote');
const nextQuote = document.getElementById('nextQuote');
let quoteIndex = 0;

function renderQuote() {
  if (!quotes.length) return;
  quotes.forEach((q, i) => q.classList.toggle('active', i === quoteIndex));
}
if (prevQuote) prevQuote.addEventListener('click', () => { quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length; renderQuote(); });
if (nextQuote) nextQuote.addEventListener('click', () => { quoteIndex = (quoteIndex + 1) % quotes.length; renderQuote(); });
renderQuote();
