"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wordmark } from "@/brand/Logotype";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

/**
 * The bar is a timeline ruler: section starts ([data-tick]) are ticks on its bottom edge and a
 * single bone playhead, tied to scroll, marks where you are on the page. The name, whole (no
 * cut since 25/11), goes home; the links are Work · Contact (Bruno, 24/11; /about removed 26/11: the home is the video landing, Work
 * goes down to its projects).
 */
export function SiteBar() {
  const pathname = usePathname();
  const home = pathname === "/";
  const headRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const head = headRef.current;
    const ruler = rulerRef.current;
    if (!head || !ruler) return;

    const measure = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return setTicks([]);
      setTicks(
        Array.from(document.querySelectorAll<HTMLElement>("[data-tick]")).map((el) =>
          Math.min(1, (el.getBoundingClientRect().top + scrollY) / max),
        ),
      );
    };
    measure();

    const tween = gsap.to(head, {
      x: () => ruler.clientWidth - head.offsetWidth,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true, onRefresh: measure },
    });

    // a new page is a new length: measure once its content has laid out
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ro.disconnect();
    };
  }, [pathname]);


  return (
    <header className="site-bar fixed inset-x-0 top-0 z-30 h-[var(--bar-h)] bg-ink">
      <div className="flex h-full items-center justify-between px-[var(--gutter)]">
        <Link
          href="/"
          className="relative flex h-full items-center no-underline"
          aria-label={home ? "Bruno Simone, back to top" : "Bruno Simone, home"}
          onClick={(e) => {
            if (home) {
              e.preventDefault();
              scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }
          }}
        >
          <span className="text-bone">
            <Wordmark name="wordmarkSmall" decorative className="block h-[21px] w-auto" />
          </span>
        </Link>
        <nav aria-label="Site">
          <ul className="flex items-center gap-3 sm:gap-5 md:gap-8">
            {NAV.map((item) => {
              const current = !item.href.includes("#") && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              const cls = `bar-link inline-flex min-h-11 items-center text-[13px] sm:text-[14px] font-medium no-underline transition-colors duration-150 hover:text-bone ${current ? "text-bone" : "text-dim"}`;
              return (
                <li key={item.href}>
                  {item.href.startsWith("/") ? (
                    <Link href={item.href} className={cls} aria-current={current ? "page" : undefined}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className={cls}>
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div ref={rulerRef} className="absolute inset-x-0 bottom-0 h-px bg-rule" aria-hidden="true">
        {ticks.map((t, i) => (
          <span key={i} className="absolute bottom-0 h-[5px] w-px bg-mid" style={{ left: `${t * 100}%` }} />
        ))}
        <div ref={headRef} className="absolute bottom-0 left-0 h-[9px] w-[2px] bg-bone will-change-transform" />
      </div>
    </header>
  );
}
