document.addEventListener('DOMContentLoaded', () => {
  const inputEl  = document.getElementById('input');
  const outputEl = document.getElementById('output');
  const btnKopya = document.getElementById('btn-kopya');

  const deasciifier = new TurkishDeasciifier();

  // Live conversion on every keystroke
  inputEl.addEventListener('input', () => {
    outputEl.value = deasciifier.deasciify(inputEl.value);
  });

  // Copy
  btnKopya.addEventListener('click', async () => {
    if (!outputEl.value) return;
    try {
      await navigator.clipboard.writeText(outputEl.value);
    } catch {
      outputEl.select();
      document.execCommand('copy');
    }
    btnKopya.textContent = '✓';
    btnKopya.classList.add('copied');
    setTimeout(() => {
      btnKopya.textContent = 'Copy';
      btnKopya.classList.remove('copied');
    }, 1500);
  });
});