import '/app/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'SilkRemington', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}