'use client';
import Image from 'next/image';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: '/assets/images/facebook_logo.png',
    gradient: 'from-primary via-secondary to-secondary',
    url: 'https://www.facebook.com/singhdentalandimplant',
  },
  {
    name: 'Instagram',
    icon: '/assets/images/instagram_logo.png',
    gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    url: 'https://www.instagram.com/drsingh_dental/',
  },
  {
    name: 'Youtube',
    icon: '/assets/images/youtube_logo.png',
    gradient: 'from-red-600 via-red-500 to-red-400',
    url: 'https://www.youtube.com/@drsinghdental',
  },
  {
    name: 'WhatsApp',
    icon: '/assets/images/whatsapp_logo-1.png',
    gradient: 'from-green-600 via-green-500 to-green-400',
    url: 'https://wa.me/918449830107',
  },
];

export default function SocialButtons() {
  return (
    <div className="flex justify-center gap-[clamp(8px,2vw,24px)] max-w-md mx-auto">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-[clamp(40px,5.5vw,60px)] h-[clamp(40px,5.5vw,60px)] flex items-center justify-center border-none bg-transparent rounded-full cursor-pointer transition-all duration-300"
        >
          {/* BG Layer - Reverted to rounded-[9px] for rotation effect */}
          <div
            className={`absolute inset-0 w-full h-full rounded-full pointer-events-none transition-all duration-300 -z-10 group-hover:rotate-[35deg] group-hover:origin-bottom bg-gradient-to-tr ${social.gradient}`}
          />

          {/* SVG/Icon Container - Kept rounded-full for circle shape */}
          <div className="w-full h-full flex items-center justify-center bg-transparent backdrop-blur-[4px] tracking-[0.8px] rounded-full transition-all duration-300 border border-[rgba(156,156,156,0.466)] group-hover:bg-[rgba(156,156,156,0.466)] p-[clamp(4px,1vw,8px)]">
            <div className="relative w-full h-full">
              <Image
                src={social.icon}
                alt={social.name}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
