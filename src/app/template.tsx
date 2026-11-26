/** every route lands the same way: a short rise into place (no loader between routes) */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-in">{children}</div>;
}
