export const PHONE = "34663318795";
export const DISPLAY_PHONE = "663 318 795";
export const CONTACT_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hola, EACC Jardines. Me gustaría consultar un trabajo y solicitar presupuesto.")}`;
type Labels = {
  messageHello: string;
  messageService: string;
  messagePlace: string;
  messageDetails: string;
  formError: string;
  settings?: { phone: string };
};
export function buildWhatsAppUrl(
  service: string,
  place: string,
  details = "",
  labels?: Labels,
) {
  if (!service.trim() || !place.trim())
    throw new Error(
      labels?.formError ||
        "Selecciona un servicio e indica la localidad y provincia.",
    );
  const message = `${labels?.messageHello || "Hola, EACC Jardines. Me gustaría pedir un presupuesto sin compromiso."}\n\n${labels?.messageService || "Servicio"}: ${service.trim()}\n${labels?.messagePlace || "Localidad"}: ${place.trim()}${details.trim() ? "\n" + (labels?.messageDetails || "Detalles") + ": " + details.trim() : ""}`;
  return `https://wa.me/${labels?.settings?.phone || PHONE}?text=${encodeURIComponent(message)}`;
}
