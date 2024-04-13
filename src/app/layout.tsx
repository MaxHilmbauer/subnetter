import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Subnetter",
  description: "Subnetter is a tool to practice subnetting and IP addressing.",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container mt-10">
            <div className="flex">
              <h1 className="text-4xl font-bold">Subnetter</h1>
              <Badge className="ml-4 self-center"> v1.0 </Badge>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
