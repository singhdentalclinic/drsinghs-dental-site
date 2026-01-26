'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const getVideoDetails = (url) => {
    if (!url) return { embedUrl: '', isShorts: false };

    // Handle YouTube Shorts
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('shorts/')[1]?.split('?')[0];
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
        isShorts: true,
      };
    }

    // Handle standard YouTube URLs
    if (url.includes('youtube.com/watch')) {
      const videoId = new URLSearchParams(new URL(url).search).get('v');
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
        isShorts: false,
      };
    }

    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
        isShorts: false,
      };
    }

    return { embedUrl: url, isShorts: false };
  };

  const { embedUrl, isShorts } = getVideoDetails(videoUrl);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close modal" />

      <div
        className={`relative w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 ${
          isShorts ? 'max-w-[400px] aspect-[9/16]' : 'max-w-4xl aspect-video'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close video"
        >
          <Icon name="XMarkIcon" size={24} variant="outline" className="text-white" />
        </button>

        {embedUrl.startsWith('/assets/') ||
        embedUrl.startsWith('/img/') ||
        embedUrl.endsWith('.mp4') ? (
          <video src={embedUrl} className="w-full h-full" controls autoPlay playsInline />
        ) : (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>,
    document.body
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string,
};
