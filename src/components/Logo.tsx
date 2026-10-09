export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M5 24c0 10 8 18 19 18s19-8 19-18" />
      <path d="M11 25c2 6 7 10 13 10s11-4 13-10" opacity=".65" />
      <path d="M16 28c2 2.600 5 4 8 4s6-1.400 8-4" opacity=".4" />
      <ellipse cx="24" cy="14" rx="5.500" ry="7" fill="currentColor" fillOpacity=".18" />
    </svg>
  );
}
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo__word">Little <em>Nest</em></span>
    </span>
  );
}
