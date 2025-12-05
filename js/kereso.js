
const manufacturerFiles = {
  akai: "json/akai_adatok.json",
  alcor: "json/alcor_adatok.json",
  allview: "json/allview_adatok.json",
  "antenna-digital": "json/antenna-digital_adatok.json",
  blaupunkt: "json/blaupunkt_adatok.json",
  celcus: "json/celcus_adatok.json",
  chiq: "json/chiq_adatok.json",
  daewoo: "json/daewoo_adatok.json",
  digi: "json/digi_adatok.json",
  digihome: "json/digihome_adatok.json",
  dimarson: "json/dimarson_adatok.json",
  dyon: "json/dyon_adatok.json",
  dyras: "json/dyras_adatok.json",
  echosmart: "json/echosmart_adatok.json",
  funai: "json/funai_adatok.json",
  gaba: "json/gaba_adatok.json",
  gogen: "json/gogen_adatok.json",
  grundig: "json/grundig_adatok.json",
  hisense: "json/hisense_adatok.json",
  hitachi: "json/hitachi_adatok.json",
  horizon: "json/horizon_adatok.json",
  hyundai: "json/hyundai_adatok.json",
  jvc: "json/jvc_adatok.json",
  lg: "json/lg_adatok.json",
  manta: "json/manta_adatok.json",
  millenium: "json/millenium_adatok.json",
  navon: "json/navon_adatok.json",
  ok: "json/ok_adatok.json",
  onkyo: "json/onkyo_adatok.json",
  orion: "json/orion_adatok.json",
  "orion-dvd": "json/orion-dvd_adatok.json",
  panasonic: "json/panasonic_adatok.json",
  philips: "json/philips_adatok.json",
  qilive: "json/qilive_adatok.json",
  samsung: "json/samsung_adatok.json",
  sencor: "json/sencor_adatok.json",
  sharp: "json/sharp_adatok.json",
  "smart-tech": "json/smart-tech_adatok.json",
  sony: "json/sony_adatok.json",
  starlight: "json/starlight_adatok.json",
  strong: "json/strong_adatok.json",
  "t-home": "json/t-home_adatok.json",
  tcl: "json/tcl_adatok.json",
  technics: "json/technics_adatok.json",
  technika: "json/technika_adatok.json",
  techwood: "json/techwood_adatok.json",
  telefunken: "json/telefunken_adatok.json",
  tesla: "json/tesla_adatok.json",
  thomson: "json/thomson_adatok.json",
  toshiba: "json/toshiba_adatok.json",
  upc: "json/upc_adatok.json",
  videoton: "json/videoton_adatok.json",
  villanyora: "json/villanyora_adatok.json",
  vodafon: "json/vodafon_adatok.json",
  vortex: "json/vortex_adatok.json",
  wayteq: "json/wayteq_adatok.json",
  yamada: "json/yamada_adatok.json",
  yamaha: "json/yamaha_adatok.json",
};

const manufacturer = document.getElementById("manufacturerSelect");
const input = document.getElementById("modelSearch");
const box = document.getElementById("searchSuggestions");
let currentData = [];

// Gyártó kiválasztása
manufacturer.addEventListener("change", () => {
  const selected = manufacturer.value;
  input.value = "";
  box.innerHTML = "";

  if (!selected) {
    currentData = [];
    input.disabled = true;
    return;
  }

  fetch(manufacturerFiles[selected])
    .then(res => res.json())
    .then(data => {
      currentData = data;
      input.disabled = false;

      // Ha kevés adat van, automatikusan jelenítse meg
      if (currentData.length > 0 && currentData.length <= 10) {
        showSuggestions(currentData);
      }
    })
    .catch(err => {
      console.error("JSON betöltési hiba:", err);
      currentData = [];
      input.disabled = true;
      box.innerHTML = "<p style='color:red; background:white; padding:5px; border-radius:4px;'>Nem sikerült betölteni az adatokat.</p>";
    });
});

// Keresés logika
input.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  box.innerHTML = "";
  if (!currentData.length) return;

  const n = currentData.length;
  const minChars = n <= 10 ? 0 : n <= 20 ? 1 : 2;
  if (q.length < minChars) return;

  const filtered = currentData
    .filter(item => item.tipus.toLowerCase().includes(q))
    .slice(0, 10);

  if (filtered.length === 0) {
    box.innerHTML = "<p style='color:black; background:white; padding:5px; border-radius:4px;'>Nincs találat.</p>";
    return;
  }

  showSuggestions(filtered);
});

// Függvény a találatok megjelenítésére
function showSuggestions(list) {
  box.innerHTML = "";
  list.slice(0, 10).forEach(item => {
    const div = document.createElement("div");
    div.textContent = item.tipus;
    div.addEventListener("click", () => {
      const folderName = item.gyarto.toLowerCase() + "-taviranyitok";
      const url = `${folderName}/${item.html}`;
      console.log("Kiválasztott URL:", url);
      window.open(url, "_blank");  // ← itt a változtatás
    });
    box.appendChild(div);
  });
}
