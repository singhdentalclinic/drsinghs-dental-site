import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';

// Dynamic imports are easier if we use a mapping
import RootCanal from '../root-canal-therapy';
import DentalImplants from '../dental-implants';
import TeethWhitening from '../teeth-whitening';
import DentalVeneers from '../dental-veneers';
import PreventiveCare from '../preventive-care';
import EmergencyCare from '../emergency-care';
import Orthodontics from '../orthodontics';
import GumTreatment from '../gum-treatment';
import WisdomToothExtraction from '../wisdom-tooth-extraction';
import KidsDentistry from '../kids-dentistry';
import Dentures from '../dentures';
import DentalCrowns from '../dental-crowns';
import DentalBraces from '../dental-braces';
import Aligners from '../aligners';
import LaserDentistry from '../laser-dentistry';
import ToothJewel from '../tooth-jewel';

const componentsMap = {
  'root-canal-therapy': RootCanal,
  'dental-implants': DentalImplants,
  'teeth-whitening': TeethWhitening,
  'dental-veneers': DentalVeneers,
  'preventive-care': PreventiveCare,
  'emergency-care': EmergencyCare,
  orthodontics: Orthodontics,
  'gum-treatment': GumTreatment,
  'wisdom-tooth-extraction': WisdomToothExtraction,
  'kids-dentistry': KidsDentistry,
  dentures: Dentures,
  'dental-crowns': DentalCrowns,
  'dental-braces': DentalBraces,
  aligners: Aligners,
  'laser-dentistry': LaserDentistry,
  'tooth-jewel': ToothJewel,
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: `${title} - Singh Dental Clinic`,
    description: `Learn more about ${title} services at Singh Dental and Implant Center. Advanced care with painless procedures.`,
  };
}

export default function ServicePageRoute({ params }) {
  const { slug } = params;
  const ServiceComponent = componentsMap[slug];

  if (!ServiceComponent) {
    notFound();
  }

  return (
    <>
      <Header transparent={false} />
      <main>
        <ServiceComponent />
      </main>
    </>
  );
}
