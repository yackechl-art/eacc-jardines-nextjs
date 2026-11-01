'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
type Photo = { src: string; caption: string };
type SiteState = { service: string; setService: (service: string) => void; openPhoto: (photo: Photo) => void };
const SiteContext = createContext<SiteState | null>(null);
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('SiteProvider is required.');
  return context;
}
export function SiteProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState('');
  const [photo, setPhoto] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (photo && !dialog.current?.open) dialog.current?.showModal(); }, [photo]);
  function close() { dialog.current?.close(); setPhoto(null); }
  function onBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const r = event.currentTarget.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
  }
  return <SiteContext.Provider value={{ service, setService, openPhoto: setPhoto }}>
    {children}
    <dialog ref={dialog} id="photo-dialog" aria-label="Fotografía del proyecto" onClose={() => setPhoto(null)} onClick={onBackdrop}>
      <button className="close-dialog" onClick={close} aria-label="Cerrar imagen">✕</button>
      {photo && <><img id="dialog-img" src={photo.src} alt={photo.caption} /><p id="dialog-caption">{photo.caption}</p></>}
    </dialog>
  </SiteContext.Provider>;
}
export function PhotoButton({ src, caption, className, children, label }: { src: string; caption: string; className?: string; children: ReactNode; label?: string }) {
  const { openPhoto } = useSite();
  return <button type="button" className={className} aria-label={label} onClick={() => openPhoto({ src, caption })}>{children}</button>;
}
export function ServiceLink({ service }: { service: string }) {
  const { setService } = useSite();
  return <a href="#contacto" onClick={() => setService(service)}>Solicitar presupuesto <span>↗</span></a>;
}
