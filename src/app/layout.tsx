import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieBanner from "@/components/ui/CookieBanner";
import LoginModal from "@/components/ui/LoginModal";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import { LoginModalProvider } from "@/lib/loginModalContext";
import GSAPInitializer from "@/components/GSAPInitializer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sanzistry — Art Gallery",
  description: "A curated space where artists showcase and sell their creations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#f8f6f2]">
        <AuthProvider>
          <LoginModalProvider>
            <CartProvider>
              <GSAPInitializer />
              <Topbar />
              <Navbar />
              <div className="relative z-10 bg-[#f8f6f2]">
                <CartDrawer />
                <LoginModal />
                <CookieBanner />
                {children}
              </div>
              <Footer />
            </CartProvider>
          </LoginModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
