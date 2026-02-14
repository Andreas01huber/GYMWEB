const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

const popup = document.getElementById('newsletterPopup');
const closePopup = document.getElementById('closePopup');
const focusNewsletter = document.getElementById('focusNewsletter');
const openPopupLink = document.getElementById('openPopupLink');

function showOverlay(show) {
  overlay.hidden = !show;
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  showOverlay(true);
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  showOverlay(false);
}

function openNewsletterPopup() {
  popup.hidden = false;
  showOverlay(true);
}

function closeNewsletterPopup() {
  popup.hidden = true;
  if (!cartDrawer.classList.contains('open')) {
    showOverlay(false);
  }
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);
openPopupLink.addEventListener('click', openNewsletterPopup);

overlay.addEventListener('click', () => {
  closeCartDrawer();
  closeNewsletterPopup();
});

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email) return;
  newsletterSuccess.textContent = 'Danke! Dein 10%-Code wurde an deine E-Mail gesendet.';
  newsletterForm.reset();
  closeNewsletterPopup();
});

closePopup.addEventListener('click', closeNewsletterPopup);
focusNewsletter.addEventListener('click', () => {
  closeNewsletterPopup();
  document.getElementById('email').focus();
});

setTimeout(openNewsletterPopup, 5000);
