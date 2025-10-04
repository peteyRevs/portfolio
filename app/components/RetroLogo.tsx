'use client';

export default function RetroLogo() {
  return (
    <div className="flex flex-col items-center">
      {/* SVG Logo - Retro Rocket */}
      <svg
        width="200"
        height="220"
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[140px] h-[154px] md:w-[200px] md:h-[220px]"
      >
        <defs>
          <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* Rocket Body */}
        <path
          d="M 100 20 L 120 60 L 120 140 L 100 160 L 80 140 L 80 60 Z"
          fill="url(#rocketGradient)"
        />

        {/* Rocket Nose Cone */}
        <path
          d="M 100 20 L 120 60 L 80 60 Z"
          fill="#2563EB"
        />

        {/* Left Fin */}
        <path
          d="M 80 100 L 60 120 L 60 160 L 80 140 Z"
          fill="url(#finGradient)"
        />

        {/* Right Fin */}
        <path
          d="M 120 100 L 140 120 L 140 160 L 120 140 Z"
          fill="url(#finGradient)"
        />

        {/* Window - outer circle */}
        <circle
          cx="100"
          cy="85"
          r="15"
          fill="#BFDBFE"
          opacity="0.3"
        />

        {/* Window - inner circle */}
        <circle
          cx="100"
          cy="85"
          r="10"
          fill="#3B82F6"
        />

        {/* Accent Stripe Left */}
        <rect
          x="85"
          y="110"
          width="3"
          height="25"
          fill="#BFDBFE"
          opacity="0.5"
        />

        {/* Accent Stripe Right */}
        <rect
          x="112"
          y="110"
          width="3"
          height="25"
          fill="#BFDBFE"
          opacity="0.5"
        />

        {/* Animated Exhaust Flames */}
        <g>
          {/* Flame 1 - Outer Orange */}
          <ellipse
            cx="100"
            cy="170"
            rx="10"
            ry="15"
            fill="#F97316"
            opacity="0.7"
          >
            <animate
              attributeName="ry"
              values="15;20;15"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;0.9;0.7"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Flame 2 - Middle Yellow */}
          <ellipse
            cx="100"
            cy="175"
            rx="8"
            ry="13"
            fill="#FBBF24"
            opacity="0.8"
          >
            <animate
              attributeName="ry"
              values="13;18;13"
              dur="0.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Flame 3 - Inner Light Yellow */}
          <ellipse
            cx="100"
            cy="180"
            rx="6"
            ry="10"
            fill="#FCD34D"
            opacity="0.6"
          >
            <animate
              attributeName="ry"
              values="10;15;10"
              dur="0.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.9;0.6"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Blue flame base */}
          <ellipse
            cx="100"
            cy="165"
            rx="7"
            ry="8"
            fill="#60A5FA"
            opacity="0.8"
          >
            <animate
              attributeName="ry"
              values="8;12;8"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </ellipse>
        </g>
      </svg>

      {/* Company name below */}
      <p className="text-xl md:text-4xl text-blue-100 font-bold tracking-[0.15em] uppercase text-center">
        Cosmic Code Lab
      </p>
    </div>
  );
}
