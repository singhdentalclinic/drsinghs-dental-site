import { forwardRef } from 'react';

const SEGMENT_WIDTH = 800;
const WAVE_HEIGHT = 120;
const CENTER_Y = 150;
const PADDING_SEGMENTS = 2; // Extra segments to fill screen width left/right

const TimelinePath = forwardRef(({ milestoneCount, ballRef }, pathRef) => {
  const totalSegments = milestoneCount + PADDING_SEGMENTS * 2;
  const totalWidth = totalSegments * SEGMENT_WIDTH;

  let d = `M 0 ${CENTER_Y}`;
  for (let i = 0; i < totalSegments; i++) {
    const midX = i * SEGMENT_WIDTH + SEGMENT_WIDTH / 2;
    const endX = (i + 1) * SEGMENT_WIDTH;

    // Pattern: Peak, Trough... consistent across all segments
    const controlY = i % 2 === 0 ? CENTER_Y - WAVE_HEIGHT : CENTER_Y + WAVE_HEIGHT;

    d += ` Q ${midX} ${controlY} ${endX} ${CENTER_Y}`;
  }

  return (
    <svg
      width={totalWidth}
      height="300"
      viewBox={`0 0 ${totalWidth} 300`}
      className="absolute top-1/2 -translate-y-1/2 overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Shadow Rail */}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.05"
        strokeWidth="50"
        strokeLinecap="round"
        className="text-primary"
      />

      {/* Background Track Rail */}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="40"
        strokeLinecap="round"
        className="text-primary"
      />

      {/* Glowing Progress Path */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        className="text-primary"
      />

      {/* Animated Ball */}
      <circle ref={ballRef} r="18" fill="currentColor" className="text-primary drop-shadow-xl" />
    </svg>
  );
});

TimelinePath.displayName = 'TimelinePath';
export default TimelinePath;
