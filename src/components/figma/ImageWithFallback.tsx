import React, { useState } from 'react';

const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDNWMjFIMTVWM0gyMVpNMyAzSDlWMjFIM1YzWk0xMSA5SDE5VjE1SDExVjlaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==';

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`flex items-center justify-center w-full h-full ${className ?? ''}`}
      style={style}
    >
      <img src={ERROR_IMG_SRC} alt={alt} className="text-center align-middle" {...rest} data-original-url={src} />
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}