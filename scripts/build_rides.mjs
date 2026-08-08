#!/usr/bin/env node
/**
 * Pre-renders each page's ride list (and the summary numbers above it)
 * into static HTML, so the actual ride names, rules, and eligibility --
 * the core content and long-tail keywords of the site -- are present in
 * the raw page source for crawlers and no-JS clients, not only after
 * assets/app.js runs.
 *
 * assets/app.js still re-renders the list on load and on every filter
 * change; this script only fixes what's baked into the HTML for the
 * *default* view (height = 40in, no filters), matching the page's
 * default <input value="40">. Because it computes the exact same
 * status/copy/eligibility as the browser -- via assets/ride-logic.js,
 * the same module app.js imports -- the two can't drift apart.
 *
 * Ride availability can depend on today's date (a ride's `opens`/
 * `closes`/`lifecycle` fields -- e.g. Volcano Bay's seasonal closure),
 * so this snapshot goes stale over time. Re-run it periodically (a daily
 * or weekly scheduled job is plenty) and whenever data/rides.js changes,
 * the same way you'd re-run scripts/build_nav.py after editing parks:
 *
 *   node scripts/build_rides.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { parks, rides, dataVerifiedDate } from '../data/rides.js';
import {
  statusFor,
  formatRule,
  isRideActive,
  retirementMessage,
  formatDetail,
  localDateIso
} from '../assets/ride-logic.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// '' is the repo-root page (index.html), representing the "all parks" view.
const PAGES = [
  '',
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
  'legoland-florida',
  'legoland-water-park',
  'surfari-water-park'
];

// Must stay in sync with the `parkOrder` array in assets/app.js render().
const PARK_ORDER = [
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
  'legoland-florida',
  'legoland-water-park',
  'surfari-water-park'
];

const STATUS_ORDER = { available: 0, conditional: 1, restricted: 2 };
const DEFAULT_HEIGHT_INCHES = 40; // matches <input id="height-input" value="40">

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function rideCardHtml(ride, status, today) {
  const icon = status === 'available' ? '✓' : status === 'conditional' ? '!' : '×';
  const lifecycleMessage = retirementMessage(ride, today);
  const detailText = [formatDetail(ride, status, DEFAULT_HEIGHT_INCHES), lifecycleMessage]
    .filter(Boolean)
    .join(' ');
  const retirementBadge = lifecycleMessage
    ? '<span class="retirement-badge">Retiring</span>'
    : '';

  // Mirrors the <template id="ride-template"> structure in each page --
  // keep the two in sync if that template ever changes shape.
  return (
    `<article class="ride-card" data-status="${status}">` +
      '<div aria-hidden="true" class="status-icon">' + icon + '</div>' +
      '<div class="ride-content">' +
        '<div class="ride-title-row">' +
          `<h3 class="ride-name">${escapeHtml(ride.name)}</h3>` +
          `<span class="land-badge">${escapeHtml(ride.land)}</span>` +
          retirementBadge +
        '</div>' +
        `<p class="ride-rule">${escapeHtml(formatRule(ride))}</p>` +
        `<p class="ride-detail">${escapeHtml(detailText)}</p>` +
      '</div>' +
    '</article>'
  );
}

function renderPark(parkSlug) {
  const today = localDateIso();
  const heightInches = DEFAULT_HEIGHT_INCHES;

  const parkRides = (parkSlug === 'all' ? rides : rides.filter(r => r.park === parkSlug))
    .filter(ride => isRideActive(ride, today));

  const visible = parkRides.map(ride => ({ ride, status: statusFor(ride, heightInches) }));

  if (parkSlug === 'all') {
    visible.sort((a, b) => {
      const parkDifference = PARK_ORDER.indexOf(a.ride.park) - PARK_ORDER.indexOf(b.ride.park);
      if (parkDifference !== 0) return parkDifference;
      return (
        STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
        a.ride.minHeight - b.ride.minHeight ||
        a.ride.name.localeCompare(b.ride.name)
      );
    });
  } else {
    visible.sort((a, b) =>
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
      a.ride.minHeight - b.ride.minHeight ||
      a.ride.name.localeCompare(b.ride.name)
    );
  }

  let listHtml = '';
  let previousPark = null;
  for (const { ride, status } of visible) {
    if (parkSlug === 'all' && ride.park !== previousPark) {
      listHtml += `<h3 class="ride-park-heading">${escapeHtml(parks[ride.park].name)}</h3>`;
      previousPark = ride.park;
    }
    listHtml += rideCardHtml(ride, status, today);
  }

  const available = visible.filter(({ status }) => status !== 'restricted').length;
  const restricted = parkRides.length - available;
  const nextThreshold = [...new Set(
    parkRides.map(r => r.minHeight).filter(h => h > heightInches)
  )].sort((a, b) => a - b)[0];

  return {
    listHtml,
    availableCount: available,
    restrictedCount: restricted,
    nextHeightText: nextThreshold ? `${nextThreshold} in` : 'All clear',
    visibleCountText: `${visible.length} of ${parkRides.length} shown`
  };
}

/**
 * Replaces the inner contents of a <div ...open-tag...> ... </div> block,
 * finding the TRUE matching closing tag by counting nested <div> depth --
 * NOT a naive non-greedy regex, which breaks as soon as the block (or the
 * replacement HTML) contains any nested <div> of its own.
 */
