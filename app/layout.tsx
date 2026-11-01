import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Zonas verdes en manos expertas | EACC Jardines',
  description: 'Servicios integrales de jardinería y acondicionamiento de terrenos. Césped, riego, podas, talas, desbroces y plantaciones. Desde Sevilla, cobertura nacional. EACC Jardines.',
  icons: { icon: '/assets/logo.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
