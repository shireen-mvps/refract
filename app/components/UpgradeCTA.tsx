const PRO_FEATURES = [
  "Unlimited repurposes",
  "Multiple brand kits",
  "Full history",
  "Priority queue",
  "Batch export",
  "Audio overview (coming soon)",
];

interface UpgradeCTAProps {
  tallyUrl?: string;
}

export function UpgradeCTA({ tallyUrl = "https://tally.so/r/ZjY9Dz" }: UpgradeCTAProps) {
  return (
    <section
      id="upgrade"
      className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/[0.07] to-fuchsia-600/[0.07] p-8 sm:p-10 text-center animate-fade-in-up relative overflow-hidden"
    >
      {/* Subtle animated border glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(236,72,153,0.06) 100%)",
        }}
      />

      <div className="relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-300 font-bold mb-5 tracking-wider">
          ✦ REFRACT PRO
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          More power for serious marketers
        </h3>
        <p className="text-white/50 text-sm max-w-md mx-auto mb-7 leading-relaxed">
          Unlimited repurposes, multiple brand kits, full content history,
          and priority generation.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PRO_FEATURES.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/55"
            >
              <span className="text-violet-400 font-bold">✓</span>
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={tallyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.99]"
        >
          Join the waitlist — it&apos;s free
        </a>
        <p className="text-xs text-white/30 mt-4">
          No credit card. Early access pricing for waitlist members.
        </p>
      </div>
    </section>
  );
}