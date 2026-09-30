'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PhoneLogin() {
  const supabase = createClient();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    setLoading(true);
    setMessage('');

    const normalizedPhone = phone.startsWith('+')
      ? phone
      : `+91${phone.replace(/\D/g, '')}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: normalizedPhone,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    setOtpSent(true);
    setMessage('OTP sent successfully.');
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage('');

    const normalizedPhone = phone.startsWith('+')
      ? phone
      : `+91${phone.replace(/\D/g, '')}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: normalizedPhone,
      token: otp,
      type: 'sms',
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    console.log('Authenticated user:', data.user);

    setMessage('Phone verified successfully.');
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Mobile Number
        </label>

        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your mobile number"
          className="w-full px-4 py-3 border border-border rounded-md"
        />
      </div>

      {!otpSent ? (
        <button
          type="button"
          onClick={sendOtp}
          disabled={loading || !phone}
          className="w-full px-6 py-3 bg-primary text-white rounded-md disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      ) : (
        <>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ''))
              }
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-border rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={verifyOtp}
            disabled={loading || otp.length !== 6}
            className="w-full px-6 py-3 bg-primary text-white rounded-md disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {message && (
        <p className="text-sm text-text-secondary">
          {message}
        </p>
      )}
    </div>
  );
}