import { useMemo, useState } from "react";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import { useKeenKeeper } from "../context/KeenKeeperContext";
import { formatDateLong, upperFirst } from "../utils/formatters";

const filterOptions = [
  { value: "all", label: "Filter timeline" },
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "video", label: "Video" }
];

const typeIconMap = {
  call: callIcon,
  text: textIcon,
  video: videoIcon
};

export default function TimelinePage() {
  const { timelineEntries } = useKeenKeeper();
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredEntries = useMemo(() => {
    const entries = typeFilter === "all" ? timelineEntries : timelineEntries.filter((entry) => entry.type === typeFilter);
    return [...entries].sort((left, right) => {
      const leftTime = new Date(left.createdAt ?? left.date).getTime();
      const rightTime = new Date(right.createdAt ?? right.date).getTime();
      return rightTime - leftTime;
    });
  }, [timelineEntries, typeFilter]);

  return (
    <div className="page-wrap max-w-4xl space-y-5">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">Timeline</h1>
      </header>

      <div className="max-w-xs">
        <label htmlFor="timeline-filter" className="sr-only">
          Filter timeline
        </label>
        <select
          id="timeline-filter"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-500 shadow-sm focus:border-brand-mid focus:outline-none"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <section className="space-y-4 pb-6">
        {filteredEntries.length === 0 ? (
          <article className="card-panel p-6 text-center">
            <p className="text-base font-semibold text-slate-500">No interactions found for this filter yet.</p>
          </article>
        ) : (
          filteredEntries.map((entry) => {
            const [leadingWord = "", ...restWords] = entry.title.split(" ");
            return (
              <article key={entry.id} className="card-panel flex items-center gap-3 px-4 py-3.5">
                <img src={typeIconMap[entry.type]} alt="" className="h-8 w-8" />
                <div>
                  <h2 className="text-base font-semibold leading-tight text-slate-500 sm:text-lg">
                    <span className="font-extrabold text-brand-dark">{upperFirst(leadingWord)}</span>{" "}
                    {restWords.join(" ")}
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">{formatDateLong(entry.date)}</p>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
