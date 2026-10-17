import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Small Finice - Customer & Finance Portal',
  description: 'Mobile finance customer management app with customer list, real-time search, status filtering, and loan details.',
  openGraph: {
    title: 'Small Finice - Customer & Finance Portal',
    description: 'Mobile finance customer management app with customer list, real-time search, status filtering, and loan details.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small Finice - Customer & Finance Portal',
    description: 'Mobile finance customer management app with customer list, real-time search, status filtering, and loan details.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
