import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  loading?: 'eager' | 'lazy';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  objectPosition = 'center center',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1A3A2A] via-[#2C4E3B] to-[#5C4033] text-[#FAF7F2] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sprout className="w-8 h-8 mb-2 opacity-80" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide opacity-90 max-w-[22ch] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
};
