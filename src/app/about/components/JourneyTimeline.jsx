'use client';

import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Icon from '@/components/ui/AppIcon';
import TimelinePath from './TimelinePath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const SEGMENT_WIDTH = 800;
const PADDING_SEGMENTS = 2; // Must match TimelinePath.jsx

export default function JourneyTimeline({ milestones }) {
  const triggerRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);
  const ballRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const path = pathRef.current;
      const ball = ballRef.current;

      const pathLength = path.getTotalLength();
      const totalWidth = (milestones.length + PADDING_SEGMENTS * 2) * SEGMENT_WIDTH;

      // STARTING POINT: Center of the first milestone segment (after padding)
      const firstMilestoneX = PADDING_SEGMENTS * SEGMENT_WIDTH + SEGMENT_WIDTH / 2;
      const initialTrackX = window.innerWidth / 2 - firstMilestoneX;

      // Initialize track position
      gsap.set(track, { x: initialTrackX });

      // Initialize path drawing
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // PROGRESS AT START: Path should be drawn up to the first milestone immediately
      const startDrawProgress = firstMilestoneX / totalWidth;
      gsap.set(path, {
        strokeDashoffset: pathLength * (1 - startDrawProgress),
      });

      // Initialize ball position
      gsap.set(ball, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: startDrawProgress,
          end: startDrawProgress,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${milestones.length * 800}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / milestones.length,
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
            ease: 'power2.inOut',
            inertia: false,
          },
        },
      });

      milestones.forEach((_, i) => {
        // Target center for current milestone i
        const currentMidX = (PADDING_SEGMENTS + i) * SEGMENT_WIDTH + SEGMENT_WIDTH / 2;
        const targetTrackX = window.innerWidth / 2 - currentMidX;
        const currentProgress = currentMidX / totalWidth;

        // Start center (either first milestone or previous one)
        const prevMidX =
          i === 0
            ? firstMilestoneX
            : (PADDING_SEGMENTS + i - 1) * SEGMENT_WIDTH + SEGMENT_WIDTH / 2;
        const startProgress = prevMidX / totalWidth;

        // Move track, Draw path, and Move ball concurrently
        tl.to(
          track,
          {
            x: targetTrackX,
            ease: 'power2.inOut',
            duration: 1,
          },
          i
        );

        tl.to(
          path,
          {
            strokeDashoffset: pathLength * (1 - currentProgress),
            ease: 'power2.inOut',
            duration: 1,
          },
          i
        );

        tl.to(
          ball,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              start: startProgress,
              end: currentProgress,
            },
            ease: 'power2.inOut',
            duration: 1,
          },
          i
        );

        // Sticky pause
        tl.to({}, { duration: 1 }, i + 0.5);
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [milestones]);

  return (
    <section className="bg-muted relative">
      <div ref={triggerRef} className="h-screen overflow-hidden relative flex items-center">
        <div className="absolute top-[8%] left-0 w-full text-center z-20 pointer-events-none px-4">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-2 md:mb-4">
            A Journey of Excellence
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            Two decades of dedication to transforming smiles and lives across Uttarakhand
          </p>
        </div>

        <div ref={trackRef} className="relative h-full w-max flex items-center">
          {/* WAVE */}
          <TimelinePath ref={pathRef} ballRef={ballRef} milestoneCount={milestones.length} />

          {/* MILESTONES */}
          {milestones.map((m, i) => {
            // Milestone X center shifted by padding
            const x = (PADDING_SEGMENTS + i) * SEGMENT_WIDTH + SEGMENT_WIDTH / 2;
            const yOffset = i % 2 === 0 ? -120 : 120;

            return (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{
                  left: x,
                  top: '50%',
                  transform: `translate(-50%, ${yOffset}px)`,
                }}
              >
                <div className="bg-white p-6 rounded-lg shadow-elevation-md w-[320px] md:w-[380px] text-center">
                  <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/5 rounded-full">
                    {m.year}
                  </span>
                  <h3 className="mt-3 text-lg md:text-xl font-semibold text-text-primary">
                    {m.title}
                  </h3>
                  <p className="text-sm mt-3 text-text-secondary leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <Icon name={m.icon} size={20} variant="solid" className="text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

JourneyTimeline.propTypes = {
  milestones: PropTypes.array.isRequired,
};
