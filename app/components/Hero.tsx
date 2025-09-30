import SpaceParticles from './SpaceParticles';
import RetroLogo from './RetroLogo';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <SpaceParticles />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl space-y-8">
          <RetroLogo />

          <p className="text-xl md:text-2xl text-blue-200 font-light">
            Full Stack Developer & Creative Technologist
          </p>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Crafting digital experiences that blend elegant code with stunning design
          </p>

          <div className="flex gap-6 justify-center pt-8">
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}