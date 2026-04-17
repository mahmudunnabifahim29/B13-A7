import { getStatusClass, getStatusLabel } from "../utils/statusStyles";

export default function StatusBadge({ status }) {
  return <span className={`chip ${getStatusClass(status)}`}>{getStatusLabel(status)}</span>;
}
