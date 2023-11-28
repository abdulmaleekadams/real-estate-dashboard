import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/styles/globals.scss';
import { Navbar } from '@/components';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={manrope.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
