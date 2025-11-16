import Image from 'next/image';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export async function SocialMediaShowcase() {
  const t = await getT();

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
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
        Wide list of trending social
        <br />
        media channels
      </h1>
      <div className="relative mb-12">
        <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full" />
      </div>
      <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl">
        Harness the power of various social media channels seamlessly
        integrated into the platform for enhanced workflow efficiency.
      </p>
      <div className="grid grid-cols-7 gap-6">
        {platforms.map((platform, index) => (
          <div
            key={`${platform.name}-${index}`}
            className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-900/30 to-purple-950/30 backdrop-blur-sm border border-purple-800/20 hover:border-purple-600/50 transition-all duration-300"
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

