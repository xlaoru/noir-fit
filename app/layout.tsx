import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { getUserWishlistItemsQuantity } from "@/lib/services/get-user-wishlist-items-quantity.action";
import { requireUser } from "@/lib/services/require-user.service";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noir Fit",
  description: "Where discipline meets design.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser()
  const { quantity } = await getUserWishlistItemsQuantity(user?.id ?? "")
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          <CartProvider>
            <WishlistProvider key={user?.id ?? ""} wishlistItemsQuantity={quantity ?? 0}>
              <Header slug={user?.slug ?? ""} userRole={user?.role ?? "USER"} avatar={user?.avatar ?? ""} />
              {children}
            </WishlistProvider>
          </CartProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
