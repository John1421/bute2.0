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
    <html lang="pt">
      <body className={`${roboto.className} bg-surface-500 dark:bg-surface-dark-200`}>
        <NavBar />
        <main className="md:overflow-hidden">
          <section className="md:overflow-y-auto p-6 md:p-12">{children}</section>
        </main>
      </body>
    </html>
  );
}
