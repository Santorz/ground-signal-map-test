import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ReduxProvider } from '@/redux/providers';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Santorz GroundSignal Test',
  description: 'My submission for ground signal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
