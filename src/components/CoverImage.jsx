import { useState } from 'react';

export default function CoverImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-slate-200 text-sm font-semibold text-slate-500 ${className}`} role="img" aria-label={`${alt} placeholder`}>
        TESO POST
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
