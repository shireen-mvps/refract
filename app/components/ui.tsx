"use client";
import { useState } from "react";

// ── Copy Button ───────────────────────────────────────────────────
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-150 text-white/55 hover:text-white/90 active:scale-95"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ── Spinner ───────────────────────────────────────────────────────
export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ── Pro Badge ─────────────────────────────────────────────────────
export function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 text-violet-300 tracking-wide">
      ✦ PRO
    </span>
  );
}

// ── Toast ─────────────────────────────────────────────────────────
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#0d0d24] border border-emerald-500/30 shadow-2xl shadow-black/50 whitespace-nowrap">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="text-sm text-white/85">{message}</span>
      </div>
    </div>
  );
}

// ── Select / Input class helpers (exported for reuse) ─────────────
export const selectCls =
  "w-full px-3.5 py-3 rounded-xl border border-white/10 bg-[#0d0d24] text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-transparent transition appearance-none cursor-pointer";

export const inputCls =
  "w-full px-3.5 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-transparent transition";
