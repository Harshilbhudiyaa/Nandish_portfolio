import { useEffect, useState } from "react";

export default function ArtworkImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  fit = "cover",
  ambient = false,
  priority = false,
  objectPosition = "center",
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={`artwork-image relative overflow-hidden ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 bg-[#20211f] transition-opacity duration-500 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="artwork-shimmer absolute inset-0" />
        <div className="absolute left-4 top-4 h-px w-16 bg-white/20" />
        <div className="absolute bottom-4 right-4 h-px w-10 bg-white/15" />
      </div>

      {ambient && !failed && (
        <img src={src} alt="" aria-hidden="true" loading={priority ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 h-full w-full scale-110 object-cover blur-2xl transition-opacity duration-500 ${loaded ? "opacity-35" : "opacity-0"}`} style={{ objectPosition }} />
      )}

      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setFailed(true); setLoaded(true); }}
          className={`relative z-[1] h-full w-full ${fitClass} transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"} ${imageClassName}`}
          style={{ objectPosition }}
        />
      ) : (
        <div className="absolute inset-0 z-[2] flex items-center justify-center bg-ink px-6 text-center text-white">
          <div><p className="spec-label text-acid">Artwork unavailable</p><p className="mt-3 text-sm text-white/45">The project image could not be displayed.</p></div>
        </div>
      )}
    </div>
  );
}
