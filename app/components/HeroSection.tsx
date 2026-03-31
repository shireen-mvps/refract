import { PLATFORMS } from "@/lib/constants";
import { PLATFORM_ICONS } from "./icons";

export function HeroSection() {
  return (
    <div className="text-center mb-14 animate-fade-in-up">
      {/* Status badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/50 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
        5 platforms. One prompt.
      </div>

      {/* Headline */}
      <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
        One input.{" "}
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Five platforms.
        </span>
      </h2>

      {/* Tagline */}
      <p className="mt-4 text-white/50 text-base max-w-lg mx-auto leading-relaxed">
        Paste your content and get ready-to-post captions for Instagram, Facebook,
        WhatsApp, Email, and LinkedIn — instantly.
      </p>

      {/* Platform icons strip */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {PLATFORMS.map((p, i) => {
          const Icon = PLATFORM_ICONS[p.key];
          return (
            <div
              key={p.key}
              className={`w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${p.accent} animate-float-gentle`}
              style={{ animationDelay: `${i * 0.4}s` }}
              title={p.label}
            >
              <Icon className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
