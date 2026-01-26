import '../styles/index.css';
import SmoothScrolling from '../components/SmoothScrolling';
import WhatsAppButton from '@/components/common/WhatsAppButton';

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
          {/* Grain Overlay */}
          <div className="grain-overlay" style={{ filter: 'url(#grain-filter)' }}></div>
          {children}
          <WhatsAppButton />
        </SmoothScrolling>

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsinghdent1329back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
