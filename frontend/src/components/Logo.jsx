export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 680 680"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PathGuide AI logo"
      role="img"
    >
      <defs>
        <linearGradient id="pg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1208"/>
          <stop offset="100%" stopColor="#0D0A06"/>
        </linearGradient>
        <linearGradient id="pg-og1" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#F4892A"/>
          <stop offset="100%" stopColor="#C95E0A"/>
        </linearGradient>
        <linearGradient id="pg-og2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8731A"/>
          <stop offset="100%" stopColor="#A84D08"/>
        </linearGradient>
        <linearGradient id="pg-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8731A" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#C95E0A" stopOpacity="0.1"/>
        </linearGradient>
        <clipPath id="pg-clip">
          <rect x="60" y="60" width="560" height="560" rx="120"/>
        </clipPath>
      </defs>

      <rect x="60" y="60" width="560" height="560" rx="120" fill="url(#pg-bg)"/>
      <rect x="60" y="60" width="560" height="560" rx="120" fill="none" stroke="#E8731A" strokeWidth="1.5" strokeOpacity="0.18"/>

      <g clipPath="url(#pg-clip)">
        <rect x="60" y="60" width="560" height="560" rx="120" fill="url(#pg-bg)"/>
        <path d="M180 680 Q200 500 340 430 Q480 360 500 680" fill="url(#pg-path)"/>
        <path d="M180 680 Q200 500 340 430 Q480 360 500 680" fill="none" stroke="#E8731A" strokeWidth="1.5" strokeOpacity="0.3"/>
        <path d="M220 680 Q240 520 340 460 Q440 400 460 680" fill="none" stroke="#E8731A" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="6 8"/>
        <circle cx="298" cy="248" r="52" fill="url(#pg-og1)"/>
        <ellipse cx="340" cy="430" rx="88" ry="36" fill="url(#pg-og2)" opacity="0.22"/>
        <path d="M252 430 Q255 340 298 300 Q338 262 340 248" fill="none" stroke="#E8731A" strokeWidth="1" strokeOpacity="0.2"/>
        <circle cx="396" cy="212" r="36" fill="url(#pg-og1)" opacity="0.88"/>
        <path d="M252 430 C252 380 270 340 298 312 L298 300 C298 300 265 355 255 430 Z" fill="url(#pg-og2)" opacity="0.6"/>
        <path d="M252 430 C252 380 270 340 298 312 C320 288 350 280 370 268 L370 256 C345 270 316 282 295 308 C268 340 252 382 252 430 Z" fill="url(#pg-og2)" opacity="0.45"/>
        <path d="M415 310 C415 285 430 265 450 265 C470 265 485 285 485 310 C485 335 450 368 450 368 C450 368 415 335 415 310 Z" fill="url(#pg-og1)" opacity="0.9"/>
        <circle cx="450" cy="310" r="11" fill="#1A1208" opacity="0.7"/>
      </g>

      <rect x="60" y="60" width="560" height="560" rx="120" fill="none" stroke="#E8731A" strokeWidth="1" strokeOpacity="0.15"/>
    </svg>
  )
}