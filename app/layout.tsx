import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { roboto } from "@/components/ui/fonts";



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
      <body className={`${roboto.className} bg-surface-500 dark:bg-surface-dark-200`}>
        <NavBar />
        <main className="md:overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
