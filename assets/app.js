import { parks, rides } from '../data/rides.js';
import {
  inchesToCm,
  cmToInches,
  rounded,
  statusFor,
  formatRule,
  hasHeightRule,
  localDateIso,
  isRideActive,
  retirementMessage,
  formatDetail
} from './ride-logic.js';

const state = {
  unit: 'in',
  heightInches: 40,
  park: document.body.dataset.defaultPark || 'all',
  filter: 'all',
  requirementsOnly: false,
  childName: ''
};

const elements = {
  form: document.querySelector('#height-form'),
  nameInput: document.querySelector('#child-name'),
  input: document.querySelector('#height-input'),
  unitLabel: document.querySelector('#unit-label'),
  conversion: document.querySelector('#conversion'),

  unitButtons: [...document.querySelectorAll('.unit-button')],
  parkButtons: [...document.querySelectorAll('.park-button')],
  filterButtons: [...document.querySelectorAll('.filter-button')],

  parkPill: document.querySelector('#park-pill'),
  pageHeading: document.querySelector('#page-heading'),
  resultsTitle: document.querySelector('#results-title'),

  requirementsOnly: document.querySelector('#height-requirements-only'),
  list: document.querySelector('#ride-list'),
  template: document.querySelector('#ride-template'),
  empty: document.querySelector('#empty-state'),
  availableCount: document.querySelector('#available-count'),
  restrictedCount: document.querySelector('#restricted-count'),
  nextHeight: document.querySelector('#next-height'),
  visibleCount: document.querySelector('#visible-count')
};

function parseHeight(value) {
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return state.unit === 'in' ? number : cmToInches(number);
}

function cleanName(value) {
  return value.trim().replace(/\s+/g, ' ').slice(0, 30);
}

