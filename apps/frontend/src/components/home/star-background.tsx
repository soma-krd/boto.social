'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 4000);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY + window.scrollY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleScroll = () => {
      // Update mouse position relative to scrolled canvas
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.001;
      const mouse = mouseRef.current;
      const scrollY = window.scrollY;
      const mousePageY = mouse.y;

      particlesRef.current.forEach((p) => {
        // Ambient floating animation
        const floatX = Math.sin(time * p.speed + p.phase) * 20;
        const floatY = Math.cos(time * p.speed * 0.7 + p.phase) * 15;

        // Target position (base + float)
        let targetX = p.baseX + floatX;
        let targetY = p.baseY + floatY;

        // Mouse repulsion
        const dx = targetX - mouse.x;
        const dy = targetY - (mousePageY - scrollY + rect.top);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 120;

        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * 30;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        // Smooth movement towards target
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Pulsing opacity
        const pulseOpacity = p.opacity + Math.sin(time * 1.5 + p.phase) * 0.08;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 130, 200, ${Math.max(0.02, pulseOpacity)})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
