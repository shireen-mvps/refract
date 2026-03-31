import { CopyButton } from "./ui";
import { PLATFORM_ICONS } from "./icons";
import type { PlatformConfig } from "@/lib/constants";

interface OutputCardProps {
  platform: PlatformConfig;
  content: string;
  index: number;
}

export function OutputCard({ platform, content, index }: OutputCardProps) {
  const Icon = PLATFORM_ICONS[platform.key];
  return (
    <div
      className={`rounded-2xl border border-t-2 border-white/[0.07] ${platform.topBorder} bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 p-5 flex flex-col gap-3 animate-card-appear`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 shrink-0 ${platform.accent}`} />
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${platform.badge}`}>
            {platform.label}
          </span>
        </div>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">{content}</p>
      <p className="text-xs text-white/30 text-right tabular-nums">{content.length} characters</p>
    </div>
  );
}
