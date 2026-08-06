// Pure, state-free ride calculation and copy-formatting logic.
//
// This is imported by assets/app.js (in the browser, for the live/interactive
// filtering) and by scripts/build_rides.mjs (in Node, to pre-render each
// page's default ride list into static HTML at build time). Keeping it here
// means the two can never disagree about whether a ride is available at a
// given height, or what its rule/detail text says.
//
// Nothing in this file touches the DOM, localStorage, or any global `state`
// object -- every function takes exactly the values it needs as arguments.

export const inchesToCm = inches => inches * 2.54;
export const cmToInches = cm => cm / 2.54;
export const rounded = value => Number(value.toFixed(1));

export function isOverMaximum(ride, heightInches) {
  if (!Number.isFinite(ride.maxHeight)) return false;

  return ride.maxHeightExclusive
    ? heightInches >= ride.maxHeight
    : heightInches > ride.maxHeight;
}

export function statusFor(ride, heightInches) {
  if (isOverMaximum(ride, heightInches)) {
    return ride.overMaxStatus || 'restricted';
  }

  if (heightInches < ride.minHeight) {
    return ride.underMinimumAlternative ? 'conditional' : 'restricted';
  }

  if (ride.independentHeight && heightInches < ride.independentHeight) {
    return 'conditional';
  }

  return 'available';
}

export function formatRule(ride) {
  if (ride.ruleText) return ride.ruleText;

  const minimum = ride.minHeight > 0 ? `${ride.minHeight} in minimum` : null;
  const maximum = Number.isFinite(ride.maxHeight)
    ? ride.maxHeightExclusive
      ? `under ${ride.maxHeight} in`
      : `${ride.maxHeight} in maximum`
    : null;

  let rule;

  if (minimum && maximum) {
    rule = ride.maxHeightExclusive
      ? `${minimum} · ${maximum}`
      : `${ride.minHeight}–${ride.maxHeight} in`;
  } else if (minimum) {
    rule = minimum;
  } else if (maximum) {
    rule = maximum;
  } else {
    rule = 'Any height';
  }

  if (ride.independentHeight) {
    rule += ` · ${ride.independentHeight} in to ride alone`;
  }

  return rule;
}

export function hasHeightRule(ride) {
  return ride.minHeight > 0 ||
    Number.isFinite(ride.maxHeight) ||
    Number.isFinite(ride.independentHeight);
}

export function localDateIso(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isRideActive(ride, today) {
  if (ride.opens && today < ride.opens) return false;
  if (ride.closes && today > ride.closes) return false;
  return true;
}

export function formatLifecycleDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(year, month - 1, day));
}

export function retirementMessage(ride, today) {
  if (ride.lifecycle !== 'retiring' || !ride.closes) return '';

  return today === ride.closes
    ? `Final operating day: ${formatLifecycleDate(ride.closes)}.`
    : `Retiring after ${formatLifecycleDate(ride.closes)}.`;
}

export function formatDetail(ride, status, heightInches) {
  if (status === 'available') {
    if (Number.isFinite(ride.maxHeight) && ride.minHeight === 0) {
      return ride.withinRangeText || 'Within the permitted height range.';
    }

    if (ride.independentHeight) {
      return ride.independentSuccessText || 'Tall enough to ride without a supervising companion.';
    }

    if (ride.minHeight === 0) return 'No minimum height requirement.';

    return `Meets the requirement by ${rounded(heightInches - ride.minHeight)} in.`;
  }

  if (status === 'conditional') {
    if (isOverMaximum(ride, heightInches)) return ride.overMaxText;
    if (heightInches < ride.minHeight && ride.underMinimumAlternative) {
      return ride.underMinimumAlternative;
    }
    return ride.conditionalText;
  }

  if (isOverMaximum(ride, heightInches)) return ride.overMaxText;

  return `${rounded(ride.minHeight - heightInches)} in to go.`;
}
