'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

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
  { name: 'Mastodon', icon: 'mastodon.png' },
  { name: 'Bluesky', icon: 'bluesky.png' },
  { name: 'Telegram', icon: 'telegram.png' },
  { name: 'VK', icon: 'vk.png' },
  { name: 'Medium', icon: 'medium.png' },
  { name: 'Dev.to', icon: 'devto.png' },
  { name: 'WordPress', icon: 'wordpress.png' },
];

export function HeroSection() {
  const t = useT();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-16 px-4 overflow-hidden">
      {/* Hand-drawn doodles - Left side */}
      <div className="absolute left-4 lg:left-16 top-1/4 hidden lg:block opacity-40">
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" className="text-white">
          <path d="M60 10 Q80 40, 60 70 Q40 100, 60 130 Q80 160, 60 170" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="40" cy="60" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="70" cy="120" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* Hand-drawn doodles - Right side */}
      <div className="absolute right-4 lg:right-16 top-1/4 hidden lg:block opacity-40">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="text-white">
          {/* Star shape */}
          <path d="M50 5 L55 35 L85 40 L60 55 L70 85 L50 65 L30 85 L40 55 L15 40 L45 35 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Decorative checkmark icon */}
      <div className="mb-6">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#6366F1]">
          <path d="M8 24 L18 34 L40 12" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 30 L14 36" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t('home_hero_title_part1', 'Your')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {t('home_hero_title_part2', 'agentic social')}
          </span>
          <br />
          <span className="relative inline-block">
            {t('home_hero_title_part3', 'media scheduling tool')}
            {/* Pink underline decoration */}
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4" viewBox="0 0 200 20" fill="none">
              <path d="M5 15 Q50 5, 100 12 Q150 19, 195 8" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 mt-8">
          {t('home_hero_subtitle', 'Everything you need to manage your social media posts, build an audience, capture leads, and grow your business faster with AI')}
        </p>

        {/* Social platform icons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.name}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              title={platform.name}
            >
              <Image
                src={`/icons/platforms/${platform.icon}`}
                alt={platform.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-white/10"
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
      </div>

      {/* Hero Video/Screenshot */}
      <div className="mt-16 max-w-6xl w-full mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
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
