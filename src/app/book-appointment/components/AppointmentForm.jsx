'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AppointmentForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    treatmentType: '',
    preferredDate: '',
    preferredTime: '',
    insuranceProvider: '',
    policyNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    currentMedications: '',
    allergies: '',
    previousDentalWork: '',
    reasonForVisit: '',
    painLevel: '0',
    isNewPatient: 'yes',
    hearAboutUs: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // Dynamic appointment availability
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');

  const treatmentTypes = [
    'General Checkup',
    'Root Canal Therapy',
    'Dental Implants',
    'Cosmetic Dentistry',
    'Teeth Whitening',
    'Orthodontics',
    'Emergency Care',
    'Preventive Care',
    'Other',
  ];

  const insuranceProviders = [
    'No Insurance',
    'ICICI Lombard',
    'Star Health',
    'Max Bupa',
    'HDFC ERGO',
    'Care Health',
    'Religare',
    'Other',
  ];

  /*
   * Today's date.
   *
   * Used to prevent patients from selecting a date in the past.
   */
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  /*
   * Convert API time such as "10:15"
   * into display format such as "10:15 AM".
   */
  const formatTime = (time) => {
    if (!time) return '';

    const [hoursString, minutes] = time.split(':');

    const hours = Number(hoursString);

    if (Number.isNaN(hours)) {
      return time;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;

    return `${displayHour}:${minutes} ${period}`;
  };

  /*
   * Fetch available appointment slots whenever
   * the patient changes the appointment date.
   */
  useEffect(() => {
    if (!formData.preferredDate) {
      setAvailableSlots([]);
      setSlotError('');
      return;
    }

    const fetchAvailableSlots = async () => {
      try {
        setLoadingSlots(true);
        setSlotError('');

        const response = await fetch(
          `/api/appointments/availability?date=${encodeURIComponent(
            formData.preferredDate
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || 'Unable to load available appointment slots'
          );
        }

        setAvailableSlots(data?.availableSlots || []);

        /*
         * The previously selected time may no longer
         * be available after changing the date.
         */
        setFormData((prev) => ({
          ...prev,
          preferredTime: '',
        }));

        /*
         * If the API says the currently selected time
         * is still available, we could preserve it.
         *
         * For safety and clarity, we reset it whenever
         * the date changes.
         */
      } catch (error) {
        console.error('Error fetching appointment availability:', error);

        setAvailableSlots([]);
        setSlotError(
          'Unable to load available appointment times. Please try again.'
        );

        setFormData((prev) => ({
          ...prev,
          preferredTime: '',
        }));
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [formData.preferredDate]);

  /*
   * Handle normal form changes.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    /*
     * If the selected date changes, the useEffect above
     * will automatically fetch fresh availability.
     */
    if (name === 'preferredDate') {
      setSlotError('');
    }
  };

  /*
   * Validate individual steps.
   */
  const validateStep = (step) => {
    const newErrors = {};

    /*
     * STEP 1
     * Personal Information
     */
    if (step === 1) {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }

      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      if (!formData?.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (
        !/^\d{10}$/.test(formData?.phone?.replace(/\D/g, ''))
      ) {
        newErrors.phone = 'Phone number must be 10 digits';
      }

      if (!formData?.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      }
    }

    /*
     * STEP 2
     * Appointment Details
     */
    if (step === 2) {
      if (!formData?.treatmentType) {
        newErrors.treatmentType = 'Treatment type is required';
      }

      if (!formData?.preferredDate) {
        newErrors.preferredDate = 'Preferred date is required';
      } else {
        /*
         * Prevent submission of a past appointment date.
         */
        const today = getTodayDate();

        if (formData.preferredDate < today) {
          newErrors.preferredDate =
            'Appointment date cannot be in the past';
        }
      }

      if (!formData?.preferredTime) {
        newErrors.preferredTime = 'Preferred time is required';
      } else if (
        availableSlots.length > 0 &&
        !availableSlots.includes(formData.preferredTime)
      ) {
        /*
         * Protect against a stale selection.
         */
        newErrors.preferredTime =
          'This appointment slot is no longer available. Please select another time.';
      }

      if (!formData?.reasonForVisit?.trim()) {
        newErrors.reasonForVisit = 'Reason for visit is required';
      }
    }

    /*
     * STEP 3
     * Medical Information
     */
    if (step === 3) {
      if (!formData?.emergencyContact?.trim()) {
        newErrors.emergencyContact = 'Emergency contact is required';
      }

      if (!formData?.emergencyPhone?.trim()) {
        newErrors.emergencyPhone = 'Emergency phone is required';
      } else if (
        !/^\d{10}$/.test(formData?.emergencyPhone?.replace(/\D/g, ''))
      ) {
        newErrors.emergencyPhone = 'Phone number must be 10 digits';
      }
    }

    /*
     * STEP 4
     * Terms and Conditions
     */
    if (step === 4) {
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms =
          'You must agree to terms and conditions';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * Go to next step.
   */
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  /*
   * Go back one step.
   */
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  /*
   * Submit appointment request.
   */
  const handleSubmit = (e) => {
    e?.preventDefault();

    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  /*
   * Step indicator.
   */
  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 md:mb-12">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center w-full">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 ${currentStep >= step
                ? 'bg-primary text-white shadow-elevation-md'
                : 'bg-muted text-muted-foreground'
                }`}
            >
              {currentStep > step ? (
                <Icon
                  name="CheckIcon"
                  size={20}
                  variant="solid"
                />
              ) : (
                step
              )}
            </div>

            <span className="text-xs md:text-sm font-medium text-text-secondary mt-2 text-center hidden sm:block">
              {step === 1 && 'Personal'}
              {step === 2 && 'Appointment'}
              {step === 3 && 'Medical'}
              {step === 4 && 'Review'}
            </span>
          </div>

          {step < 4 && (
            <div
              className={`h-1 flex-1 mx-2 transition-all duration-300 ${currentStep > step ? 'bg-primary' : 'bg-muted'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {renderStepIndicator()}

      {/* ========================================================= */}
      {/* STEP 1 - PERSONAL INFORMATION                            */}
      {/* ========================================================= */}

      {currentStep === 1 && (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                First Name *
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.firstName
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="Enter your first name"
              />

              {errors?.firstName && (
                <p className="text-error text-sm mt-1">
                  {errors?.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Last Name *
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData?.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.lastName
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="Enter your last name"
              />

              {errors?.lastName && (
                <p className="text-error text-sm mt-1">
                  {errors?.lastName}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Date of Birth *
              </label>

              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData?.dateOfBirth}
                onChange={handleChange}
                max={getTodayDate()}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.dateOfBirth
                  ? 'border-error'
                  : 'border-border'
                  }`}
              />

              {errors?.dateOfBirth && (
                <p className="text-error text-sm mt-1">
                  {errors?.dateOfBirth}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Phone Number *
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.phone
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="Enter your contact number"
              />

              {errors?.phone && (
                <p className="text-error text-sm mt-1">
                  {errors?.phone}
                </p>
              )}
            </div>

            {/* New / Existing Patient */}
            <div>
              <label
                htmlFor="isNewPatient"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Are you a new patient? *
              </label>

              <select
                id="isNewPatient"
                name="isNewPatient"
                value={formData?.isNewPatient}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="yes">
                  Yes, I am a new patient
                </option>

                <option value="no">
                  No, I am an existing patient
                </option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2 - APPOINTMENT DETAILS                             */}
      {/* ========================================================= */}

      {currentStep === 2 && (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">
            Appointment Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Treatment */}
            <div className="md:col-span-2">
              <label
                htmlFor="treatmentType"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Treatment Type *
              </label>

              <select
                id="treatmentType"
                name="treatmentType"
                value={formData?.treatmentType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.treatmentType
                  ? 'border-error'
                  : 'border-border'
                  }`}
              >
                <option value="">
                  Select treatment type
                </option>

                {treatmentTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {errors?.treatmentType && (
                <p className="text-error text-sm mt-1">
                  {errors?.treatmentType}
                </p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Preferred Date *
              </label>

              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData?.preferredDate}
                onChange={handleChange}
                min={getTodayDate()}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.preferredDate
                  ? 'border-error'
                  : 'border-border'
                  }`}
              />

              {errors?.preferredDate && (
                <p className="text-error text-sm mt-1">
                  {errors?.preferredDate}
                </p>
              )}

              <p className="text-xs text-text-secondary mt-2">
                Clinic hours are 10:00 AM–8:00 PM. Friday hours are
                10:00 AM–12:00 PM.
              </p>
            </div>

            {/* Preferred Time */}
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Preferred Time *
              </label>

              <select
                id="preferredTime"
                name="preferredTime"
                value={formData?.preferredTime}
                onChange={handleChange}
                disabled={
                  !formData?.preferredDate ||
                  loadingSlots ||
                  availableSlots.length === 0
                }
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 disabled:bg-muted disabled:cursor-not-allowed ${errors?.preferredTime
                  ? 'border-error'
                  : 'border-border'
                  }`}
              >
                <option value="">
                  {!formData?.preferredDate
                    ? 'Select a date first'
                    : loadingSlots
                      ? 'Loading available times...'
                      : availableSlots.length === 0
                        ? 'No slots available'
                        : 'Select time slot'}
                </option>

                {availableSlots?.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>

              {loadingSlots && (
                <div className="flex items-center gap-2 mt-2 text-sm text-text-secondary">
                  <Icon
                    name="ArrowPathIcon"
                    size={16}
                    variant="outline"
                    className="animate-spin"
                  />

                  <span>
                    Checking available appointment times...
                  </span>
                </div>
              )}

              {!loadingSlots &&
                formData?.preferredDate &&
                availableSlots.length === 0 &&
                !slotError && (
                  <p className="text-sm text-text-secondary mt-2">
                    No appointment slots are currently available for
                    this date. Please choose another date.
                  </p>
                )}

              {slotError && (
                <p className="text-error text-sm mt-2">
                  {slotError}
                </p>
              )}

              {errors?.preferredTime && (
                <p className="text-error text-sm mt-1">
                  {errors?.preferredTime}
                </p>
              )}
            </div>

            {/* Reason for Visit */}
            <div className="md:col-span-2">
              <label
                htmlFor="reasonForVisit"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Reason for Visit *
              </label>

              <textarea
                id="reasonForVisit"
                name="reasonForVisit"
                value={formData?.reasonForVisit}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.reasonForVisit
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="Please describe your dental concern or reason for visit"
              />

              {errors?.reasonForVisit && (
                <p className="text-error text-sm mt-1">
                  {errors?.reasonForVisit}
                </p>
              )}
            </div>

            {/* Pain Level */}
            <div className="md:col-span-2">
              <label
                htmlFor="painLevel"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Current Pain Level: {formData?.painLevel}/10
              </label>

              <input
                type="range"
                id="painLevel"
                name="painLevel"
                min="0"
                max="10"
                value={formData?.painLevel}
                onChange={handleChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />

              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>No Pain</span>
                <span>Severe Pain</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3 - MEDICAL & INSURANCE                             */}
      {/* ========================================================= */}

      {currentStep === 3 && (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">
            Medical & Insurance Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Insurance Provider */}
            <div>
              <label
                htmlFor="insuranceProvider"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Insurance Provider
              </label>

              <select
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData?.insuranceProvider}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="">
                  Select insurance provider
                </option>

                {insuranceProviders?.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Number */}
            <div>
              <label
                htmlFor="policyNumber"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Policy Number
              </label>

              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                value={formData?.policyNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Enter policy number"
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Emergency Contact Name *
              </label>

              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData?.emergencyContact}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.emergencyContact
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="Emergency contact name"
              />

              {errors?.emergencyContact && (
                <p className="text-error text-sm mt-1">
                  {errors?.emergencyContact}
                </p>
              )}
            </div>

            {/* Emergency Phone */}
            <div>
              <label
                htmlFor="emergencyPhone"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Emergency Contact Phone *
              </label>

              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData?.emergencyPhone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors?.emergencyPhone
                  ? 'border-error'
                  : 'border-border'
                  }`}
                placeholder="98765 43210"
              />

              {errors?.emergencyPhone && (
                <p className="text-error text-sm mt-1">
                  {errors?.emergencyPhone}
                </p>
              )}
            </div>

            {/* Medical Conditions */}
            <div className="md:col-span-2">
              <label
                htmlFor="medicalConditions"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Medical Conditions
              </label>

              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData?.medicalConditions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="List any medical conditions (e.g., diabetes, heart disease, etc.)"
              />
            </div>

            {/* Current Medications */}
            <div className="md:col-span-2">
              <label
                htmlFor="currentMedications"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Current Medications
              </label>

              <textarea
                id="currentMedications"
                name="currentMedications"
                value={formData?.currentMedications}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="List any medications you are currently taking"
              />
            </div>

            {/* Allergies */}
            <div className="md:col-span-2">
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Allergies
              </label>

              <textarea
                id="allergies"
                name="allergies"
                value={formData?.allergies}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="List any allergies (medications, latex, etc.)"
              />
            </div>

            {/* Previous Dental Work */}
            <div className="md:col-span-2">
              <label
                htmlFor="previousDentalWork"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Previous Dental Work
              </label>

              <textarea
                id="previousDentalWork"
                name="previousDentalWork"
                value={formData?.previousDentalWork}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Describe any previous dental procedures or treatments"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4 - REVIEW                                           */}
      {/* ========================================================= */}

      {currentStep === 4 && (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">
            Review & Request Appointment
          </h3>

          <div className="bg-muted rounded-lg p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <p className="text-sm text-text-secondary">
                  Patient Name
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.firstName} {formData?.lastName}
                </p>
              </div>

              {/* DOB */}
              <div>
                <p className="text-sm text-text-secondary">
                  Date of Birth
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.dateOfBirth}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-text-secondary">
                  Phone
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.phone}
                </p>
              </div>

              {/* Patient Type */}
              <div>
                <p className="text-sm text-text-secondary">
                  Patient Type
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.isNewPatient === 'yes'
                    ? 'New Patient'
                    : 'Existing Patient'}
                </p>
              </div>

              {/* Treatment */}
              <div>
                <p className="text-sm text-text-secondary">
                  Treatment Type
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.treatmentType}
                </p>
              </div>

              {/* Appointment */}
              <div>
                <p className="text-sm text-text-secondary">
                  Appointment Date & Time
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.preferredDate} at{' '}
                  {formatTime(formData?.preferredTime)}
                </p>
              </div>

              {/* Reason */}
              <div className="md:col-span-2">
                <p className="text-sm text-text-secondary">
                  Reason for Visit
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.reasonForVisit}
                </p>
              </div>

              {/* Insurance */}
              {formData?.insuranceProvider && (
                <div>
                  <p className="text-sm text-text-secondary">
                    Insurance Provider
                  </p>

                  <p className="text-base font-medium text-text-primary">
                    {formData?.insuranceProvider}
                  </p>
                </div>
              )}

              {/* Emergency Contact */}
              <div>
                <p className="text-sm text-text-secondary">
                  Emergency Contact
                </p>

                <p className="text-base font-medium text-text-primary">
                  {formData?.emergencyContact} -{' '}
                  {formData?.emergencyPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Information */}
          <div className="bg-accent/10 border border-accent rounded-lg p-4 md:p-6">
            <div className="flex items-start space-x-3">
              <Icon
                name="InformationCircleIcon"
                size={24}
                variant="solid"
                className="text-accent flex-shrink-0 mt-1"
              />

              <div className="flex-1">
                <h4 className="text-base font-semibold text-text-primary mb-2">
                  Appointment Request Information
                </h4>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Each appointment slot is 15 minutes.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      This is an appointment request, not an immediate
                      confirmation.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Singh Dental Clinic staff will review your
                      request and confirm the appointment.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Appointment updates and confirmation will be
                      shared with you through WhatsApp.
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Please arrive approximately 15 minutes before
                      your confirmed appointment.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData?.agreeToTerms}
              onChange={handleChange}
              className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
            />

            <label
              htmlFor="agreeToTerms"
              className="text-sm text-text-secondary"
            >
              I agree to the terms and conditions, privacy policy,
              and consent to treatment. I understand that this
              appointment request is subject to confirmation by
              Singh Dental Clinic staff.
            </label>
          </div>

          {errors?.agreeToTerms && (
            <p className="text-error text-sm">
              {errors?.agreeToTerms}
            </p>
          )}

          {/* How did you hear about us */}
          <div>
            <label
              htmlFor="hearAboutUs"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              How did you hear about us?
            </label>

            <select
              id="hearAboutUs"
              name="hearAboutUs"
              value={formData?.hearAboutUs}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              <option value="">
                Select an option
              </option>

              <option value="google">
                Google Search
              </option>

              <option value="social">
                Social Media
              </option>

              <option value="referral">
                Friend/Family Referral
              </option>

              <option value="advertisement">
                Advertisement
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* NAVIGATION BUTTONS                                        */}
      {/* ========================================================= */}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 md:mt-12">
        {/* Previous */}
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 border border-border text-text-primary font-medium rounded-md hover:bg-muted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        )}

        {/* Next */}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={
              currentStep === 2 &&
              (!formData?.preferredDate ||
                loadingSlots ||
                availableSlots.length === 0)
            }
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            Next Step
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-conversion text-conversion-foreground font-semibold rounded-md hover:bg-conversion/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Icon
                  name="ArrowPathIcon"
                  size={20}
                  variant="outline"
                  className="animate-spin"
                />

                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <span>Request Appointment</span>

                <Icon
                  name="CheckCircleIcon"
                  size={20}
                  variant="solid"
                />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

AppointmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};