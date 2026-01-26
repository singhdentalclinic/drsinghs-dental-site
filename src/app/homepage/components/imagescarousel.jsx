'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const carouselImages = [
  {
    src: '/assets/patients_images/Dental_camp.jpg',
    alt: 'Dental camp at Ramnagar Police station',
  },
  {
    src: '/assets/clinic/team.jpg',
    alt: 'Team',
  },
  {
    src: '/assets/patients_images/patient-1.jpg',
    alt: 'Root Canal Treatment',
  },
  {
    src: '/assets/patients_images/patient-4.jpeg',
    alt: 'Dental Implants',
  },
  {
    src: '/assets/patients_images/patient-2.jpg',
    alt: 'Cosmetic Dentistry',
  },
  {
    src: '/assets/patients_images/patient-3.jpg',
    alt: 'Preventive Care',
  },
  {
    src: '/assets/patients_images/patient-5.jpeg',
    alt: 'Pediatric Dentistry',
  },
  {
    src: '/assets/patients_images/patient-6.jpeg',
    alt: 'Emergency Care',
  },
];

export default function ImagesCarousel() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Create the infinite scroll animation
    tweenRef.current = gsap.to(track, {
      x: '-50%',
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    // For mobile, we might want to speed it up or adjust duration
    if (window.innerWidth < 768) {
      tweenRef.current.duration(25);
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.1,
        ease: 'none',
        overwrite: true,
      });
    }
  };

  return (
    <section className="w-full py-6 md:py-8 overflow-hidden">
      <div
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div ref={trackRef} className="carousel-track flex gap-6 w-max">
          {/* Double the images to create seamless loop */}
          {[...carouselImages, ...carouselImages].map((img, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[200px] md:w-[300px] md:h-[180px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 768px) 300px, 300px"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Remove CSS animation as it's now handled by GSAP */
      `}</style>
    </section>
  );
}
