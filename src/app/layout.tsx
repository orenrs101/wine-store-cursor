import type { Metadata } from "next";
import { Rubik, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CartProvider } from "./context/CartContext";
import { Footer } from "./components/Footer";

// Hebrew font
const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "אתר היין שלי",
  description: "אתר עבור אוהבי היין",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} ${geistMono.variable}`}>
        <Providers>
          <CartProvider>
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              {children}
              <Footer />
            </main>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
