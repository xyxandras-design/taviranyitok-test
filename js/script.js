let lastScrollY = 0;

// Lightbox megnyitása
document.querySelectorAll('.zoom-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lastScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lastScrollY}px`;
      document.body.style.width = '100%';
      target.style.display = 'flex';
    }
  });
});
// Lightbox bezárása – CSAK a képre kattintva
document.querySelectorAll('.lightbox').forEach(box => {
  const img = box.querySelector('img');
  if (img) {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      box.style.display = 'none';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, lastScrollY);
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const back = document.getElementById('backBtn');
  if (back) {
    back.addEventListener('click', () => goBack('hisense.html'));
  }
});
// ✅ CSP-barát visszagomb eseménykezelő
document.addEventListener('DOMContentLoaded', function() {
  const back = document.getElementById('backBtn');
  if (back) {
    back.addEventListener('click', () => goBack('hisense.html'));
  }
});
// ✅ CSP-kompatibilis visszalépés
function goBack(fallbackUrl = 'index.html') {
  try {
    if (document.referrer) {
      const refOrigin = new URL(document.referrer).origin;
      if (refOrigin === location.origin) {
        window.history.back();
        setTimeout(() => {
          if (location.href === location.href) {
            window.location.href = fallbackUrl;
          }
        }, 300);
        return;
      }
    }
    if (window.opener) {
      window.close();
      setTimeout(() => window.location.href = fallbackUrl, 250);
      return;
    }
    window.close();
    setTimeout(() => window.location.href = fallbackUrl, 250);
  } catch (e) {
    window.location.href = fallbackUrl;
  }
}
