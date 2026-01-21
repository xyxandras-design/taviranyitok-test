// ==========================
// Tárolja az utolsó görgetési pozíciót a lightbox használatához
let lastScrollY = 0;

// ==========================
// Lightbox megnyitása és bezárása
document.addEventListener('DOMContentLoaded', function () {

  // ==========================
  // Lightbox megnyitása a zoom ikonra kattintva
  document.querySelectorAll('.zoom-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();

      // A lightbox elem kiválasztása a href alapján
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        // Aktuális scroll pozíció mentése
        lastScrollY = window.scrollY;

        // Oldal rögzítése (scroll tiltása)
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lastScrollY}px`;
        document.body.style.width = '100%';

        // Lightbox megjelenítése
        target.style.display = 'flex';
      }
    });
  });

  // ==========================
  // Lightbox bezárása kizárólag a képre kattintva
  document.querySelectorAll('.lightbox').forEach(box => {
    const img = box.querySelector('img');

    if (img) {
      img.addEventListener('click', function (e) {
        e.preventDefault();

        // Lightbox elrejtése
        box.style.display = 'none';

        // Oldal visszaállítása
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Scroll visszaállítása az eredeti pozícióra
        window.scrollTo(0, lastScrollY);
      });
    }
  });

}); // DOMContentLoaded VÉGE

// ==========================
// Visszalépés konkrét oldalra
function goBackTo(page) {
  if (page) {
    window.location.href = page;  // explicit átirányítás a gyártó oldalra
  } else {
    history.back();               // ha nincs paraméter, próbálkozik history-val
  }
}
