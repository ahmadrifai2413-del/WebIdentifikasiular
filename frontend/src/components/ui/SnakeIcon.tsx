export default function SnakeIcon({
  size = 24,
  strokeWidth = 1.6,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 6H14C4 6 4 17 14 17h5c9 0 9 10 0 10H8M10 3v6M23 23v7"
        stroke="currentColor"
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
      />
      <circle cx="23" cy="6" r="1" fill="#101510" />
    </svg>
  );
}

export { SnakeIcon };
