export function formatDateLong(dateValue) {
  const date = new Date(dateValue);
  if (!Number.isFinite(date.getTime())) {
    return "Unknown date";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatDaysAgo(daysSinceContact) {
  return `${daysSinceContact}d ago`;
}

export function upperFirst(value) {
  if (!value) {
    return "";
  }
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
