import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface BotanicalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export const BotanicalImage: React.FC<BotanicalImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-[#1e2f26] text-[#F7F3EB] flex flex-col items-center justify-center p-6 text-center border border-[#B69A68]/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full border border-[#B69A68]/40 flex items-center justify-center mb-2">
          <Sparkles className="w-5 h-5 text-[#B69A68]" />
        </div>
        <span className="font-serif text-lg tracking-wider text-[#F7F3EB] block">
          {fallbackTitle || alt}
        </span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#A6AD98] mt-1">
          Botanical Parfumée
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#ECE5D8] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#20382D]/20 border-t-[#20382D] rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
