// ─── POPUP.JS ────────────────────────────────────────────
// Türkçe Karakter Dönüştürücü v2.0
// Algoritma: turkish-deasciifier (Dr. Deniz Yuret)

document.addEventListener('DOMContentLoaded', () => {
  const inputEl  = document.getElementById('input');
  const outputEl = document.getElementById('output');
  const btnDon   = document.getElementById('btn-donustur');
  const btnKopya = document.getElementById('btn-kopya');
  const btnTemiz = document.getElementById('btn-temiz');
  const charBtns = document.querySelectorAll('.char-btn');
  const sayac    = document.getElementById('sayac');

  // Deasciifier instance
  const deasciifier = new TurkishDeasciifier();

  // ── Karakter paleti ──────────────────────────────────
  charBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ch    = btn.dataset.ch;
      const start = inputEl.selectionStart;
      const end   = inputEl.selectionEnd;
      inputEl.value = inputEl.value.slice(0, start) + ch + inputEl.value.slice(end);
      inputEl.selectionStart = inputEl.selectionEnd = start + ch.length;
      inputEl.focus();
      guncelleSayac();
    });
  });

  // ── Karakter sayacı ──────────────────────────────────
  inputEl.addEventListener('input', guncelleSayac);
  function guncelleSayac() {
    sayac.textContent = inputEl.value.length + ' karakter';
  }

  // ── Dönüştür ─────────────────────────────────────────
  btnDon.addEventListener('click', () => {
    const sonuc = deasciifier.deasciify(inputEl.value);
    outputEl.value = sonuc;
    outputEl.classList.add('animate');
    setTimeout(() => outputEl.classList.remove('animate'), 400);
  });

  // Ctrl+Enter kısayolu
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) btnDon.click();
  });

  // ── Kopyala ──────────────────────────────────────────
  btnKopya.addEventListener('click', async () => {
    if (!outputEl.value) return;
    try {
      await navigator.clipboard.writeText(outputEl.value);
    } catch {
      outputEl.select();
      document.execCommand('copy');
    }
    btnKopya.textContent = '✓ Kopyalandı!';
    btnKopya.classList.add('copied');
    setTimeout(() => {
      btnKopya.textContent = 'Kopyala';
      btnKopya.classList.remove('copied');
    }, 1800);
  });

  // ── Temizle ──────────────────────────────────────────
  btnTemiz.addEventListener('click', () => {
    inputEl.value  = '';
    outputEl.value = '';
    guncelleSayac();
    inputEl.focus();
  });
});
