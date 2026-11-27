"use client";

/**
 * Every route lands the same way: a short rise into place (no loader between routes). Arriving at
 * a section from another page (Work from /web → /#work), the browser lands on it while the route is
 * still 12 px low, so it would end up under the bar: once the rise is over, settle it (27/11).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="route-in"
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        const id = decodeURIComponent(location.hash.slice(1));
        if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
      }}
    >
      {children}
    </div>
  );
}
