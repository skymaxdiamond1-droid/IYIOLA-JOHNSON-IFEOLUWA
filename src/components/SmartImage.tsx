import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
}

export function SmartImage({ src, alt, className = '', objectPosition }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE2DC] via-[#FAF8F5] to-[#E5D9CF] text-[#3B2820]/70 p-4 text-center ${className}`}
      >
        <ShoppingBag className="w-7 h-7 mb-2 text-[#C5A059]" strokeWidth={1.5} />
        <span className="font-serif text-xs tracking-wide text-[#3B2820]/80 max-w-[180px] leading-snug">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={objectPosition ? { objectPosition } : undefined}
      className={className}
    />
  );
}
