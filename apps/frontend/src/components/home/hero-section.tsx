'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { StarBackground } from './star-background';

const socialPlatforms = [
  { name: 'Instagram', icon: 'instagram.png' },
  { name: 'YouTube', icon: 'youtube.png' },
  { name: 'LinkedIn', icon: 'linkedin.png' },
  { name: 'Reddit', icon: 'reddit.png' },
  { name: 'TikTok', icon: 'tiktok.png' },
  { name: 'Facebook', icon: 'facebook.png' },
  { name: 'Pinterest', icon: 'pinterest.png' },
  { name: 'Threads', icon: 'threads.png' },
  { name: 'X', icon: 'x.png' },
  { name: 'Slack', icon: 'slack.png' },
  { name: 'Discord', icon: 'discord.png' },
  { name: 'Telegram', icon: 'telegram.png' },
];

export function HeroSection() {
  const t = useT();
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Calculate how far into the viewport the element is (0 = just entering, 1 = fully visible)
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.6)));
      const scale = 0.85 + progress * 0.15; // Scale from 0.85 to 1.0
      const opacity = 0.3 + progress * 0.7; // Fade from 0.3 to 1.0
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative flex flex-col items-center px-4 overflow-hidden">
      <StarBackground />
      {/* Hero content — fills the viewport */}
      <div className="min-h-screen flex flex-col items-center justify-center max-w-4xl mx-auto text-center relative z-10 pt-20 pb-8">
        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#202124] mb-8 leading-[1.1] tracking-tight">
          {t('home_hero_title_part1', 'Your')}{' '}
          {t('home_hero_title_part2', 'agentic social')}
          <br />
          {t('home_hero_title_part3', 'media scheduling tool')}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-[#3c4043] max-w-3xl mx-auto mb-12 mt-4 leading-relaxed font-light">
          {t('home_hero_subtitle', 'Everything you need to manage your social media posts, build an audience, capture leads, and grow your business faster with AI')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#202124] text-white text-lg font-medium hover:bg-[#303134] transition-all hover:scale-[1.03] shadow-md shadow-black/20"
          >
            {t('home_hero_cta', 'Get Started Free')}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#202124] text-lg font-medium hover:bg-[#f1f3f4] transition-all shadow-sm shadow-black/5 border border-black/5"
          >
            {t('home_hero_explore', 'Explore features')}
          </Link>
        </div>

        {/* Social platform icons */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.name}
              className="w-12 h-12 rounded-full bg-white shadow-sm shadow-black/5 flex items-center justify-center hover:shadow-md hover:scale-110 transition-all cursor-pointer"
              title={platform.name}
            >
              <Image
                src={`/icons/platforms/${platform.icon}`}
                alt={platform.name}
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Video/Screenshot */}
      <div ref={videoRef} className="mt-8 max-w-6xl w-full mx-auto px-4 transition-all duration-100 will-change-transform">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#f1f3f4]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            poster="/home/images/tool-planning.png"
          >
            <source src="/home/videos/hero.webm" type="video/webm" />
            <Image
              src="/home/images/tool-planning.png"
              alt="App screenshot"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
