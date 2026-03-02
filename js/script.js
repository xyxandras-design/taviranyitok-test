// =====================================
// LIGHTBOX KEZELÉS
// =====================================

let lastScrollY = 0;

document.addEventListener('DOMContentLoaded', function () {

  // --- Lightbox megnyitása ---
  document.querySelectorAll('.zoom-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      lastScrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${lastScrollY}px`;
      document.body.style.width = '100%';

      target.style.display = 'flex';
    });
  });

  // --- Lightbox bezárása ---
  document.querySelectorAll('.lightbox').forEach(box => {
    box.addEventListener('click', function () {

      box.style.display = 'none';

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, lastScrollY);
    });
  });

});


// =====================================
// GYÁRTÓ OLDAL – Scroll mentés + visszaállítás
// =====================================

// Gyártóoldalt a .product-grid jelenléte alapján azonosítjuk
if (document.querySelector('.product-grid')) {

  // Scroll mentése CSAK akkor, amikor típusoldal linkre kattintunk
document.querySelectorAll('.tipus-link').forEach(link => {
  link.addEventListener('click', function () {
    sessionStorage.setItem('gyartoScrollPos', window.scrollY);
  });
});

  // Visszatéréskor scroll visszaállítás
  window.addEventListener('load', function () {

    const shouldRestore = sessionStorage.getItem('restoreGyartoScroll');
    const savedScroll = sessionStorage.getItem('gyartoScrollPos');

    if (shouldRestore === '1' && savedScroll !== null) {
      window.scrollTo(0, parseInt(savedScroll));
    }

    // Reset flag minden betöltés után
    sessionStorage.removeItem('restoreGyartoScroll');
  });
}


// =====================================
// TÍPUS OLDAL – Visszagomb logika
// =====================================

function goBackToGyarto(gyartoUrl) {

  const savedScroll = sessionStorage.getItem('gyartoScrollPos');

  if (savedScroll !== null) {
    // Jelezzük a gyártó oldalnak, hogy állítsa vissza a scrollt
    sessionStorage.setItem('restoreGyartoScroll', '1');
  }

  window.location.href = gyartoUrl;
}
