import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "ElectroLab - Crie sua bateria sustentável",
  description: "Simulações interativas que ensinam como funcionam as baterias sem laboratório",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}