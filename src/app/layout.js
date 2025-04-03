import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Google Clone',
  description:
    'An open source Google clone built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        {/* Main content should take full height */}
        <main className="flex-grow">{children}</main>

        {/* Footer is now at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
