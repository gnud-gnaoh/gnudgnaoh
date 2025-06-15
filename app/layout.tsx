import '/app/global.css';
import Header from '../components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: 'favicon.ico'
  }
} 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
