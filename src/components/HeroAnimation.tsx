import React from 'react';

const HeroAnimation = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Personal Training Icon */}
        <div className="absolute inset-0 animate-hero-cycle">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-accent drop-shadow-lg"
            fill="currentColor"
          >
            {/* Silhouette stretching */}
            <g className="origin-center">
              {/* Head */}
              <circle cx="60" cy="25" r="8" />
              {/* Body */}
              <rect x="56" y="33" width="8" height="25" rx="4" />
              {/* Arms in stretching position */}
              <rect x="40" y="38" width="15" height="4" rx="2" transform="rotate(-15 47.5 40)" />
              <rect x="65" y="38" width="15" height="4" rx="2" transform="rotate(15 72.5 40)" />
              {/* Legs */}
              <rect x="54" y="58" width="4" height="20" rx="2" />
              <rect x="62" y="58" width="4" height="20" rx="2" />
              {/* Feet */}
              <ellipse cx="54" cy="82" rx="6" ry="3" />
              <ellipse cx="66" cy="82" rx="6" ry="3" />
            </g>
          </svg>
        </div>

        {/* Massage Hands Icon */}
        <div className="absolute inset-0 animate-hero-cycle-delayed opacity-0">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-accent drop-shadow-lg"
            fill="currentColor"
          >
            {/* Two hands in massage motion */}
            <g className="origin-center">
              {/* Left hand */}
              <g transform="translate(25, 45)">
                <ellipse cx="15" cy="15" rx="12" ry="8" transform="rotate(-20)" />
                <rect x="8" y="20" width="3" height="8" rx="1.5" />
                <rect x="12" y="22" width="3" height="10" rx="1.5" />
                <rect x="16" y="21" width="3" height="9" rx="1.5" />
                <rect x="20" y="19" width="3" height="7" rx="1.5" />
              </g>
              
              {/* Right hand */}
              <g transform="translate(60, 55)">
                <ellipse cx="15" cy="15" rx="12" ry="8" transform="rotate(20)" />
                <rect x="8" y="20" width="3" height="8" rx="1.5" />
                <rect x="12" y="22" width="3" height="10" rx="1.5" />
                <rect x="16" y="21" width="3" height="9" rx="1.5" />
                <rect x="20" y="19" width="3" height="7" rx="1.5" />
              </g>

              {/* Gentle motion lines */}
              <g className="animate-pulse">
                <path d="M30 60 Q45 55 60 60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                <path d="M35 70 Q50 65 65 70" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
              </g>
            </g>
          </svg>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse blur-xl"></div>
      </div>
    </div>
  );
};

export default HeroAnimation;