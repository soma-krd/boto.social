'use client';

import { useState, useEffect, useRef } from 'react';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const getFaqs = (t: any) => [
  {
    question: t('home_faq_question_1', 'What social media platforms are supported?'),
    answer: t('home_faq_answer_1', 'We support a wide range of platforms including Instagram, YouTube, LinkedIn, Reddit, TikTok, Facebook, Pinterest, Threads, X (Twitter), Slack, Discord, Mastodon, Bluesky, Telegram, VK, Medium, Dev.to, WordPress, and more. Check our documentation for the full list of supported platforms.'),
  },
  {
    question: t('home_faq_question_2', 'Is this software free to use?'),
    answer: t('home_faq_answer_2', 'Yes! This is an open-source social media scheduling tool that you can self-host for free. You have full control over your data and can customize the platform to your needs.'),
  },
  {
    question: t('home_faq_question_3', 'How does the AI content generation work?'),
    answer: t('home_faq_answer_3', 'Our AI agent helps you generate engaging social media content based on your prompts and preferences. It can create posts, suggest hashtags, and optimize your content for different platforms.'),
  },
  {
    question: t('home_faq_question_4', 'Can I schedule posts in advance?'),
    answer: t('home_faq_answer_4', 'Absolutely! You can schedule posts for any future date and time across all your connected social media accounts. The calendar view makes it easy to plan your content strategy.'),
  },
  {
    question: t('home_faq_question_5', 'Is there team collaboration support?'),
    answer: t('home_faq_answer_5', 'Yes, you can invite team members to your organization and collaborate on content creation and scheduling. Different permission levels allow you to control who can do what.'),
  },
];

function FaqItem({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border ${
        isOpen
          ? 'bg-white shadow-md shadow-black/5 border-black/10'
          : 'bg-white/60 hover:bg-white shadow-sm shadow-black/[0.03] border-black/5 hover:shadow-md hover:border-black/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-start"
      >
        <span className="font-medium text-[#202124] pe-4 text-lg">
          {faq.question}
        </span>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-[#202124] rotate-180' : 'bg-[#f1f3f4]'
        }`}>
          <svg
            className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-[#5f6368]'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-5">
            <p className="text-[#5f6368] leading-relaxed text-base">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const t = useT();
  const faqs = getFaqs(t);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#202124] mb-4 tracking-tight">
            {t('home_faq_title', 'Frequently asked questions')}
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
