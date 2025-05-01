// app/layout.js
import "./globals.css";
import { Poppins, Space_Grotesk, Playfair_Display, Barlow, Rubik, Cormorant, VT323, Fira_Code } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-poppins' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const barlow = Barlow({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-barlow' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-rubik' });
const outfit = Cormorant({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-outfit' });
const funky = VT323({ subsets: ['latin'], weight: ['400'], variable: '--font-funky' });
const mono = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-mono' });

export const metadata = {
  title: "Dualnature",
  description: "Dualnature music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${grotesk.variable} ${playfair.variable} ${barlow.variable} ${rubik.variable} ${outfit.variable} ${funky.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
