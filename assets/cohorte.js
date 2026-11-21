const margin = [18, 30, 39, 47, 53, 58, 63];
const slider = document.querySelector('#cpa');
function update() {
  const cost = Number(slider.value);
  const month = margin.findIndex(value => value >= cost);
  const balance = margin[6] - cost;
  const threshold = document.querySelector('#threshold');
  threshold.setAttribute('y1', 160 - cost * 2);
  threshold.setAttribute('y2', 160 - cost * 2);
  document.querySelector('#cost').textContent = cost + ' €';
  const recovery = month < 0 ? 'Coût encore à couvrir à six mois.' : month === 0 ? 'Coût couvert dès le premier achat.' : 'Coût couvert au mois ' + month + '.';
  document.querySelector('#result').textContent = recovery + ' Marge à six mois après acquisition : ' + balance + ' € par client.';
}
slider.addEventListener('input', update);
update();