function possessiveName(name) {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`;
}

function updateUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('height', rounded(state.heightInches));
  url.searchParams.set('unit', state.unit);
  url.searchParams.delete('park');
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
  const savedHeight = Number.parseFloat(localStorage.getItem('rideHeightInches'));
  const savedUnit = localStorage.getItem('rideHeightUnit');
  const defaultPark = document.body.dataset.defaultPark;

  // The static route is authoritative: /animal-kingdom/ must always open
  // with Animal Kingdom selected, regardless of an old ?park= query value.
  if (parks[defaultPark]) {
    state.park = defaultPark;
  }
  if (unit === 'cm' || unit === 'in') {
    state.unit = unit;
  } else if (savedUnit === 'cm' || savedUnit === 'in') {
    state.unit = savedUnit;
  }

  if (Number.isFinite(height) && height >= 0) {
    state.heightInches = height;
  } else if (Number.isFinite(savedHeight) && savedHeight >= 0) {
    state.heightInches = savedHeight;
  }
  state.childName = childName;
}

function syncParkControls() {
  elements.parkButtons.forEach(button => {
    const active = button.dataset.park === state.park;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateMetadata(activePark) {
  const isAll = state.park === 'all';
  const title = isAll
    ? 'Florida Ride Height Checker | Theme Park Rides by Height'
    : `${activePark.name} Ride Height Checker | Rides by Height`;
  const description = isAll
    ? 'Enter your child’s height and instantly see which Florida theme park attractions they can ride.'
    : `Check which ${activePark.name} attractions your child is tall enough to ride.`;

  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
}

function render() {
  elements.list.replaceChildren();

  const today = localDateIso();

  const parkRides = (state.park === 'all'
      ? rides
      : rides.filter(ride => ride.park === state.park)
  ).filter(ride => isRideActive(ride, today));

  const statuses = parkRides.map(ride => ({
    ride,
    status: statusFor(ride, state.heightInches)
  }));

  const activePark = parks[state.park];

  const subject = state.childName
      ? state.childName
      : 'your child';

  elements.pageHeading.textContent = state.park === 'all'
      ? `See what ${subject} can ride across Florida’s major theme parks.`
      : `See what ${subject} can ride at ${activePark.name}.`;

  elements.resultsTitle.textContent = state.park === 'all'
      ? 'All Florida theme park attractions'
      : `${activePark.name} attractions`;

  elements.parkPill.textContent = activePark.shortName;
  updateMetadata(activePark);

  const available = statuses.filter(({ status }) => status !== 'restricted').length;
  const restricted = parkRides.length - available;
  const nextThreshold = [
    ...new Set(
        parkRides
            .map(ride => ride.minHeight)
            .filter(height => height > state.heightInches)
    )
  ].sort((a, b) => a - b)[0];

  elements.availableCount.textContent = available;
  elements.restrictedCount.textContent = restricted;
  elements.nextHeight.textContent = nextThreshold ? `${nextThreshold} in` : 'All clear';

  const visible = statuses.filter(({ ride, status }) => {
    if (state.requirementsOnly && !hasHeightRule(ride)) return false;
    if (state.filter === 'available' && status === 'restricted') return false;
    if (state.filter === 'restricted' && status !== 'restricted') return false;
    return true;
  });

  if (state.park === 'all') {
    const parkOrder = [
      'magic-kingdom',
      'epcot',
      'hollywood-studios',
      'animal-kingdom',
      'typhoon-lagoon',
      'blizzard-beach',
      'universal-studios',
      'islands-of-adventure',
      'epic-universe',
      'volcano-bay',
      'seaworld-orlando',
      'busch-gardens-tampa',
      'aquatica-orlando',
      'adventure-island-tampa',
      'legoland-florida'
    ];

    visible.sort((a, b) => {
      const parkDifference =
          parkOrder.indexOf(a.ride.park) -
          parkOrder.indexOf(b.ride.park);

      if (parkDifference !== 0) {
        return parkDifference;
      }

      const statusOrder = {
        available: 0,
        conditional: 1,
        restricted: 2
      };

      return (
          statusOrder[a.status] - statusOrder[b.status] ||
          a.ride.minHeight - b.ride.minHeight ||
          a.ride.name.localeCompare(b.ride.name)
      );
    });
  } else {
    visible.sort((a, b) => {
      const statusOrder = {
        available: 0,
        conditional: 1,
        restricted: 2
      };

      return (
          statusOrder[a.status] - statusOrder[b.status] ||
          a.ride.minHeight - b.ride.minHeight ||
          a.ride.name.localeCompare(b.ride.name)
      );
    });
  }

  let previousPark = null;

  visible.forEach(({ ride, status }) => {
    if (
        state.park === 'all' &&
        ride.park !== previousPark
    ) {
      const parkHeading = document.createElement('h3');

      parkHeading.className = 'ride-park-heading';
      parkHeading.textContent = parks[ride.park].name;

      elements.list.append(parkHeading);

      previousPark = ride.park;
    }

    const fragment = elements.template.content.cloneNode(true);
    const card = fragment.querySelector('.ride-card');

    card.dataset.status = status;

    fragment.querySelector('.status-icon').textContent =
        status === 'available'
            ? '✓'
            : status === 'conditional'
                ? '!'
                : '×';

    fragment.querySelector('.ride-name').textContent = ride.name;
    fragment.querySelector('.land-badge').textContent = ride.land;
    fragment.querySelector('.ride-rule').textContent = formatRule(ride);

    const detail = fragment.querySelector('.ride-detail');
    const lifecycleMessage = retirementMessage(ride, today);
    detail.textContent = [formatDetail(ride, status, state.heightInches), lifecycleMessage]
        .filter(Boolean)
        .join(' ');

    if (lifecycleMessage) {
      const retirementBadge = document.createElement('span');
      retirementBadge.className = 'retirement-badge';
      retirementBadge.textContent = 'Retiring';
      fragment.querySelector('.ride-title-row').append(retirementBadge);
    }

    elements.list.append(fragment);
  });

  elements.visibleCount.textContent =
      `${visible.length} of ${parkRides.length} shown`;
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

  localStorage.setItem(
      'rideHeightChildName',
      state.childName
  );

  updateUrl();
  render();
});
elements.input.addEventListener('input', event => {
  state.heightInches = parseHeight(event.target.value);
  localStorage.setItem('rideHeightInches', String(state.heightInches));
  updateUrl();
  render();
});

elements.unitButtons.forEach(button => {
  button.addEventListener('click', () => {
    state.unit = button.dataset.unit;
    localStorage.setItem('rideHeightUnit', state.unit);
    syncUnitControls();
    updateUrl();
    render();
  });
});

function siteBasePath() {
  const knownSlugs = [
    'magic-kingdom',
    'epcot',
    'hollywood-studios',
    'animal-kingdom',
    'typhoon-lagoon',
    'blizzard-beach',
    'universal-studios',
    'islands-of-adventure',
    'epic-universe',
    'volcano-bay',
    'seaworld-orlando',
    'busch-gardens-tampa',
    'aquatica-orlando',
    'adventure-island-tampa',
    'legoland-florida'
  ];

  const parts = window.location.pathname.split('/').filter(Boolean);

  if (knownSlugs.includes(parts.at(-1))) {
    parts.pop();
  }

  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

function parkUrl(park) {
  const base = siteBasePath();
  const path = park === 'all' ? base : `${base}${park}/`;
  const url = new URL(path, window.location.origin);

  url.searchParams.set('height', rounded(state.heightInches));
  url.searchParams.set('unit', state.unit);
  if (state.childName) url.searchParams.set('name', state.childName);

  return url;
}

elements.parkButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.assign(parkUrl(button.dataset.park));
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
syncUnitControls();
syncParkControls();
render();
