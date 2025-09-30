'use client';

// import Image from 'next/image';

export default function RetroLogo() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Logo Image */}
      {/* <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
        <Image
          src="/logo.png"
          alt="PA Logo"
          fill
          className="object-contain"
          style={{ mixBlendMode: 'lighten' }}
          priority
        />

      </div> */}

      {/* Full name below */}
      <div className="text-center">
        <h1 className="font-bold text-9xl">PA</h1>
        <p className="text-xl md:text-2xl text-blue-100 font-light tracking-[0.3em] uppercase">
          Peter Arevalo
        </p>
      </div>
    </div>
  );
}
