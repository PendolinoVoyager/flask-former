import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/nav/MainNav";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <header>
          <MainNav />
        </header>
        {children}
      </body>
    </html>
  );
}
