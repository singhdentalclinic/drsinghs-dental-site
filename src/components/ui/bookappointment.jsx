'use client';

export default function BookAppointmentButton({
  onClick,
  disabled = false,
  children = 'Book Appointment',
  bgColor = '#f59e0b',
  shadowColor = '#73540a',
  className = '',
}) {
  return (
    <button
      className={`cursor-pointer transition-all text-white px-4 py-1.5 rounded-xl border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-[15px] font-bold ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      style={{
        backgroundColor: bgColor,
        borderColor: shadowColor,
      }}
    >
      {children}
    </button>
  );
}
