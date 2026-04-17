const statusClassMap = {
  overdue: "status-overdue",
  "almost due": "status-almost-due",
  "on-track": "status-on-track"
};

const statusLabelMap = {
  overdue: "Overdue",
  "almost due": "Almost Due",
  "on-track": "On-Track"
};

export function getStatusClass(status) {
  return statusClassMap[status] ?? "status-on-track";
}

export function getStatusLabel(status) {
  return statusLabelMap[status] ?? "On-Track";
}
