'use client';

import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ContactForm({ inquiryTypes }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email is now optional, but validate format if present
    if (formData?.email?.trim() && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData?.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevation-md overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Column - Image */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image
              src="/assets/images/telephone.png"
              alt="Contact Us"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 1800vw, 500vw"
              priority
              quality={100}
            />
          </div>

          {/* Right Column - Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="font-headline text-3xl font-bold text-text-primary mb-2">
                Get in Touch
              </h2>
              <p className="font-body text-text-secondary">
                Have a question or need an appointment? Fill out the form below and we&apos;ll be
                happy to assist you.
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 bg-success/10 border border-success rounded-lg p-4 flex items-start gap-3">
                <Icon
                  name="CheckCircleIcon"
                  size={24}
                  variant="solid"
                  className="text-success flex-shrink-0"
                />
                <div>
                  <h3 className="font-cta text-base font-semibold text-success mb-1">
                    Message Sent!
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    We&apos;ll respond to your inquiry within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-body text-sm font-medium text-text-primary mb-1.5"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors?.name ? 'border-destructive' : 'border-input'
                  } rounded-md font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-gray-50`}
                  placeholder="Enter your full name"
                />
                {errors?.name && <p className="mt-1 text-xs text-destructive">{errors?.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm font-medium text-text-primary mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors?.email ? 'border-destructive' : 'border-input'
                  } rounded-md font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-gray-50`}
                  placeholder="your.email@example.com (Optional)"
                />
                {errors?.email && <p className="mt-1 text-xs text-destructive">{errors?.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-body text-sm font-medium text-text-primary mb-1.5"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors?.phone ? 'border-destructive' : 'border-input'
                    } rounded-md font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-gray-50`}
                    placeholder="Enter your phone number"
                  />
                  {errors?.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors?.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block font-body text-sm font-medium text-text-primary mb-1.5"
                  >
                    Inquiry Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData?.inquiryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors?.inquiryType ? 'border-destructive' : 'border-input'
                    } rounded-md font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-gray-50`}
                  >
                    <option value="">Select type</option>
                    {inquiryTypes?.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors?.inquiryType && (
                    <p className="mt-1 text-xs text-destructive">{errors?.inquiryType}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-sm font-medium text-text-primary mb-1.5"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData?.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 border ${
                    errors?.message ? 'border-destructive' : 'border-input'
                  } rounded-md font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none bg-gray-50`}
                  placeholder="Your message..."
                />
                {errors?.message && (
                  <p className="mt-1 text-xs text-destructive">{errors?.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-cta text-base font-semibold rounded-md shadow-elevation-sm hover:shadow-elevation-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon
                      name="ArrowPathIcon"
                      size={20}
                      variant="outline"
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon name="PaperAirplaneIcon" size={20} variant="solid" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

ContactForm.propTypes = {
  inquiryTypes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
};
