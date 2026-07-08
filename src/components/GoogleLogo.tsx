import Link from "next/link";

interface GoogleLogoProps {
  size?: "sm" | "lg";
  /** Animate the letters in on mount (used on the home hero). */
  animate?: boolean;
}

// B·r·u·n·o mirrors the first 5 colors of the Google wordmark:
// blue · red · yellow · blue · green.
const LETTERS: { char: string; color: string }[] = [
  { char: "B", color: "#4285F4" },
  { char: "r", color: "#EA4335" },
  { char: "u", color: "#FBBC05" },
  { char: "n", color: "#4285F4" },
  { char: "o", color: "#34A853" },
];

export function GoogleLogo({ size = "lg", animate = false }: GoogleLogoProps) {
  const isLarge = size === "lg";

  return (
    <Link
      href="/"
      aria-label="Bruno"
      className="inline-flex items-baseline font-display font-semibold leading-none"
      style={{
        letterSpacing: isLarge ? "-0.025em" : "-0.02em",
        fontSize: isLarge ? "clamp(72px, 10vw, 110px)" : "26px",
      }}
    >
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          className={animate ? "logo-letter" : "inline-block"}
          style={{
            color: letter.color,
            ...(animate ? { animationDelay: `${i * 80}ms` } : {}),
          }}
        >
          {letter.char}
        </span>
      ))}
    </Link>
  );
}

/** Square monogram used for favicons and tight spaces. */
export function BrunoMonogram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[22%] bg-google-blue font-display font-semibold text-white ${className}`}
    >
      B
    </div>
  );
}
