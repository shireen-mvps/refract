import { PLATFORMS } from "@/lib/constants";
import { PLATFORM_ICONS, DownloadIcon } from "./icons";
import { Spinner, ProBadge } from "./ui";
import { OutputCard } from "./OutputCard";
import { ImageGenerationCard } from "./ImageGenerationCard";
import type { RepurposeOutput } from "@/lib/types";

// Inline PrismIcon to avoid circular deps with icons.tsx
function PrismIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="prism-out" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M12 2.5L22 21H2L12 2.5Z" fill="url(#prism-out)" />
      <path d="M12 2.5L22 21H2L12 2.5Z" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    </svg>
  );
}

interface OutputSectionProps {
  output: RepurposeOutput | null;
  loading: boolean;
  exportingPptx: boolean;
  onExportPptx: () => void;
  businessName: string;
  businessType: string;
  contentType: string;
  content: string;
}

export function OutputSection({
  output, loading, exportingPptx, onExportPptx,
  businessName, businessType, contentType, content,
}: OutputSectionProps) {
  return (
    <div className="flex flex-col gap-4">

      {/* Empty state */}
      {!output && !loading && (
        <div className="rounded-2xl border-2 border-dashed border-white/[0.07] bg-white/[0.02] p-12 text-center flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/15 to-fuchsia-600/15 border border-violet-500/20 flex items-center justify-center animate-float-gentle">
            <PrismIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/60">Your repurposed content will appear here</p>
            <p className="text-xs text-white/35 mt-1.5">5 platform-ready posts generated in seconds</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {PLATFORMS.map((p) => {
              const Icon = PLATFORM_ICONS[p.key];
              return (
                <span key={p.key} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${p.badge}`}>
                  <Icon className="w-3 h-3" />{p.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 animate-pulse">
            <PrismIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80">Claude is writing your content...</p>
            <p className="text-xs text-white/45 mt-1.5">Crafting 5 platform-specific posts</p>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* Output cards */}
      {output && (
        <div className="animate-slide-in-down flex flex-col gap-4">
          {PLATFORMS.map((platform, index) => (
            <OutputCard key={platform.key} platform={platform} content={output[platform.key]} index={index} />
          ))}

          {/* Export PPTX */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-center justify-between gap-3 animate-card-appear" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Export Content Deck</span>
                <ProBadge />
              </div>
              <p className="text-xs text-white/45">Editable PowerPoint — cover, overview &amp; all 5 platform posts</p>
            </div>
            <button
              type="button"
              onClick={onExportPptx}
              disabled={exportingPptx}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/20 whitespace-nowrap"
            >
              {exportingPptx
                ? <><Spinner className="h-3.5 w-3.5" />Building...</>
                : <><DownloadIcon className="w-3.5 h-3.5" />.pptx</>
              }
            </button>
          </div>

          {/* Image generation */}
          <ImageGenerationCard
            businessName={businessName}
            businessType={businessType}
            contentType={contentType}
            content={content}
          />
        </div>
      )}
    </div>
  );
}
