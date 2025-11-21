import { useMemo, useState } from "react";
import { optimizeCloudinary } from "@/lib/cloudinary";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function BlurImage({ src, alt, className }: Props) {
  const [loaded, setLoaded] = useState(false);
  const optimizedSrc = useMemo(() => optimizeCloudinary(src), [src]);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        filter: loaded
          ? "blur(0px)"
          : "blur(14px) brightness(1.05) saturate(1.1)",
        opacity: loaded ? 1 : 0,
        transition: ".3s ease-out, opacity .3s ease-out",
      }}
    />
  );
}
