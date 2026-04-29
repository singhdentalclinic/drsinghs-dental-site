'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookAppointmentButton from '@/components/ui/bookappointment';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Header({ transparent = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      label: 'Treatments',
      path: '/treatments',
      subItems: [
        { label: 'Our Services', path: '/treatments?tab=services' },
        { label: 'Treatment Process', path: '/treatments?tab=process' },
        { label: 'Cost Calculator', path: '/treatments?tab=calculator' },
        { label: 'Treatment Finder', path: '/treatments?tab=finder' },
        { label: 'Emergency Care', path: '/treatments?tab=emergency' },
      ],
    },
    { label: 'Patient Stories', path: '/patient-stories' },
    { label: 'Team', path: '/our-team' },
    { label: 'Contact', path: '/contact' },
    { label: 'About Us', path: '/about' },
  ];

  const isTransparentNav = transparent && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-elevation-md'
        : isTransparentNav
          ? 'bg-black/5 backdrop-blur-md'
          : 'bg-white/95 backdrop-blur-sm'
        }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-3 group transition-all duration-300 rounded-2xl ${isScrolled
              ? 'bg-transparent p-0 border-transparent shadow-none'
              : 'bg-white p-0.5 md:p-0.5 shadow-lg border border-muted hover:shadow-xl'
              }`}
          >
            <div className="relative w-9 h-9 md:w-11 md:h-11 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/assets/images/clinic-logo.png"
                alt="Dr. Singh's Dental and Implant Center Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 48px, 64px"
                priority
              />
            </div>

            <div className="flex flex-col font-monotype-corsiva pr-2 md:pr-4">
              <span className="text-xl font-bold leading-tight text-primary">Dr. Singh&apos;s</span>
              <span className="text-xs leading-tight text-text-secondary">
                Dental and Implant Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden xl:flex items-center space-x-3 px-3 py-2 rounded-full transition-all duration-300 ${isTransparentNav ? 'bg-white shadow-lg shadow-black/5' : 'bg-white'
              }`}
          >
            {navigationItems.map((item) => (
              <div
                key={item.path}
                className="relative group"
                onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className="px-2 py-0.5 font-body text-sm font-medium rounded-full transition-all duration-200 text-text-primary hover:text-primary hover:bg-muted flex items-center space-x-1"
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {item.subItems && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-4 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-muted py-2 z-50 overflow-hidden"
                      >
                        {item.subItems.map((subItem, index) => (
                          <div key={subItem.path}>
                            <Link
                              href={subItem.path}
                              className="block text-center px-3 py-1.5 text-sm font-medium text-secondary hover:text-primary hover:bg-muted hover:underline underline-offset-4 decoration-primary/30 transition-all"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                            {index < item.subItems.length - 1 && (
                              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-tertiary to-transparent" />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center">
            <Link
              href="tel:+918449830107"
              className="cursor-pointer transition-all bg-secondary text-white px-4 py-1.5 rounded-lg border-primary border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-base font-bold"
            >
              Call us
            </Link>
            <div
              className={`w-[1.5px] h-8 mx-2 transition-colors duration-200 ${isTransparentNav ? 'bg-white/30' : 'bg-tertiary'
                }`}
            />
            <div className="ml-2">
              <Link href="/book-appointment">
                <BookAppointmentButton />
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="xl:hidden flex items-center">
            <input
              type="checkbox"
              id="mobile-menu-checkbox"
              checked={isMobileMenuOpen}
              onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            <label htmlFor="mobile-menu-checkbox" className="toggle">
              <div id="bar1" className="bars"></div>
              <div id="bar2" className="bars"></div>
              <div id="bar3" className="bars"></div>
            </label>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden bg-white border-t shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-3 space-y-1 flex flex-col">
            {navigationItems.map((item) => (
              <div key={item.path} className="border-b border-muted last:border-0">
                <div className="flex items-center justify-between py-1.5">
                  <Link
                    href={item.path}
                    className="flex-grow text-text-primary font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                      }}
                      className="p-2 -mr-2 text-tertiary hover:text-primary transition-colors"
                    >
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {mobileExpanded === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pl-3 pb-1.5 space-y-0.5">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className="block py-1 text-sm text-text-secondary hover:text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all border-b border-tertiary last:border-0"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileExpanded(null);
                            }}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="pt-3 pb-1 flex flex-col space-y-2">
              <Link
                href="tel:+918449830107"
                className="w-full cursor-pointer transition-all bg-secondary text-white px-4 py-2 rounded-xl border-primary border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Call us
              </Link>
              <Link
                href="/book-appointment"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookAppointmentButton className="w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Line */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] ${isTransparentNav
          ? 'bg-gradient-to-r from-transparent via-white/80 to-transparent'
          : 'bg-gradient-to-r from-transparent via-tertiary to-transparent'
          }`}
      />
    </header>
  );
}
