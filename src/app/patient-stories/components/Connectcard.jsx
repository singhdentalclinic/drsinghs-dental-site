'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SocialButtons from './socialmediaicons';

export default function InstagramConnect() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const media = [
    // --- TOP LEFT ---
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-1.jpg',
      rotate: '-6deg',
      style: { top: '10%', left: '20%' },
    },
    {
      type: 'video',
      src: '/assets/videos/Dental_education-2.mp4',
      rotate: '6deg',
      style: { top: '5%', left: '30%' },
    },
    {
      type: 'image',
      src: '/assets/images/clinic/team.jpg',
      rotate: '6deg',
      style: { top: '15%', left: '5%', width: 250, height: 180 },
    },

    // --- MID/BOTTOM LEFT ---
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-4.jpeg',
      rotate: '-12deg',
      style: { bottom: '38%', left: '4%' },
    },
    {
      type: 'image',
      src: '/assets/images/clinic/award-1.jpeg',
      rotate: '8deg',
      style: { bottom: '42%', left: '15%' },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-8.jpeg',
      rotate: '8deg',
      style: { bottom: '25%', left: '23%' },
    },
    {
      type: 'image',
      src: '/assets/images/clinic/tech-1.jpg',
      rotate: '-5deg',
      style: { bottom: '3%', left: '20%' },
    },
    {
      type: 'video',
      src: '/assets/videos/Dental_education-3.mp4',
      rotate: '8deg',
      style: { bottom: '5%', left: '8%' },
    },

    // --- TOP RIGHT ---
    {
      type: 'image',
      src: '/assets/images/clinic/tech-2.jpeg',
      rotate: '6deg',
      style: { top: '12%', right: '38%', width: 220, height: 150 },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-6.jpeg',
      rotate: '6deg',
      style: { top: '20%', right: '17%' },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-9.jpg',
      rotate: '-6deg',
      style: { top: '12%', right: '8%' },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-10.jpeg',
      rotate: '-7deg',
      style: { top: '8%', right: '26%' },
    },

    // --- MID/BOTTOM RIGHT ---
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-3.jpg',
      rotate: '6deg',
      style: { top: '56%', right: '26%' },
    },
    {
      type: 'image',
      src: '/assets/images/clinic/award-2.jpeg',
      rotate: '-6deg',
      style: { top: '45%', right: '12%', width: 250, height: 180 },
    },
    {
      type: 'video',
      src: '/assets/videos/Dental_education.mp4',
      rotate: '-5deg',
      style: { top: '32%', right: '2%' },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-7.jpeg',
      rotate: '6deg',
      style: { bottom: '8%', right: '10%' },
    },

    // --- EXTRAS (Center Top/Bottom) ---
    {
      type: 'image',
      src: '/assets/images/patients_images/patient-5.jpeg',
      rotate: '-6deg',
      style: { top: '2%', left: '42%' },
    },
    {
      type: 'image',
      src: '/assets/images/patients_images/Dental_camp.jpg',
      rotate: '9deg',
      style: { bottom: '2%', right: '55%', width: 250, height: 180 },
    },
    {
      type: 'image',
      src: '/assets/images/clinic/team.webp',
      rotate: '4deg',
      style: { bottom: '2%', right: '20%', width: 250, height: 180 },
    },
    {
      type: 'video',
      src: '/assets/videos/Dental_education-4.mp4',
      rotate: '-10deg',
      style: { bottom: '-2%', right: '45%' },
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const scrollToCenter = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        // Robust math: center relative to the actual content height/width
        const canvas = container.firstChild;
        const scrollX = (canvas.clientWidth - container.clientWidth) / 2;
        const scrollY = (canvas.clientHeight - container.clientHeight) / 2;
        container.scrollTo({
          left: scrollX,
          top: scrollY,
          behavior: 'instant',
        });
      }
    };

    // Initial scroll
    scrollToCenter();

    // Short timeout to handle potential race conditions on mobile layout
    const timer = setTimeout(scrollToCenter, 100);

    // Re-center if the user resizes the window
    window.addEventListener('resize', scrollToCenter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', scrollToCenter);
    };
  }, []);

  return (
    <section
      style={{
        ...styles.hero,
        ...(isMobile ? { overflowY: 'hidden', touchAction: 'pan-x' } : {}),
      }}
      ref={containerRef}
      tabIndex={0}
    >
      <div
        style={{
          ...styles.scrapbookCanvas,
          ...(isMobile ? { height: '100dvh' } : {}),
        }}
      >
        <div style={styles.glowCenter} aria-hidden="true" />

        {media.map((item, i) => (
          <div
            key={i}
            style={{
              ...styles.floating,
              ...(item.type === 'video' ? { height: 300, width: 180 } : {}),
              ...item.style,
              '--r': item.rotate,
            }}
            onMouseEnter={(e) => e.currentTarget.style.setProperty('--r', '0deg')}
            onMouseLeave={(e) => e.currentTarget.style.setProperty('--r', item.rotate)}
          >
            {item.type === 'image' ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt="Patient story or clinic highlight"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            ) : (
              <video
                src={item.src}
                muted
                loop
                autoPlay
                playsInline
                style={styles.media}
                onMouseEnter={(e) => e.currentTarget.pause()}
                onMouseLeave={(e) => e.currentTarget.play()}
                onClick={(e) =>
                  e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()
                }
              />
            )}
          </div>
        ))}
        {/* FIXED CENTER OVERLAY */}
        <div style={styles.overlay}>
          <div style={styles.center}>
            <p className="font-script" style={styles.script}>
              Connect on
            </p>
            <h1 className="font-instagram font-semibold" style={styles.title}>
              {'Social Media'.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-200 hover:font-black cursor-default"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <span style={{ color: '#fca232' }}>.</span>
            </h1>
            <div
              style={{
                height: '1px',
                width: '100%',
                background: 'linear-gradient(90deg, transparent, #fca232, transparent)',
                margin: '0 auto clamp(12px, 2vh, 24px)',
              }}
            />

            <div>
              <p style={styles.desc}>
                For more regular updates about clinic, patient stories and dental care tips, follow
                us on our social media platforms below.
              </p>

              <SocialButtons />

              <div style={styles.hint}>
                <span>Scroll horizontally to explore more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    background: '#1a7ca0',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.2) transparent',
    scrollSnapAlign: 'start',
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'auto',
  },

  scrapbookCanvas: {
    position: 'relative',
    width: '1900px',
    height: '895px',
    background: '#1a7ca0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 10,
  },

  glowCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1500px',
    height: '1500px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
    filter: 'blur(100px)',
    zIndex: 1,
    pointerEvents: 'none',
  },

  center: {
    textAlign: 'center',
    width: '90%',
    maxWidth: 'min(520px, 90vw)',
    position: 'relative',
    pointerEvents: 'auto',
  },

  script: {
    color: '#fff',
    fontSize: 'clamp(32px, 6vw, 60px)',
    marginBottom: -15,
  },

  title: {
    fontSize: 'clamp(36px, 9vw, 64px)',
    color: '#fff',
    margin: 0,
    fontWeight: 'bold',
  },

  desc: {
    color: '#eaeaea',
    fontSize: 'clamp(12px, 1.8vw, 16px)',
    margin: '12px 0 clamp(16px, 3vh, 32px)',
    lineHeight: 1.6,
  },

  hint: {
    marginTop: 'clamp(24px, 5vh, 48px)',
    fontSize: 10,
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },

  floating: {
    position: 'absolute',
    width: 160,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    zIndex: 2,
    transform: 'rotate(var(--r))',
    transition: 'transform 0.3s ease',
  },

  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    userSelect: 'none',
  },
};
