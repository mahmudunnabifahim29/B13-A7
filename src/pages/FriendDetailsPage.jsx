import { AlarmClock, Archive, Trash2, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { useKeenKeeper } from "../context/KeenKeeperContext";
import { formatDateLong } from "../utils/formatters";

const checkInActions = [
  { key: "call", label: "Call", icon: callIcon },
  { key: "text", label: "Text", icon: textIcon },
  { key: "video", label: "Video", icon: videoIcon }
];

export default function FriendDetailsPage() {
  const { friendId } = useParams();
  const { friends, friendsLoading, friendsError, addTimelineEntry } = useKeenKeeper();

  if (friendsLoading) {
    return (
      <div className="page-wrap">
        <LoadingSpinner />
      </div>
    );
  }

  if (friendsError) {
    return (
      <div className="page-wrap">
        <div className="card-panel p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Could not load this friend</h2>
          <p className="mt-2 text-slate-500">{friendsError}</p>
        </div>
      </div>
    );
  }

  const friend = friends.find((item) => item.id === Number(friendId));
  if (!friend) {
    return (
      <div className="page-wrap">
        <div className="card-panel p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Friend not found</h1>
          <p className="mt-3 text-slate-500">This profile does not exist or was removed.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-brand-dark px-4 py-2 font-semibold text-white transition hover:bg-brand-mid"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const statsCards = [
    { label: "Days Since Contact", value: friend.days_since_contact },
    { label: "Goal (Days)", value: friend.goal },
    { label: "Next Due", value: formatDateLong(friend.next_due_date) }
  ];

  const handleQuickCheckIn = (type) => {
    const newEntry = addTimelineEntry(friend, type);
    toast.success(`${newEntry.title} added to timeline.`);
  };

  const handleUtilityAction = (actionLabel) => {
    toast(`${actionLabel} selected for ${friend.name}.`, { icon: "✅" });
  };

  return (
    <div className="page-wrap">
      <div className="grid items-start gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <article className="card-panel p-5 text-center sm:p-6">
            <img src={friend.picture} alt={friend.name} className="mx-auto h-16 w-16 rounded-full object-cover" />
            <h1 className="mt-3 text-2xl font-extrabold text-slate-800 sm:text-[1.9rem]">{friend.name}</h1>
            <div className="mt-2">
              <StatusBadge status={friend.status} />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {friend.tags.map((tag) => (
                <span key={`${friend.id}-${tag}`} className="tag-chip uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm italic text-slate-500 sm:text-base">"{friend.bio}"</p>
            <p className="mt-2 text-sm text-slate-500">Preferred: {friend.email}</p>
          </article>

          <button
            type="button"
            onClick={() => handleUtilityAction("Snooze 2 Weeks")}
            className="card-panel flex h-12 w-full items-center justify-center gap-2 px-3 text-sm font-semibold text-slate-700 sm:text-base"
          >
            <AlarmClock className="h-4 w-4" />
            Snooze 2 Weeks
          </button>

          <button
            type="button"
            onClick={() => handleUtilityAction("Archive")}
            className="card-panel flex h-12 w-full items-center justify-center gap-2 px-3 text-sm font-semibold text-slate-700 sm:text-base"
          >
            <Archive className="h-4 w-4" />
            Archive
          </button>

          <button
            type="button"
            onClick={() => handleUtilityAction("Delete")}
            className="card-panel flex h-12 w-full items-center justify-center gap-2 px-3 text-sm font-semibold text-red-500 sm:text-base"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </aside>

        <section className="space-y-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {statsCards.map((stat) => (
              <article key={stat.label} className="card-panel flex min-h-[116px] flex-col justify-center p-4 text-center sm:p-5">
                <p className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">{stat.label}</p>
              </article>
            ))}
          </div>

          <article className="card-panel p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-brand-dark">Relationship Goal</h2>
                <p className="mt-2 text-lg text-slate-500 sm:text-xl">
                  Connect every <span className="font-extrabold text-slate-800">{friend.goal} days</span>
                </p>
              </div>
              <button type="button" className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                <PencilLine className="mr-1 inline h-4 w-4" />
                Edit
              </button>
            </div>
          </article>

          <article className="card-panel p-5">
            <h2 className="text-2xl font-extrabold text-brand-dark">Quick Check-In</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {checkInActions.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  onClick={() => handleQuickCheckIn(action.key)}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-brand-mid hover:bg-white sm:p-4"
                >
                  <img src={action.icon} alt="" className="mx-auto h-9 w-9" />
                  <span className="mt-2 block text-lg font-bold text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
