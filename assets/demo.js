const channels = document.querySelector('#channels');
const scenarios = {
  search: {
    average: 5,
    marginal: 2,
    decision: 'Search · À ce niveau de rendement, le budget supplémentaire réduirait la contribution.'
  },
  social: {
    average: 3.6,
    marginal: 3.2,
    decision: 'Social · Le rendement marginal justifie un test d’augmentation du budget, avec suivi de la marge.'
  }
};

const ratio = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
const euros = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  signDisplay: 'exceptZero'
});

const averageValue = document.querySelector('#average-value');
const averageMeter = document.querySelector('#average-meter');
const marginalValue = document.querySelector('#marginal-value');
const marginalMeter = document.querySelector('#marginal-meter');
const contribution = document.querySelector('#contribution');
const decision = document.querySelector('#decision');

function updateScenario() {
  const { average, marginal, decision: recommendation } = scenarios[channels.querySelector(':checked').value];
  const additionalBudget = 1000;
  const contributionMargin = 0.4;
  averageValue.textContent = ratio.format(average) + '×';
  averageMeter.value = average;
  marginalValue.textContent = ratio.format(marginal) + '×';
  marginalMeter.value = marginal;
  contribution.textContent = euros.format(additionalBudget * (marginal * contributionMargin - 1)).replace('-', '−');
  decision.textContent = recommendation;
}

channels.addEventListener('change', updateScenario);
updateScenario();
channels.hidden = false;
