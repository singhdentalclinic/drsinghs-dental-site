'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';

export default function NextPageButton({ href, children }) {
  return (
    <>
      <Link href={href} className="button">
        <span>{children}</span>
        <span className="arrow-wrapper">
          <span className="arrow" />
        </span>
      </Link>
      <style jsx global>{`
        .button {
          --primary-color: #2596be;
          --secondary-color: #fff;
          --hover-color: #fca232;
          --arrow-width: 10px;
          --arrow-stroke: 2px;

          box-sizing: border-box;
          border: 0;
          border-radius: 20px;
          color: var(--secondary-color);
          padding: 1em 1.8em;
          background: var(--primary-color);

          display: inline-flex;
          align-items: center;
          gap: 0.6em;

          font-weight: 700;
          transition: background 0.2s ease;
          text-decoration: none;
        }

        .arrow-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .arrow {
          margin-top: 1px;
          width: var(--arrow-width);
          background: var(--primary-color);
          height: var(--arrow-stroke);
          position: relative;
          transition: 0.2s;
        }

        .arrow::before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          border: solid var(--secondary-color);
          border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
          display: inline-block;
          top: -3px;
          right: 3px;
          padding: 3px;
          transform: rotate(-45deg);
          transition: 0.2s;
        }

        .button:hover {
          background-color: var(--hover-color);
        }

        .button:hover .arrow {
          background: var(--secondary-color);
        }

        .button:hover .arrow::before {
          right: 0;
        }
      `}</style>
    </>
  );
}

NextPageButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
