/**
 * Simple fallback image preview component
 * Use this if the main canvas isn't showing images
 */

"use client";

import React from 'react';

interface SimpleImagePreviewProps {
  image: string;
  onReady?: () => void;
}

export function SimpleImagePreview({ image, onReady }: SimpleImagePreviewProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    console.log('SimpleImagePreview: Image URL received:', image?.substring(0, 50) + '...');
  }, [image]);

  const handleLoad = () => {
    console.log('SimpleImagePreview: Image loaded successfully');
    setLoaded(true);
    onReady?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('SimpleImagePreview: Image failed to load:', e);
    setError('Failed to load image');
  };

  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
      {error ? (
        <div className="text-red-500 p-4">
          <p>❌ {error}</p>
          <p className="text-sm mt-2">Try a different image or format</p>
        </div>
      ) : !loaded ? (
        <div className="text-white p-4">
          <p>Loading image...</p>
          <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mt-2 mx-auto" />
        </div>
      ) : (
        <img
          src={image}
          alt="Preview"
          className="max-w-full max-h-full object-contain"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
