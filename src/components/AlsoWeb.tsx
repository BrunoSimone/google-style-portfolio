"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "./Pieces";

/**
 * The web work, in passing (Bruno, 24/11): the home shows video only; one quiet line under the
 * close points to /web, with this site as the proof. Home only.
 */
export function AlsoWeb() {
  if (usePathname() !== "/") return null;
  return (
    <Link href="/web" className="also-web">
      <span className="also-web-text">I also build custom websites, like this one.</span>
      <span className="also-web-more">
        See more
        <Arrow />
      </span>
    </Link>
  );
}
