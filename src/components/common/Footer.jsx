import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { label: 'Root Canal Treatment', path: '/services' },
      { label: 'Dental Implants', path: '/services' },
      { label: 'Cosmetic Dentistry', path: '/services' },
      { label: 'Preventive Care', path: '/services' },
      { label: 'Emergency Services', path: '/services' },
    ],
    quickLinks: [
      { label: 'Book Appointment', path: '/book-appointment' },
      { label: 'Treatments', path: '/treatments' },
      { label: 'Patient Stories', path: '/patient-stories' },
      { label: 'Team', path: '/our-team' },
      { label: 'Contact', path: '/contact' },
      { label: 'About Us', path: '/about' },
    ],
    contact: {
      address: 'Singh Dental Clinic, Main Market, Ramnagar, Uttarakhand 244715',
      phone: '+91 84498 30107',
      email: 'singhdentalclinicramnagar@gmail.com',
    },
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/assets/images/clinic-logo.png"
                alt="Singh Dental Clinic"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col font-monotype-corsiva">
                <span className="text-[24px] font-bold leading-tight">Dr. Singh&apos;s</span>
                <span className="text-[16px] text-white/80 leading-tight">
                  Dental Clinic and Implant Center
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-white/80 leading-relaxed">
              Uttarakhand&apos;s most trusted dental clinic with 20+ years of expertise in painless
              treatments and modern dentistry.
            </p>

            <div className="w-full h-px bg-white/10 my-6"></div>

            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/singhdentalandimplant"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Visit our Facebook page"
              >
                <Image
                  src="/assets/images/facebook_logo.png"
                  alt="Facebook"
                  width={30}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </a>
              <a
                href="https://www.instagram.com/drsingh_dental/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Visit our Instagram page"
              >
                <Image
                  src="/assets/images/instagram_logo.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain"
                />
              </a>
              <a
                href="https://www.youtube.com/@drsinghdental"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Visit our YouTube channel"
              >
                <Image
                  src="/assets/images/youtube_logo.png"
                  alt="YouTube"
                  width={28}
                  height={28}
                  className="w-15 h-7 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Grouping Services and Quick Links to keep them side-by-side on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div>
              <h3 className="font-headline text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                {footerLinks?.services?.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link?.path}
                      className="font-body text-sm text-white/80 hover:text-white transition-colors duration-fast"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks?.quickLinks?.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link?.path}
                      className="font-body text-sm text-white/80 hover:text-white transition-colors duration-fast"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerLinks?.contact?.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group"
              >
                <Icon
                  name="MapPinIcon"
                  size={20}
                  variant="solid"
                  className="flex-shrink-0 mt-0.5"
                />
                <span className="font-body text-sm text-white/80 group-hover:text-white group-hover:underline transition-colors duration-fast">
                  {footerLinks?.contact?.address}
                </span>
              </a>
              <div className="flex items-center space-x-3">
                <Icon name="PhoneIcon" size={20} variant="solid" className="flex-shrink-0" />
                <a
                  href={`tel:${footerLinks?.contact?.phone}`}
                  className="font-body text-sm text-white/80 hover:text-white hover:underline transition-colors duration-fast"
                >
                  {footerLinks?.contact?.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="EnvelopeIcon" size={20} variant="solid" className="flex-shrink-0" />
                <a
                  href={`mailto:${footerLinks?.contact?.email}`}
                  className="font-body text-sm text-white/80 hover:text-white hover:underline transition-colors duration-fast"
                >
                  {footerLinks?.contact?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-sm text-white/60 text-center md:text-left">
              © {currentYear} Singh Dental Clinic. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="#"
                className="font-body text-sm text-white/60 hover:text-white transition-colors duration-fast"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-white/60 hover:text-white transition-colors duration-fast"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
