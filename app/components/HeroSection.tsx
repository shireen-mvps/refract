import { PLATFORMS } from "@/lib/constants";
import { PLATFORM_ICONS } from "./icons";

export function HeroSection() {
  return (
    <div className="text-center mb-14">
      {/* Status badge — first to appear */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/55 mb-7 animate-fade-in-blur"
        style={{ animationDelay: "0s" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
        5 platforms. One prompt.
      </div>

      {/* Headline — line by line stagger */}
      <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
        <span className="block animate-fade-in-blur" style={{ animationDelay: "0.1s" }}>
          One input.
        </span>
        <span
          className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-blur"
          style={{ animationDelay: "0.22s" }}
        >
          Five platforms.
        </span>
      </h2>

      {/* Tagline */}
      <p
        className="mt-5 text-white/60 text-base sm:text-lg max-w-lg mx-auto leading-relaxed animate-fade-in-blur"
        style={{ animationDelay: "0.38s" }}
      >
        Paste your content and get ready-to-post captions for Instagram, Facebook,
        WhatsApp, Email, and LinkedIn — instantly.
      </p>

      {/* Platform icons strip — each icon springs in individually */}
      <div className="flex items-center justify-center gap-3 mt-9">
        {PLATFORMS.map((p, i) => {
          const Icon = PLATFORM_ICONS[p.key];
          return (
            <div
              key={p.key}
              className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${p.accent} animate-slide-up-spring hover:-translate-y-1.5 hover:bg-white/[0.09] hover:border-white/[0.18] hover:shadow-lg transition-all duration-300 cursor-default`}
              style={{ animationDelay: `${0.48 + i * 0.07}s` }}
              title={p.label}
            >
              <Icon className="w-5 h-5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
