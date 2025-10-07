'use client';

import { useId } from 'react';

interface RocketLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RocketLogo({ width = 140, height = 154, className = '' }: RocketLogoProps) {
  // Generate unique ID for gradients to avoid conflicts when multiple instances exist
  const uniqueId = useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradients for 3D effect */}
        <linearGradient id={`leftFace-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id={`rightFace-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id={`topFace-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      {/* Rocket Body - Left Face */}
      <path
        d="M 100 30 L 80 45 L 80 130 L 100 145 Z"
        fill={`url(#leftFace-${uniqueId})`}
      />

      {/* Rocket Body - Right Face */}
      <path
        d="M 100 30 L 120 45 L 120 130 L 100 145 Z"
        fill={`url(#rightFace-${uniqueId})`}
      />

      {/* Rocket Body - Top Face (Nose) */}
      <path
        d="M 100 20 L 80 35 L 100 30 L 120 35 Z"
        fill={`url(#topFace-${uniqueId})`}
      />

      {/* Top Nose Detail - Left */}
      <path
        d="M 100 20 L 80 35 L 80 45 L 100 30 Z"
        fill="#1E40AF"
        opacity="0.8"
      />

      {/* Top Nose Detail - Right */}
      <path
        d="M 100 20 L 120 35 L 120 45 L 100 30 Z"
        fill="#3B82F6"
        opacity="0.9"
      />

      {/* Left Fin */}
      <path
        d="M 80 100 L 60 115 L 60 140 L 80 130 Z"
        fill="#1E40AF"
      />
      <path
        d="M 80 100 L 80 130 L 100 145 L 100 115 Z"
        fill="#2563EB"
        opacity="0.7"
      />

      {/* Right Fin */}
      <path
        d="M 120 100 L 140 115 L 140 140 L 120 130 Z"
        fill="#60A5FA"
      />
      <path
        d="M 120 100 L 120 130 L 100 145 L 100 115 Z"
        fill="#3B82F6"
        opacity="0.5"
      />

      {/* Window - Left Side */}
      <ellipse cx="90" cy="75" rx="6" ry="8" fill="#1E40AF" opacity="0.6" />
      <ellipse cx="90" cy="75" rx="4" ry="6" fill="#60A5FA" opacity="0.8" />

      {/* Window - Right Side */}
      <ellipse cx="110" cy="75" rx="6" ry="8" fill="#3B82F6" opacity="0.7" />
      <ellipse cx="110" cy="75" rx="4" ry="6" fill="#93C5FD" opacity="0.9" />

      {/* Accent Lines - Left Face */}
      <line x1="85" y1="85" x2="85" y2="120" stroke="#60A5FA" strokeWidth="1" opacity="0.4" />

      {/* Accent Lines - Right Face */}
      <line x1="115" y1="85" x2="115" y2="120" stroke="#93C5FD" strokeWidth="1" opacity="0.5" />

      {/* Base Platform - Left */}
      <path d="M 80 130 L 70 137 L 70 145 L 80 140 Z" fill="#1E40AF" opacity="0.7" />

      {/* Base Platform - Right */}
      <path d="M 120 130 L 130 137 L 130 145 L 120 140 Z" fill="#3B82F6" opacity="0.8" />

      {/* Base Platform - Bottom */}
      <path d="M 80 140 L 100 150 L 120 140 L 100 145 Z" fill="#60A5FA" opacity="0.6" />

      {/* Exhaust Flame - Isometric Style */}
      <g>
        {/* Blue Core - Left */}
        <path d="M 90 150 L 85 160 L 90 175 L 95 165 Z" fill="#60A5FA" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="0.6s" repeatCount="indefinite" />
        </path>

        {/* Blue Core - Right */}
        <path d="M 110 150 L 115 160 L 110 175 L 105 165 Z" fill="#3B82F6" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="0.7s" repeatCount="indefinite" />
        </path>

        {/* Orange Middle - Left */}
        <path d="M 92 165 L 88 175 L 92 190 L 96 180 Z" fill="#F97316" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="0.5s" repeatCount="indefinite" />
        </path>

        {/* Orange Middle - Right */}
        <path d="M 108 165 L 112 175 L 108 190 L 104 180 Z" fill="#FB923C" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="0.6s" repeatCount="indefinite" />
        </path>

        {/* Yellow Tip - Left */}
        <path d="M 94 180 L 91 188 L 94 200 L 97 192 Z" fill="#FBBF24" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.8;0.6" dur="0.4s" repeatCount="indefinite" />
        </path>

        {/* Yellow Tip - Right */}
        <path d="M 106 180 L 109 188 L 106 200 L 103 192 Z" fill="#FCD34D" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.8;0.6" dur="0.5s" repeatCount="indefinite" />
        </path>

        {/* Center flame */}
        <ellipse cx="100" cy="170" rx="8" ry="15" fill="#F97316" opacity="0.5">
          <animate attributeName="ry" values="15;20;15" dur="0.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* Shadow underneath */}
      <ellipse cx="100" cy="205" rx="35" ry="8" fill="#0F172A" opacity="0.2" />
    </svg>
  );
}
