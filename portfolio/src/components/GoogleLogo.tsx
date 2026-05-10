import Link from "next/link";

interface GoogleLogoProps {
  size?: "sm" | "lg";
}

function LogoB({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="11 5 26 38"
      className={className}
    >
      <path d="M12 6h14c5.5 0 10 4.5 10 9s-4.5 9-10 9H12V6z" fill="#4285F4" />
      <path
        d="M12 24h16c5.5 0 10 4.5 10 9s-4.5 9-10 9H12V24z"
        fill="#FBBC05"
      />
      <rect x="12" y="6" width="5" height="18" fill="#EA4335" />
      <rect x="12" y="24" width="5" height="18" fill="#34A853" />
    </svg>
  );
}

export function GoogleLogo({ size = "lg" }: GoogleLogoProps) {
  const textClass =
    size === "lg" ? "text-6xl md:text-8xl" : "text-[32px] leading-none";

  return (
    <Link
      href="/"
      className={`font-bold tracking-tight flex items-end gap-[0.02em] ${textClass}`}
    >
      <LogoB className="h-[0.72em] w-auto -translate-y-[0.05em]" />
      <span className="text-google-red">r</span>
      <span className="text-google-yellow">u</span>
      <span className="text-google-blue">n</span>
      <span className="text-google-green">o</span>
    </Link>
  );
}
