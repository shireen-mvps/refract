"use client";

import { Toast, selectCls, inputCls } from "./ui";
import {
  BUSINESS_TYPES, CONTENT_TYPES, TONES, CAMPAIGN_GOALS,
} from "@/lib/constants";

// Inline BrandKitIcon (used only here)
function BrandKitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

// Inline Spinner (small)
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

interface InputFormProps {
  businessName: string; setBusinessName: (v: string) => void;
  businessType: string; setBusinessType: (v: string) => void;
  contentType: string; setContentType: (v: string) => void;
  tone: string; setTone: (v: string) => void;
  campaignGoal: string; setCampaignGoal: (v: string) => void;
  content: string; setContent: (v: string) => void;
  brandKitLoaded: boolean;
  loading: boolean;
  error: string | null;
  toastVisible: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSaveBrandKit: () => void;
}

export function InputForm({
  businessName, setBusinessName,
  businessType, setBusinessType,
  contentType, setContentType,
  tone, setTone,
  campaignGoal, setCampaignGoal,
  content, setContent,
  brandKitLoaded, loading, error,
  toastVisible, onSubmit, onSaveBrandKit,
}: InputFormProps) {
  const charCount = content.length;
  const isReady = content.trim().length >= 10;

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-white/[0.04] rounded-2xl border border-white/[0.07] backdrop-blur-sm p-6 flex flex-col gap-5"
      >
        {/* Business Name */}
        <div className="animate-slide-up-spring" style={{ animationDelay: "0.05s" }}>
          <label className="block text-sm font-semibold text-white/75 mb-1.5">Business Name</label>
          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Sunny Homemade" className={inputCls} />
        </div>

        {/* Business Type */}
        <div className="animate-slide-up-spring" style={{ animationDelay: "0.13s" }}>
          <label className="block text-sm font-semibold text-white/75 mb-1.5">Business Type</label>
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={selectCls}>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Campaign Goal */}
        <div className="animate-slide-up-spring" style={{ animationDelay: "0.21s" }}>
          <label className="block text-sm font-semibold text-white/75 mb-1.5">Campaign Goal</label>
          <select value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)} className={selectCls}>
            {CAMPAIGN_GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Content Type + Tone */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up-spring" style={{ animationDelay: "0.29s" }}>
          <div>
            <label className="block text-sm font-semibold text-white/75 mb-1.5">Content Type</label>
            <select value={contentType} onChange={(e) => setContentType(e.target.value)} className={selectCls}>
              {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-white/75 mb-1.5">Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className={selectCls}>
              {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Brand Kit row */}
        <div className="flex items-center justify-between py-2.5 px-4 rounded-xl border border-white/[0.07] bg-white/[0.02] animate-slide-up-spring" style={{ animationDelay: "0.37s" }}>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <BrandKitIcon className="w-3.5 h-3.5 shrink-0" />
            {brandKitLoaded
              ? <span className="text-violet-400">Brand kit loaded — {businessName}</span>
              : <span>Save your settings as a reusable brand kit</span>
            }
          </div>
          <button type="button" onClick={onSaveBrandKit}
            className="text-sm px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-400 hover:bg-violet-600/30 hover:border-violet-500/50 transition-all duration-200 shrink-0 ml-3">
            Save Kit
          </button>
        </div>

        {/* Content textarea */}
        <div className="animate-slide-up-spring" style={{ animationDelay: "0.45s" }}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-white/75">Your Content</label>
            <span className={`text-sm tabular-nums ${charCount > 1400 ? "text-red-400" : "text-white/40"}`}>
              {charCount} / 1500
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your recipe, product description, announcement, or any content here..."
            rows={7}
            maxLength={1500}
            className={`${inputCls} resize-none leading-relaxed`}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 text-base text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-fade-in-blur">
            <span className="mt-0.5 shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isReady || loading}
          className="w-full py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.015] active:scale-[0.985] animate-slide-up-spring"
          style={{ animationDelay: "0.53s" }}
        >
          {loading ? <><Spinner />Repurposing content...</> : "Repurpose Content →"}
        </button>

        <p className="text-sm text-center text-white/35 animate-fade-in-blur" style={{ animationDelay: "0.6s" }}>
          Works for any business. Demo pre-loaded with Sunny Homemade, a real homemade food business.
        </p>
      </form>

      <Toast
        message="Brand kit saved to your browser — loads automatically next time"
        visible={toastVisible}
      />
    </>
  );
}
