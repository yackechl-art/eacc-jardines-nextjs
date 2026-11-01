export const PHONE = '34663318795';
export const DISPLAY_PHONE = '663 318 795';
export const CONTACT_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, EACC Jardines. Me gustaría consultar un trabajo y solicitar presupuesto.')}`;
export function buildWhatsAppUrl(service: string, place: string, details = ''): string {
  if (!service.trim() || !place.trim()) throw new Error('Selecciona un servicio e indica la localidad y provincia.');
  const message = `Hola, EACC Jardines. Me gustaría pedir un presupuesto sin compromiso.\n\nServicio: ${service.trim()}\nLocalidad: ${place.trim()}${details.trim() ? '\nDetalles: ' + details.trim() : ''}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
