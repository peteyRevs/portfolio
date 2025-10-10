'use client';

import { useEffect, useState } from 'react';
import SpaceParticles from './SpaceParticles';
import RocketLogo from './RocketLogo';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SpaceParticles />

      <section id="hero" className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-8">
          {/* Rocket launches up from bottom */}
          <div
            className="transition-all duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'translateY(0)' : 'translateY(100vh)',
              opacity: isLoaded ? 1 : 0,
            }}
          >
            <div className="flex justify-center">
              <RocketLogo />
            </div>
            <p className="text-xl md:text-4xl text-blue-100 font-bold tracking-[0.15em] uppercase text-center">
              Cosmic Code
            </p>
          </div>

          {/* Tagline fades in after rocket */}
          <p
            className="text-xl md:text-2xl text-blue-200 font-light transition-all duration-1000 delay-700"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Full-Stack Web Development & Digital Solutions
          </p>

          {/* Description fades in */}
          <p
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto transition-all duration-1000 delay-1000"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Building cutting-edge web applications and e-commerce solutions that drive business growth
          </p>

          {/* Buttons fade in last */}
          <div
            className="flex gap-6 justify-center pt-8 transition-all duration-1000 delay-1300"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <a href="#mission" className="btn-secondary">
              Prime Directive
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
