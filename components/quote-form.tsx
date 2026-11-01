'use client';
import { useState, type FormEvent } from 'react';
import content from '@/data/content.json';
import { useSite } from './site-provider';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
export function QuoteForm() {
  const { service, setService } = useSite();
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const url = buildWhatsAppUrl(service, String(form.get('place') || ''), String(form.get('details') || ''));
      setError('');
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) { setError(error instanceof Error ? error.message : 'Revisa los datos de tu consulta.'); }
  }
  return <form id="quote-form" onSubmit={submit}>
    <h3>¿Qué necesita tu espacio?</h3><p>Prepara tu consulta y envíanosla por WhatsApp.</p>
    <label htmlFor="service">Servicio</label>
    <select id="service" name="service" required value={service} onChange={event => setService(event.target.value)}><option value="">Selecciona un servicio</option>{content.services.map(item => <option key={item.title}>{item.title}</option>)}</select>
    <label htmlFor="place">Localidad y provincia</label><input id="place" name="place" placeholder="Indícanos la localidad y provincia del trabajo" maxLength={120} required onChange={() => setError('')} />
    <label htmlFor="details">Cuéntanos un poco más <span>(opcional)</span></label><textarea id="details" name="details" rows={3} maxLength={1500} placeholder="Describe brevemente el trabajo que necesitas realizar, las características del espacio o cualquier detalle que consideres importante" />
    {error && <p role="alert">{error}</p>}
    <button className="button" type="submit">Continuar por WhatsApp <span>↗</span></button>
    <p className="form-note">Se abrirá WhatsApp con tu mensaje preparado. Tú decides cuándo enviarlo. Estos datos no se guardan en esta web.</p>
  </form>;
}
