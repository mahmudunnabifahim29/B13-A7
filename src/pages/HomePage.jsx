import { Plus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useKeenKeeper } from "../context/KeenKeeperContext";

export default function HomePage() {
  const { friends, friendsLoading, friendsError, interactionsThisMonth } = useKeenKeeper();

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
          <h2 className="text-2xl font-bold text-slate-800">Could not load your friends</h2>
          <p className="mt-2 text-slate-500">{friendsError}</p>
        </div>
      </div>
    );
  }

  const onTrackCount = friends.filter((friend) => friend.status === "on-track").length;
  const needAttentionCount = friends.filter((friend) => friend.status !== "on-track").length;
  const summaryCards = [
    { label: "Total Friends", value: friends.length },
    { label: "On Track", value: onTrackCount },
    { label: "Need Attention", value: needAttentionCount },
    { label: "Interactions This Month", value: interactionsThisMonth }
  ];

  return (
    <div className="page-wrap space-y-8">
      <section className="pt-6 text-center sm:pt-9">
        <h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-dark px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-mid"
        >
          <Plus className="h-4 w-4" />
          Add a Friend
        </button>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((item) => (
            <article key={item.label} className="card-panel flex h-[118px] flex-col items-center justify-center px-4 text-center sm:h-[128px]">
              <p className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{item.value}</p>
              <p className="mt-1 text-base font-semibold text-slate-500 sm:text-lg">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-300 pt-6">
        <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Your Friends</h2>

        <div className="mt-5 grid grid-cols-4 gap-4">
          {friends.length === 0 ? (
            <article className="card-panel col-span-4 p-7 text-center">
              <p className="text-base font-semibold text-slate-600">No friends available yet.</p>
            </article>
          ) : (
            friends.slice(0, 16).map((friend) => <FriendCard key={friend.id} friend={friend} />)
          )}
        </div>
      </section>
    </div>
  );
}
