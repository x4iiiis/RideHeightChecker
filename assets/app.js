import { rides } from '../data/rides.js';

const state = {
  unit: 'in',
  heightInches: 40,
  filter: 'all',
  requirementsOnly: false,
  childName: ''
};

const elements = {
  form: document.querySelector('#height-form'),
  nameInput: document.querySelector('#child-name'),
  pageTitle: document.querySelector('#page-title'),
  input: document.querySelector('#height-input'),
  unitLabel: document.querySelector('#unit-label'),
  conversion: document.querySelector('#conversion'),
  unitButtons: [...document.querySelectorAll('.unit-button')],
  filterButtons: [...document.querySelectorAll('.filter-button')],
  requirementsOnly: document.querySelector('#height-requirements-only'),
  list: document.querySelector('#ride-list'),
  template: document.querySelector('#ride-template'),
  empty: document.querySelector('#empty-state'),
  availableCount: document.querySelector('#available-count'),
  restrictedCount: document.querySelector('#restricted-count'),
  nextHeight: document.querySelector('#next-height'),
  visibleCount: document.querySelector('#visible-count')
};

const inchesToCm = inches => inches * 2.54;
const cmToInches = cm => cm / 2.54;
const rounded = value => Number(value.toFixed(1));

function parseHeight(value) {
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return state.unit === 'in' ? number : cmToInches(number);
}

function statusFor(ride) {
  if (state.heightInches < ride.minHeight) return 'restricted';
  if (ride.independentHeight && state.heightInches < ride.independentHeight) return 'conditional';
  return 'available';
}

function cleanName(value) {
  return value.trim().replace(/\s+/g, ' ').slice(0, 30);
}

function possessiveName(name) {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`;
}

function updateTitle() {
  elements.pageTitle.textContent = state.childName
    ? `What can ${possessiveName(state.childName)} ride at Magic Kingdom?`
    : 'What can your child ride at Magic Kingdom?';
}

function updateUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('height', rounded(state.heightInches));
  url.searchParams.set('unit', state.unit);
  if (state.childName) {
    url.searchParams.set('name', state.childName);
  } else {
    url.searchParams.delete('name');
  }
  history.replaceState({}, '', url);
}

function readUrl() {
  const params = new URLSearchParams(window.location.search);
  const unit = params.get('unit');
  const height = Number.parseFloat(params.get('height'));
  const childName = cleanName(params.get('name') || localStorage.getItem('rideHeightChildName') || '');
  if (unit === 'cm' || unit === 'in') state.unit = unit;
  if (Number.isFinite(height) && height >= 0) state.heightInches = height;
  state.childName = childName;
}

function formatRule(ride) {
  if (ride.minHeight === 0) return 'Any height';
  if (ride.independentHeight) return `${ride.minHeight} in minimum · ${ride.independentHeight} in to drive alone`;
  return `${ride.minHeight} in minimum`;
}

function formatDetail(ride, status) {
  if (status === 'available') {
    if (ride.minHeight === 0) return 'No minimum height requirement.';
    if (ride.independentHeight) return 'Tall enough to drive independently.';
    return `Meets the requirement by ${rounded(state.heightInches - ride.minHeight)} in.`;
  }
  if (status === 'conditional') return ride.conditionalText;
  return `${rounded(ride.minHeight - state.heightInches)} in to go.`;
}

function render() {
  elements.list.replaceChildren();

  const statuses = rides.map(ride => ({ ride, status: statusFor(ride) }));
  const available = statuses.filter(({ status }) => status !== 'restricted').length;
  const restricted = rides.length - available;
  const nextThreshold = [...new Set(rides.map(ride => ride.minHeight).filter(height => height > state.heightInches))].sort((a, b) => a - b)[0];

  elements.availableCount.textContent = available;
  elements.restrictedCount.textContent = restricted;
  elements.nextHeight.textContent = nextThreshold ? `${nextThreshold} in` : 'All clear';

  const visible = statuses.filter(({ ride, status }) => {
    if (state.requirementsOnly && ride.minHeight === 0) return false;
    if (state.filter === 'available' && status === 'restricted') return false;
    if (state.filter === 'restricted' && status !== 'restricted') return false;
    return true;
  });

  visible.sort((a, b) => {
    const order = { available: 0, conditional: 1, restricted: 2 };
    return order[a.status] - order[b.status] || a.ride.minHeight - b.ride.minHeight || a.ride.name.localeCompare(b.ride.name);
  });

  visible.forEach(({ ride, status }) => {
    const fragment = elements.template.content.cloneNode(true);
    const card = fragment.querySelector('.ride-card');
    card.dataset.status = status;
    fragment.querySelector('.status-icon').textContent = status === 'available' ? '✓' : status === 'conditional' ? '!' : '×';
    fragment.querySelector('.ride-name').textContent = ride.name;
    fragment.querySelector('.land-badge').textContent = ride.land;
    fragment.querySelector('.ride-rule').textContent = formatRule(ride);
    fragment.querySelector('.ride-detail').textContent = formatDetail(ride, status);
    elements.list.append(fragment);
  });

  elements.visibleCount.textContent = `${visible.length} of ${rides.length} shown`;
  elements.empty.hidden = visible.length > 0;
  elements.list.hidden = visible.length === 0;

  const displayInches = rounded(state.heightInches);
  const displayCm = rounded(inchesToCm(state.heightInches));
  elements.conversion.textContent = `${displayInches} in = ${displayCm} cm`;
}

function syncUnitControls() {
  elements.unitButtons.forEach(button => {
    const active = button.dataset.unit === state.unit;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  elements.unitLabel.textContent = state.unit;
  elements.input.max = state.unit === 'in' ? '96' : '244';
  elements.input.step = '0.1';
  elements.input.value = state.unit === 'in' ? rounded(state.heightInches) : rounded(inchesToCm(state.heightInches));
}

elements.form.addEventListener('submit', event => event.preventDefault());
elements.nameInput.addEventListener('input', event => {
  state.childName = cleanName(event.target.value);
  localStorage.setItem('rideHeightChildName', state.childName);
  updateTitle();
  updateUrl();
});
elements.input.addEventListener('input', event => {
  state.heightInches = parseHeight(event.target.value);
  updateUrl();
  render();
});

elements.unitButtons.forEach(button => {
  button.addEventListener('click', () => {
    state.unit = button.dataset.unit;
    syncUnitControls();
    updateUrl();
    render();
  });
});

elements.filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    elements.filterButtons.forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    render();
  });
});

elements.requirementsOnly.addEventListener('change', event => {
  state.requirementsOnly = event.target.checked;
  render();
});

readUrl();
elements.nameInput.value = state.childName;
updateTitle();
syncUnitControls();
render();
