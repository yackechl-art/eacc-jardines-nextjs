const originals = Array.from({ length: 10 }, (_, i) => `/assets/service-original-${i + 1}.webp`);

export function ServiceResult({ alt, index }: { src: string; alt: string; index: number }) {
  return (
    <span style={{ display: "block", position: "relative", width: "100%" }}>
      <img src={originals[index]} alt={alt} loading="lazy"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain" }} />
      {index !== 3 && (
        <img src="/assets/logo.png" alt="" aria-hidden="true"
          style={{ position: "absolute", top: "12px", right: "12px", width: "23%", height: "auto", padding: "4px", background: "white", borderRadius: "3px" }} />
      )}
    </span>
  );
}
