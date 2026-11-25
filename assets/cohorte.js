const margin = [18, 30, 39, 47, 53, 58, 63];
const slider = document.querySelector('#cpa');
const language = document.documentElement.lang;
const euros = value => new Intl.NumberFormat(language, {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(value);
const messages = {
  fr: ['Coût encore à couvrir à six mois.', 'Coût couvert dès le premier achat.', month => `Coût couvert au mois ${month}.`, value => `Marge à six mois après acquisition : ${value} par client.`],
  en: ['Acquisition cost is still outstanding at six months.', 'The first order covers acquisition cost.', month => `Acquisition cost is recovered in month ${month}.`, value => `Six-month margin after acquisition costs: ${value} per customer.`],
  'zh-Hans': ['到第 6 个月仍未收回获客成本。', '首单即收回获客成本。', month => `第 ${month} 个月收回获客成本。`, value => `到第 6 个月，扣除获客成本后，每位客户贡献 ${value} 利润。`]
};
function update() {
  const cost = Number(slider.value);
  const month = margin.findIndex(value => value >= cost);
  const balance = margin[6] - cost;
  const threshold = document.querySelector('#threshold');
  threshold.setAttribute('y1', 160 - cost * 2);
  threshold.setAttribute('y2', 160 - cost * 2);
  document.querySelector('#cost').textContent = euros(cost);
  const [outstanding, firstOrder, payback, summary] = messages[language];
  const recovery = month < 0 ? outstanding : month === 0 ? firstOrder : payback(month);
  document.querySelector('#result').textContent = recovery + ' ' + summary(euros(balance));
}
slider.addEventListener('input', update);
update();
