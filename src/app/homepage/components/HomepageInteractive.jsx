'use client';

import PropTypes from 'prop-types';
import HeroSection from './HeroSection';
import TreatmentSpecialties from './TreatmentSpecialties';
import DoctorExpertise from './DoctorExpertise';
import PatientReviews from './PatientReviews';
import WhyChooseUs from './WhyChooseUs';
import AppointmentCTA from './AppointmentCTA';
import Footer from './Footer';

export default function HomepageInteractive({ pageData }) {
  return (
    <>
      <HeroSection stats={pageData?.stats} heroData={pageData?.heroData} />
      <TreatmentSpecialties treatments={pageData?.treatments} />
      <DoctorExpertise doctor={pageData?.doctor} />
      <PatientReviews reviews={pageData?.reviews} overallRating={pageData?.overallRating} />
      <WhyChooseUs features={pageData?.features} />
      <AppointmentCTA ctaData={pageData?.ctaData} />
      <Footer />
    </>
  );
}

HomepageInteractive.propTypes = {
  pageData: PropTypes?.shape({
    stats: PropTypes?.object?.isRequired,
    heroData: PropTypes?.object?.isRequired,
    treatments: PropTypes?.array?.isRequired,
    doctor: PropTypes?.object?.isRequired,
    reviews: PropTypes?.array?.isRequired,
    overallRating: PropTypes?.object?.isRequired,
    features: PropTypes?.array?.isRequired,
    ctaData: PropTypes?.object?.isRequired,
  })?.isRequired,
};
