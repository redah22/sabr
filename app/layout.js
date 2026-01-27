import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/Cart";
import { CartProvider } from "../context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SABR | Streetwear",
  description: "Modern Streetwear from the Underground",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
