'use client';

export default function ArrowButton({ onClick, ariaLabel = 'Next' }) {
  return (
    <>
      <button type="button" aria-label={ariaLabel} onClick={onClick} className="arrow-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="arrow-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>

      <style jsx>{`
        .arrow-btn {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          display: flex;
          align-items: center;
          justify-content: center;

          color: #000000;
          cursor: pointer;

          transition:
            background 0.4s ease,
            box-shadow 0.4s ease,
            transform 0.3s ease;
        }

        .arrow-btn:hover {
          transform: translateY(-1px);
        }

        .arrow-icon {
          width: 1.2rem;
          height: 1.2rem;
          transition: transform 0.4s ease;
        }

        .arrow-btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Accessibility */
        .arrow-btn:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 3px rgba(255, 255, 255, 0.35),
            0 0 18px rgba(1, 1, 1, 0.6);
        }
      `}</style>
    </>
  );
}
