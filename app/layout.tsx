import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const courierPrime = Courier_Prime({ weight: '400', subsets: ["latin"] });
const oswald = Oswald({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bute 2.0",
  description: "Bute lá Cantar! Cancioneiro Projeto TAU. Paróquia de Santo António dos Olivais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.className} bg-surface-500 dark:bg-surface-dark-200`}>
        <NavBar />
        <main className="md:overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
