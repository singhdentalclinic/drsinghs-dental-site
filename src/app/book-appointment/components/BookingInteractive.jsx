'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';
import ClinicInfo from './ClinicInfo';
import Icon from '@/components/ui/AppIcon';

export default function BookingInteractive({ initialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,

          treatmentType: formData.treatmentType,
          reasonForVisit: formData.reasonForVisit,

          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,

          isNewPatient: formData.isNewPatient,

          // Keeping these because they currently exist
          // inside your AppointmentForm.
          insuranceProvider: formData.insuranceProvider,
          policyNumber: formData.policyNumber,

          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,

          medicalConditions: formData.medicalConditions,
          currentMedications: formData.currentMedications,
          allergies: formData.allergies,
          previousDentalWork: formData.previousDentalWork,

          painLevel: formData.painLevel,
          hearAboutUs: formData.hearAboutUs,
        }),
      });

      const contentType = response.headers.get('content-type');

      let result = null;

      if (contentType?.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();

        console.error('Non-JSON response from appointment API:', text);

        throw new Error(
          `Appointment API returned an unexpected response (${response.status}). Check the server terminal for details.`
        );
      }

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            result?.message ||
            'This appointment slot is no longer available. Please choose another time.'
          );
        }

        throw new Error(
          result?.message ||
          result?.error ||
          'Unable to submit your appointment request. Please try again.'
        );
      }

      /*
       * Store the original form information together with
       * anything returned by the database/API.
       */
      setAppointmentDetails({
        ...formData,
        appointmentId: result?.appointment?.id || result?.appointmentId || null,
        status: result?.appointment?.status || 'pending',
      });

      setShowSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('Appointment booking error:', error);

      setSubmitError(
        error?.message ||
        'Something went wrong while submitting your appointment request.'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setShowSuccess(false);
    setAppointmentDetails(null);
    setSubmitError('');
  };

  /*
   * ---------------------------------------------------------
   * SUCCESS SCREEN
   * ---------------------------------------------------------
   */
  if (showSuccess && appointmentDetails) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-elevation-lg p-6 md:p-8 lg:p-12">
            {/* Success heading */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full mb-4">
                <Icon
                  name="CheckCircleIcon"
                  size={40}
                  variant="solid"
                  className="text-success"
                />
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3">
                Appointment Request Received!
              </h2>

              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
                Thank you for choosing Singh Dental Clinic. Your appointment
                request has been submitted successfully and is awaiting
                confirmation from our clinic.
              </p>
            </div>

            {/* Pending notice */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 md:p-5 mb-8">
              <div className="flex items-start gap-3">
                <Icon
                  name="ClockIcon"
                  size={24}
                  className="text-warning flex-shrink-0 mt-0.5"
                />

                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Confirmation Pending
                  </h3>

                  <p className="text-sm text-text-secondary">
                    This is an appointment request, not a confirmed
                    appointment. Our receptionist will review your request and
                    confirm it with you.
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment details */}
            <div className="bg-muted rounded-lg p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Appointment Request Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Patient Name
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.firstName}{' '}
                    {appointmentDetails?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Phone Number
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Treatment Type
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.treatmentType}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Preferred Date
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.preferredDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Preferred Time
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {appointmentDetails?.preferredTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-1">Status</p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warning/10 rounded-full">
                    <span className="w-2 h-2 bg-warning rounded-full" />

                    <span className="text-sm font-medium text-text-primary capitalize">
                      {appointmentDetails?.status || 'Pending'}
                    </span>
                  </div>
                </div>

                {appointmentDetails?.appointmentId && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-text-secondary mb-1">
                      Appointment Request ID
                    </p>

                    <p className="text-sm md:text-base font-medium text-text-primary break-all">
                      {appointmentDetails.appointmentId}
                    </p>
                  </div>
                )}
              </div>

              {appointmentDetails?.reasonForVisit && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-text-secondary mb-2">
                    Reason for Visit
                  </p>

                  <p className="text-base text-text-primary">
                    {appointmentDetails.reasonForVisit}
                  </p>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div className="bg-accent/10 border border-accent rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Icon
                  name="InformationCircleIcon"
                  size={24}
                  variant="solid"
                  className="text-accent flex-shrink-0 mt-1"
                />

                <div className="flex-1">
                  <h4 className="text-base font-semibold text-text-primary mb-3">
                    What Happens Next?
                  </h4>

                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">1.</span>

                      <span>
                        Your appointment request has been added to our clinic
                        system.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="font-semibold mr-2">2.</span>

                      <span>
                        Our receptionist will review the requested date and
                        time.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="font-semibold mr-2">3.</span>

                      <span>
                        You will receive a WhatsApp message once your
                        appointment is confirmed, rescheduled, or requires
                        further information.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="font-semibold mr-2">4.</span>

                      <span>
                        Please visit the clinic only after receiving appointment
                        confirmation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={handleBookAnother}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300"
              >
                Request Another Appointment
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

  /*
   * ---------------------------------------------------------
   * BOOKING FORM
   * ---------------------------------------------------------
   */
  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Page heading */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
            {initialData?.pageTitle}
          </h1>

          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
            {initialData?.pageDescription}
          </p>
        </div>

        {/* Submission error */}
        {submitError && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon
                  name="ExclamationCircleIcon"
                  size={22}
                  className="text-destructive flex-shrink-0 mt-0.5"
                />

                <div className="flex-1">
                  <p className="font-semibold text-text-primary mb-1">
                    Unable to Submit Appointment
                  </p>

                  <p className="text-sm text-text-secondary">{submitError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Appointment form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-elevation-md p-6 md:p-8 lg:p-10">
              <AppointmentForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Clinic details */}
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