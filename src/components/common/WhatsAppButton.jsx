'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button when footer is visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.08, // Trigger when 10% of the footer is visible
      }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <Link
      href="https://wa.me/918449830107"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 group flex items-center justify-end transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 bg-green-50 text-gray-800 px-4 py-2 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-sm font-medium whitespace-nowrap opacity-0 bg-opacity-100 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hidden md:block">
        Chat with us
        {/* Arrow pointing right */}
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white transform rotate-45"></span>
      </span>

      <div className="relative w-16 h-16 md:w-18 md:h-18 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-3 flex items-center justify-center border border-[#25D366] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
        <Image
          src="/assets/images/whatsapp_logo-1.png"
          alt="WhatsApp"
          width={60}
          height={60}
          className="w-full h-full object-contain"
          priority
        />
        {/* Green dot indicator */}
        <span className="absolute top-0 right-0 md:top-1 md:right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
    </Link>
  );
}
