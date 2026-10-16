const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZابتثجحخدذرزسشصضطظعغفقكلمنهوي';

export function decode(el: HTMLElement, delay = 0) {
  const text = el.dataset.text || '';
  const steps = text.length * 3;
  let frame = 0;
  setTimeout(() => {
    const id = setInterval(() => {
      el.textContent = text.split('').map((c, i) => {
        if (c === ' ') return ' ';
        return frame > i * 3 ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      frame++;
      if (frame > steps) { el.textContent = text; clearInterval(id); }
    }, 38);
  }, delay);
}

export function reserveWidths(root?: Element | null) {
  (root || document).querySelectorAll<HTMLElement>('.t[data-text]').forEach(el => {
    el.textContent = el.dataset.text!;
    el.style.width = Math.ceil(el.getBoundingClientRect().width) + 'px';
    el.style.display = 'inline-block';
    el.textContent = '';
  });
}

export function decodeAll(root?: Element | null, stagger = 70) {
  (root || document).querySelectorAll<HTMLElement>('.t[data-text]').forEach((el, i) => decode(el, i * stagger));
}
