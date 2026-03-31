import type { HistoryEntry } from "@/lib/types";
import { HistoryIcon } from "./icons";
import { ProBadge } from "./ui";

interface ContentHistoryProps {
  history: HistoryEntry[];
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  onRestore: (entry: HistoryEntry) => void;
}

export function ContentHistory({
  history,
  showHistory,
  setShowHistory,
  onRestore,
}: ContentHistoryProps) {
  if (history.length === 0) return null;

  return (
    <section className="mt-16 animate-fade-in-up" id="history">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <HistoryIcon className="w-4 h-4 text-white/45" />
          <h3 className="text-sm font-semibold text-white/75">Recent History</h3>
          <ProBadge />
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs text-white/40 hover:text-white/75 transition-colors"
        >
          {showHistory ? "Hide" : `Show ${history.length}`}
        </button>
      </div>

      {showHistory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {history.map((entry, i) => (
            <button
              key={entry.id}
              onClick={() => onRestore(entry)}
              className="text-left p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/20 transition-all duration-200 flex flex-col gap-2 animate-card-appear"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/80 truncate">
                  {entry.businessName}
                </span>
                <span className="text-xs text-white/35 shrink-0 ml-2">{entry.date}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 w-fit">
                {entry.campaignGoal}
              </span>
              <p className="text-xs text-white/45 line-clamp-2 leading-relaxed">
                {entry.output.instagram}
              </p>
              <span className="text-xs text-violet-400 font-medium mt-1">
                Click to restore →
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
