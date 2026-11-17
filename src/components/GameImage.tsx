import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface GameImageProps {
  src?: string | null;
  alt: string;
  title: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
}

export default function GameImage({
  src,
  alt,
  title,
  className = '',
  aspectClassName = 'aspect-[3/4]',
  priority = false,
}: GameImageProps) {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={`relative overflow-hidden bg-[#130D20] ${aspectClassName} ${className}`}
    >
      {failed || !src ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1A1229] via-[#130D20] to-[#0B0712] p-5 text-center"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C084FC]/20 bg-[#9333EA]/15 text-[#C084FC]">
            <Gamepad2 className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <span className="line-clamp-2 font-display text-sm font-semibold text-white">
            {title}
          </span>
          <span className="mt-1 text-xs text-[#A99BBE]">PC Cover Art</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out"
        />
      )}
    </div>
  );
}
