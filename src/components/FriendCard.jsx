import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDaysAgo } from "../utils/formatters";

export default function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="card-panel block aspect-square p-0 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
    >
      <div className="flex h-full flex-col items-center justify-between text-center px-4 py-5">
        <img
          src={friend.picture}
          alt={friend.name}
          className="h-20 w-20 rounded-full border-2 border-slate-200 object-cover mb-2"
          loading="lazy"
        />

        <div className="flex flex-col items-center w-full">
          <h3 className="text-xl font-extrabold text-slate-800 leading-tight w-full truncate">{friend.name}</h3>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-xs text-slate-500 font-medium">{formatDaysAgo(friend.days_since_contact)}</span>
            <StatusBadge status={friend.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
          {friend.tags.slice(0, 2).map((tag) => (
            <span key={`${friend.id}-${tag}`} className="tag-chip text-[11px] px-2 py-0.5 uppercase font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
