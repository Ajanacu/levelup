import './globals.css'

export const metadata = {
  title: 'LevelUp — Gamified Career Growth',
  description: 'Upload your resume, take skill tests, unlock levels, and reach your dream role.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
