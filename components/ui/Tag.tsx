import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide",
        accent
          ? "border-signal/30 bg-signal/10 text-signal-soft"
          : "border-bone/12 bg-ink-100/60 text-bone-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
