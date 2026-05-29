import { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: 'SBK AntiRaid Dashboard',
  description: 'Dashboard avanzada para proteger servidores de Discord',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
