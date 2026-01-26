'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';
import EmergencyContact from './EmergencyContact';
import ClinicInfo from './ClinicInfo';
import Icon from '@/components/ui/AppIcon';

export default function BookingInteractive({ initialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAppointmentDetails(formData);
      setShowSuccess(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Appointment booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setShowSuccess(false);
    setAppointmentDetails(null);
  };

  if (showSuccess && appointmentDetails) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-elevation-lg p-6 md:p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full mb-4">
                <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3">
                Appointment Request Received!
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
                Thank you for choosing Singh Dental Clinic. We have received your appointment
                request and will confirm your booking shortly.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Patient Name</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.firstName} {appointmentDetails?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Email</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Phone</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Treatment Type</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.treatmentType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Preferred Date</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.preferredDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Preferred Time</p>
                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.preferredTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Icon
                  name="InformationCircleIcon"
                  size={24}
                  variant="solid"
                  className="text-accent flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-text-primary mb-2">
                    What Happens Next?
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <span>Our team will review your appointment request within 2-4 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <span>
                        You will receive a confirmation email and SMS with appointment details
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>A reminder will be sent 24 hours before your appointment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <span>Please arrive 15 minutes early for paperwork</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookAnother}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300"
              >
                Book Another Appointment
              </button>
              <a
                href="/"
                className="px-8 py-3 border border-border text-text-primary font-semibold rounded-md hover:bg-muted transition-all duration-300 text-center"
              >
                Return to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
            {initialData?.pageTitle}
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
            {initialData?.pageDescription}
          </p>
        </div>

        <EmergencyContact className="mb-8 md:mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-elevation-md p-6 md:p-8 lg:p-10">
              <AppointmentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ClinicInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BookingInteractive.propTypes = {
  initialData: PropTypes?.shape({
    pageTitle: PropTypes?.string?.isRequired,
    pageDescription: PropTypes?.string?.isRequired,
  })?.isRequired,
};
