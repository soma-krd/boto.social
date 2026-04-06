import Image from 'next/image';

export function SocialMediaShowcase() {
  const platforms = [
    { name: '', icon: '' },
    { name: '', icon: '' },
    { name: 'Discord', icon: '/icons/platforms/discord.png' },
    { name: 'Instagram', icon: '/icons/platforms/instagram.png' },
    { name: 'Threads', icon: '/icons/platforms/threads.png' },
    { name: 'Facebook', icon: '/icons/platforms/facebook.png' },
    { name: 'YouTube', icon: '/icons/platforms/youtube.png' },
    { name: 'TikTok', icon: '/icons/platforms/tiktok.png' },
    { name: 'Slack', icon: '/icons/platforms/slack.png' },
    { name: 'Bluesky', icon: '/icons/platforms/bluesky.png' },
    { name: 'LinkedIn', icon: '/icons/platforms/linkedin.png' },
    { name: 'Reddit', icon: '/icons/platforms/reddit.png' },
    { name: 'Dribbble', icon: '/icons/platforms/dribbble.png' },
    { name: 'Pinterest', icon: '/icons/platforms/pinterest.png' },
    { name: 'Mastodon', icon: '/icons/platforms/mastodon.png' },
    { name: 'VK', icon: '/icons/platforms/vk.png' },
    { name: 'X', icon: '/icons/platforms/x.png' },
    { name: 'WordPress', icon: '/icons/platforms/wordpress.png' },
    { name: 'Telegram', icon: '/icons/platforms/telegram.png' },
    { name: '', icon: '' },
    { name: '', icon: '' },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-newTextColor text-center mb-6">
        Wide list of trending social
        <br />
        media channels
      </h1>
      <div className="relative mb-12">
        <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full" />
      </div>
      <p className="text-newTableText text-center text-lg mb-16 max-w-2xl">
        Harness the power of various social media channels seamlessly
        integrated into the platform for enhanced workflow efficiency.
      </p>
      <div className="grid grid-cols-7 gap-6">
        {platforms.map((platform, index) => (
          <div
            key={`${platform.name}-${index}`}
            className="flex items-center justify-center w-24 h-24 rounded-2xl bg-white/45 backdrop-blur-xl border border-white/80 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.95),0_4px_16px_rgb(15_23_42_/_0.06),0_1px_2px_rgb(15_23_42_/_0.04)] hover:bg-white/60 hover:border-white hover:shadow-[inset_0_1px_0_0_rgb(255_255_255_/_1),0_8px_28px_rgb(15_23_42_/_0.1)] transition-all duration-300"
          >
            {platform.icon && (
            <Image
              src={platform.icon}
                alt={platform.name}
                width={64}
                height={64}
                className="object-contain rounded-2xl"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

