import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'TailGuide',
  description:
    'Design more efficiently with our suite of interactive tools that generate Tailwind CSS code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning className=''>
      <head>
        <title>TailGuide: Tools to Geneate TailwindCSS Code</title>
        <meta
          name='description'
          content='Design more efficiently with our suite of interactive tools that generate Tailwind CSS code.'
        />

        <meta property='og:url' content='https://tailguide.vercel.app' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='TailGuide: Tools to Geneate TailwindCSS Code'
        />
        <meta
          property='og:description'
          content='Design more efficiently with our suite of interactive tools that generate Tailwind CSS code.'
        />
        <meta
          property='og:image'
          content='https://tailguide.vercel.app/opengraph.png'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='tailguide.vercel.app' />
        <meta property='twitter:url' content='https://tailguide.vercel.app' />
        <meta
          name='twitter:title'
          content='TailGuide: Tools to Geneate TailwindCSS Code'
        />
        <meta
          name='twitter:description'
          content='Design more efficiently with our suite of interactive tools that generate Tailwind CSS code.'
        />
        <meta
          name='twitter:image'
          content='https://tailguide.vercel.app/opengraph.png'
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-zinc-900 transition-colors duration-300 ease-out overflow-x-hidden`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <div className='xl:container mx-auto px-4 md:px-6 overflow-x-hidden lg:overflow-x-visible'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
