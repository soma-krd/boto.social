'use client';

import Image from 'next/image';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const getTargetAudience = (t: any) => [
  {
    icon: '/home/svgs/home.svg',
    title: t('home_features_creators_title', 'Creators'),
    description: t('home_features_creators_description', 'Streamlined content creation and scheduling for consistent personal brand growth.'),
  },
  {
    icon: '/home/svgs/briefcase.svg',
    title: t('home_features_business_title', 'Business'),
    description: t('home_features_business_description', 'Multi-platform posting, team collaboration, and data-driven marketing decisions.'),
  },
  {
    icon: '/home/svgs/briefcase.svg',
    title: t('home_features_agencies_title', 'Agencies'),
    description: t('home_features_agencies_description', 'Manage multiple clients effortlessly with a unified platform for social media.'),
  },
];

const getFeatures = (t: any) => [
  {
    tag: t('home_features_tag_planning', 'PLANNING'),
    title: t('home_features_planning_title', 'All the tools required for social media growth'),
    description: t('home_features_planning_description', 'Boto provides the essential social media tools that your brand needs to succeed. With Boto, you have all the tools at your fingertips.'),
    video: '/home/videos/1.mp4',
    poster: '/home/images/tool-planning.png',
    layout: 'left',
  },
  {
    tag: t('home_features_tag_ai_agent', 'AI AGENT'),
    title: t('home_features_ai_agent_title', 'Generate posts with our AI agent'),
    description: t('home_features_ai_agent_description', 'Let AI help you create engaging content for all your social media platforms. Save time and maintain consistency across channels.'),
    video: '/home/videos/2.mp4',
    poster: '/home/images/tool-creating.png',
    layout: 'right',
  },
  {
    tag: t('home_features_tag_team', 'TEAM'),
    title: t('home_features_team_title', 'Invite your entire team'),
    description: t('home_features_team_description', 'All team members and clients can work together with different roles and permissions. Collaborate seamlessly on content.'),
    video: '/home/videos/3.mp4',
    poster: '/home/images/tool-improvement.png',
    layout: 'left',
  },
  {
    tag: t('home_features_tag_plugs', 'PLUGS'),
    title: t('home_features_plugs_title', 'Auto plug to your posts'),
    description: t('home_features_plugs_description', 'Auto-post, auto-like, auto-comment once you reach a specific milestone. So you can get the maximum engagement for your content.'),
    video: '/home/videos/4.mp4',
    poster: '/home/images/tool-organizing.png',
    layout: 'right',
  },
  {
    tag: t('home_features_tag_analytics', 'ANALYTICS'),
    title: t('home_features_analytics_title', 'See your best and worst performers'),
    description: t('home_features_analytics_description', 'Track your performance across all platforms. Get insights into engagement, reach, and growth with detailed analytics.'),
    video: '/home/videos/5.mp4',
    poster: '/home/images/tool-analytics.png',
    layout: 'left',
  },
  {
    tag: t('home_features_tag_marketplace', 'MARKETPLACE'),
    title: t('home_features_marketplace_title', 'Connect with others for cross promotion'),
    description: t('home_features_marketplace_description', 'Find and collaborate with other creators for cross-promotion opportunities. Grow your audience together.'),
    video: '/home/videos/6.mp4',
    poster: '/home/images/design-media.png',
    layout: 'right',
  },
];

export function FeaturesSection() {
  const t = useT();
  const targetAudience = getTargetAudience(t);
  const features = getFeatures(t);

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Who is it for section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-normal text-[#202124] mb-4 tracking-tight">
            {t('home_features_who_is_it_for', 'Who is it for?')}
          </h2>
          <p className="text-[#5f6368] max-w-2xl mx-auto mb-12 text-lg">
            {t('home_features_who_is_it_for_subtitle', "Whether you're a creator, business, or agency, we have the tools you need.")}
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {targetAudience.map((item) => (
              <div
                key={item.title}
                className="bg-[#f1f3f4] rounded-3xl p-8 hover:bg-[#e8eaed] transition-all group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="opacity-80"
                  />
                </div>
                <h3 className="text-xl font-medium text-[#202124] mb-3">{item.title}</h3>
                <p className="text-[#5f6368] text-base leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features with videos */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.tag}
              className={`flex flex-col ${feature.layout === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Text content */}
              <div className="flex-1 text-center lg:text-start">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#f1f3f4] text-[#5f6368] mb-4 tracking-wider">
                  {feature.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-normal text-[#202124] mb-4 leading-tight tracking-tight">
                  {index === 0 ? (
                    <>
                      {t('home_features_planning_title_part1', 'All the')}{' '}
                      <span className="relative inline-block">
                        {t('home_features_planning_title_part2', 'tools required')}
                      </span>{' '}
                      {t('home_features_planning_title_part3', 'for social media growth')}
                    </>
                  ) : (
                    feature.title
                  )}
                </h3>
                <p className="text-[#5f6368] text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Video */}
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-[#f1f3f4]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={feature.poster}
                    className="w-full h-auto"
                  >
                    <source src={feature.video} type="video/mp4" />
                    <Image
                      src={feature.poster}
                      alt={feature.title}
                      width={700}
                      height={400}
                      className="w-full h-auto"
                    />
                  </video>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
