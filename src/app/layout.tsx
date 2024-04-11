import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
