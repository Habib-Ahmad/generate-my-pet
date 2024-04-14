import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const font = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-default",
});

export const metadata: Metadata = {
  title: "Generate my Pet",
  description: "generate my pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
