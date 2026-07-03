export default function RegMark({ size = 24, className = "", spin = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`${spin ? "animate-spin-slow" : ""} ${className}`}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="0" x2="16" y2="10" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="22" x2="16" y2="32" stroke="currentColor" strokeWidth="1.2" />
      <line x1="0" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1.2" />
      <line x1="22" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
