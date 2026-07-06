interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 34, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={Math.round((size * 420) / 400)}
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Turkhub"
      className={className}
    >
      <g
        stroke="#1A1A1A"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g id="th-wolf-half">
          <line x1="298" y1="70" x2="336" y2="168" />
          <line x1="298" y1="70" x2="258" y2="150" />
          <line x1="258" y1="150" x2="336" y2="168" />
          <line x1="258" y1="150" x2="200" y2="158" />
          <line x1="258" y1="150" x2="250" y2="190" />
          <line x1="336" y1="168" x2="302" y2="212" />
          <line x1="250" y1="190" x2="302" y2="212" />
          <line x1="250" y1="190" x2="200" y2="192" />
          <line x1="302" y1="212" x2="300" y2="260" />
          <line x1="302" y1="212" x2="252" y2="252" />
          <line x1="252" y1="252" x2="300" y2="260" />
          <line x1="252" y1="252" x2="200" y2="192" />
          <line x1="252" y1="252" x2="244" y2="322" />
          <line x1="300" y1="260" x2="244" y2="322" />
          <line x1="244" y1="322" x2="200" y2="392" />
        </g>
        <use href="#th-wolf-half" transform="matrix(-1 0 0 1 400 0)" />
        <line x1="200" y1="158" x2="200" y2="392" />
      </g>

      <g fill="#1A1A1A" stroke="none">
        <g id="th-wolf-dots">
          <circle cx="298" cy="70" r="7" />
          <circle cx="336" cy="168" r="7" />
          <circle cx="258" cy="150" r="7" />
          <circle cx="250" cy="190" r="7" />
          <circle cx="302" cy="212" r="7" />
          <circle cx="252" cy="252" r="7" />
          <circle cx="300" cy="260" r="7" />
          <circle cx="244" cy="322" r="7" />
          <path d="M232 201 L248 208 L250 214 L234 207 Z" />
        </g>
        <use href="#th-wolf-dots" transform="matrix(-1 0 0 1 400 0)" />
        <circle cx="200" cy="158" r="7" />
        <circle cx="200" cy="392" r="7" />
        <path d="M185 294 L215 294 L207 309 Q200 313 193 309 Z" />
      </g>

      <circle cx="200" cy="192" r="10" fill="#FF5B22" />
    </svg>
  );
}
