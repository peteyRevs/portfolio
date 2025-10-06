'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevX?: number;
  prevY?: number;
}

export default function SpaceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(0.5);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = 0;
    let centerY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;

      // Reinitialize stars on resize
      initStars();
    };

    const initStars = () => {
      const starCount = 1000;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * canvas.width,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 20, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Store previous position for trails
        star.prevX = star.x / star.z * canvas.width + centerX;
        star.prevY = star.y / star.z * canvas.height + centerY;

        // Move star forward (decrease z)
        star.z -= speedRef.current;

        // Apply space-time bending effect near mouse
        if (mouseRef.current.active) {
          const sx = (star.x / star.z) * canvas.width + centerX;
          const sy = (star.y / star.z) * canvas.height + centerY;

          const dx = mouseRef.current.x - sx;
          const dy = mouseRef.current.y - sy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            // Bend space-time - warp stars around the mouse
            const force = (1 - distance / maxDistance) * 0.3;
            const angle = Math.atan2(dy, dx);

            // Bend stars away from mouse creating a gravity well effect
            star.x -= Math.cos(angle) * force * star.z * 0.01;
            star.y -= Math.sin(angle) * force * star.z * 0.01;

            // Slow down stars near mouse (time dilation effect)
            speedRef.current = 0.5 * (1 - force * 0.5);
          } else {
            speedRef.current = 0.5;
          }
        } else {
          speedRef.current = 0.5;
        }

        // Reset star when it goes past the screen
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
          star.prevX = undefined;
          star.prevY = undefined;
        }

        // Calculate screen position
        const sx = (star.x / star.z) * canvas.width + centerX;
        const sy = (star.y / star.z) * canvas.height + centerY;

        // Calculate star size based on depth
        const size = (1 - star.z / canvas.width) * 3;

        // Calculate opacity based on depth
        const opacity = (1 - star.z / canvas.width) * 0.8 + 0.2;

        // Draw trail if we have a previous position
        if (star.prevX !== undefined && star.prevY !== undefined) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.5})`;
          ctx.lineWidth = size * 0.5;
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for closer stars
        if (star.z < canvas.width * 0.3) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
          gradient.addColorStop(0, `rgba(147, 197, 253, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #1e293b 0%, #0a0a14 100%)' }}
    />
  );
}
