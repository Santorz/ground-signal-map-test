/*eslint import/no-unresolved: 2*/

import { FC, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export const FallbackImage: FC<ImageProps> = ({ src, alt, ...rest }) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : '/location-not-found.png'}
      onError={() => {
        setImgSrc(
          'https://images.placeholders.dev/?width=140&height=140&text=Broken'
        );
      }}
    />
  );
};
