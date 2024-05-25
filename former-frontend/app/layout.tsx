import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/nav/MainNav";
import Footer from "@/components/Footer";
import { AppContextProvider } from "@/stores/appContext";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Former",
  description: "Former - create, share and analyze forms easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppContextProvider>
          <header>
            <MainNav />
          </header>
          <main>{children}</main>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