function replaceDivContents(text, openTag, newInner, label, filePath) {
  const startIdx = text.indexOf(openTag);
  if (startIdx === -1) {
    throw new Error(`${filePath}: could not find opening tag for ${label}`);
  }
  const contentStart = startIdx + openTag.length;

  const tagRe = /<div\b[^>]*>|<\/div>/g;
  tagRe.lastIndex = contentStart;

  let depth = 1;
  let match;
  let endIdx = -1;
  while ((match = tagRe.exec(text))) {
    if (match[0] === '</div>') {
      depth -= 1;
      if (depth === 0) {
        endIdx = match.index;
        break;
      }
    } else {
      depth += 1;
    }
  }

  if (endIdx === -1) {
    throw new Error(`${filePath}: could not find matching closing </div> for ${label}`);
  }

  return text.slice(0, contentStart) + newInner + text.slice(endIdx);
}

function replaceOnce(text, pattern, replacement, label, filePath) {
  if (!pattern.test(text)) {
    throw new Error(`${filePath}: could not find ${label} to update`);
  }
  return text.replace(pattern, replacement);
}

// "Ride data checked against ... guidance in August 2026." -- only the
// "<Month> <Year>" fragment inside the .verified paragraph is touched, so
// per-page wording (the resort list on index.html, Volcano Bay's extra
// seasonal-closure sentence) is left exactly as written.
//
// This is driven by `dataVerifiedDate` in data/rides.js, NOT by today's
// system date. Bump that field by hand when you've actually re-checked
// ride data against official sources -- not every time this script runs
// for an unrelated reason (e.g. adding one new park). Auto-stamping the
// real run date would make the whole site claim a fresh verification
// pass it didn't get.
function updateVerifiedDate(text, dataVerifiedDate, filePath) {
  const monthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
    .format(new Date(`${dataVerifiedDate}T00:00:00`));
  const verifiedPattern = /(<p class="verified">.*?in )[A-Z][a-z]+ \d{4}(\..*?<\/p>)/s;

  if (!verifiedPattern.test(text)) {
    throw new Error(`${filePath}: could not find .verified paragraph to update`);
  }

  return text.replace(verifiedPattern, `$1${monthYear}$2`);
}

function updatePage(folder) {
  const parkSlug = folder || 'all';
  const filePath = folder
    ? path.join(ROOT, folder, 'index.html')
    : path.join(ROOT, 'index.html');

  let text = readFileSync(filePath, 'utf8');
  const original = text;
  const result = renderPark(parkSlug);

  text = replaceDivContents(
    text,
    '<div class="ride-list" id="ride-list">',
    result.listHtml,
    'ride list',
    filePath
  );
  text = replaceOnce(
    text,
    /<span class="summary-number" id="available-count">[^<]*<\/span>/,
    `<span class="summary-number" id="available-count">${result.availableCount}</span>`,
    'available count',
    filePath
  );
  text = replaceOnce(
    text,
    /<span class="summary-number" id="restricted-count">[^<]*<\/span>/,
    `<span class="summary-number" id="restricted-count">${result.restrictedCount}</span>`,
    'restricted count',
    filePath
  );
  text = replaceOnce(
    text,
    /<span class="summary-number" id="next-height">[^<]*<\/span>/,
    `<span class="summary-number" id="next-height">${result.nextHeightText}</span>`,
    'next height',
    filePath
  );
  text = replaceOnce(
    text,
    /<p class="visible-count" id="visible-count">[^<]*<\/p>/,
    `<p class="visible-count" id="visible-count">${result.visibleCountText}</p>`,
    'visible count',
    filePath
  );

  // Stale placeholder from before the site covered more than Disney --
  // the live JS already renders the correct text; fix the static default
  // to match so a no-JS view isn't misleading.
  if (folder === '') {
    text = text.replace(
      '<h2 id="results-title">All Walt Disney World attractions</h2>',
      '<h2 id="results-title">All Florida theme park attractions</h2>'
    );
  }

  text = updateVerifiedDate(text, dataVerifiedDate, filePath);

  if (text !== original) {
    writeFileSync(filePath, text, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const changed = [];
  for (const folder of PAGES) {
    if (updatePage(folder)) changed.push(folder || 'index.html');
  }

  if (changed.length) {
    console.log('Updated ride list in:');
    changed.forEach(p => console.log(`  ${p}`));
  } else {
    console.log('Ride lists already up to date on every page.');
  }
}

main();
