import '../styles/index.css';
import SmoothScrolling from '../components/SmoothScrolling';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import Script from "next/script";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: "Dr.Singh's Dental Clinic and Implant Center",
  description: 'Dental clinic',
  icons: {
    icon: [{ url: '/assets/images/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/amsterdam-handwriting" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/geist-mono" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/product-sans" rel="stylesheet" />
      </head>

      <body className="relative">
        {/* SVG Grain Filter */}
        <svg style={{ display: 'none' }}>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <SmoothScrolling>
          <div className="grain-overlay" style={{ filter: 'url(#grain-filter)' }}></div>
          {children}
          <WhatsAppButton />
        </SmoothScrolling>

        {/* ✅ External scripts optimized */}
        <Script
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsinghdent1329back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12"
          strategy="lazyOnload"
        />
        <Script
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
          strategy="lazyOnload"
        />

        {/* ✅ Local Business Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Dr. Singh's Dental and Implant Center",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ranikhet road",
                addressLocality: "Ramnagar",
                addressRegion: "Uttarakhand",
                postalCode: "244715",
                addressCountry: "IN",
              },
              telephone: "+91 84498 30107",
              email: "singhdentalclinicramnagar@gmail.com",
              url: "https://www.drsinghdental.com",
              areaServed: "Uttarakhand, India",
              medicalSpecialty: "Dentistry",
              priceRange: "₹₹",
            }),
          }}
        />

        {/* ✅ Dentist Schema */}
        <Script
          id="dentist-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Dr. Pradeep Singh",
              qualifications: ["BDS", "MDS (Endodontics)"],
              yearsOfExperience: 20,
              worksFor: {
                "@type": "MedicalBusiness",
                name: "Dr. Singh's Dental and Implant Center",
              },
            }),
          }}
        />

        {/* ✅ Rating Schema */}
        <Script
          id="rating-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "120", // ⚠️ UPDATE THIS
              reviewCount: "120",
            }),
          }}
        />
      </body>
    </html>
  );
}