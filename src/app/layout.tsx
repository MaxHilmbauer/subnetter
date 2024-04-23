import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { LanguageDropdown } from "@/components/core/language-dropdown";
import { ThemeDropdown } from "@/components/core/theme-dropdown";

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
          forcedTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="container mt-10">
            <div className="grid grid-cols-2 gap-4 justify-between">
              <div className="max-md:col-span-2 flex max-md:justify-center justify-start">
                <h1 className="text-4xl font-bold">Subnetter IPv4</h1>
                <Badge className="ml-4 self-center"> v1.0 </Badge>
              </div>
              <div className="max-md:col-span-2 flex max-md:justify-center justify-end gap-2">
                <LanguageDropdown />
                <ThemeDropdown />
              </div>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
