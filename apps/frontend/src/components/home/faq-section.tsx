'use client';

import { useState } from 'react';
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

export function FAQSection() {
  const t = useT();
  const faqs = getFaqs(t);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] mb-4 tracking-tight">
            {t('home_faq_title', 'Frequently asked questions')}
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden bg-[#f1f3f4] hover:bg-[#e8eaed] transition-colors cursor-pointer"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-start"
              >
                <span className="font-medium text-[#202124] pe-4">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-all ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg
                    className="w-4 h-4 text-[#5f6368]"
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
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5">
                  <p className="text-[#5f6368] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
