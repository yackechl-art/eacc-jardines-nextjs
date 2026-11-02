"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ServiceResult } from "./service-result";
type Photo = { src: string; caption: string; serviceResult?: number };
type SiteState = {
  service: string;
  setService: (s: string) => void;
  openPhoto: (p: Photo) => void;
  d: Dictionary;
  locale: Locale;
};
const SiteContext = createContext<SiteState | null>(null);
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("SiteProvider is required.");
  return context;
}
export function SiteProvider({
  children,
  d,
  locale,
}: {
  children: ReactNode;
  d: Dictionary;
  locale: Locale;
}) {
  const [service, setService] = useState(""),
    [photo, setPhoto] = useState<Photo | null>(null),
    dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (photo && !dialog.current?.open) dialog.current?.showModal();
  }, [photo]);
  function close() {
    dialog.current?.close();
    setPhoto(null);
  }
  function backdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target !== e.currentTarget) return;
    const r = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      close();
  }
  return (
    <SiteContext.Provider
      value={{ service, setService, openPhoto: setPhoto, d, locale }}
    >
      {children}
      <dialog
        ref={dialog}
        id="photo-dialog"
        aria-label={d.enlarge}
        onClose={() => setPhoto(null)}
        onClick={backdrop}
      >
        <button className="close-dialog" onClick={close} aria-label={d.close}>
          ✕
        </button>
        {photo && (
          <>
            {photo.serviceResult === undefined ? (
              <img id="dialog-img" src={photo.src} alt={photo.caption} />
            ) : (
              <ServiceResult src={photo.src} alt={photo.caption} index={photo.serviceResult} />
            )}
            <p>{photo.caption}</p>
          </>
        )}
      </dialog>
    </SiteContext.Provider>
  );
}
export function PhotoButton({
  src,
  caption,
  className,
  children,
  label,
  serviceResult,
}: {
  src: string;
  caption: string;
  className?: string;
  children: ReactNode;
  label?: string;
  serviceResult?: number;
}) {
  const { openPhoto } = useSite();
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => openPhoto({ src, caption, serviceResult })}
    >
      {children}
    </button>
  );
}
