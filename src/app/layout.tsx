import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "./globals.css";
import Link from "next/link";

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
      <body>
        <div className="container mt-10">
          <div className="flex">
            <h1 className="text-4xl font-bold">Subnetter</h1>
            <Badge className="ml-4 self-center"> v1.0 </Badge>
          </div>
          <div className="mt-5 mx-4 hidden">
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>New Release</AlertTitle>
              <AlertDescription>
                This is a new release of Subnetter. Check out the new features
                and improvements on{" "}
                <Link
                  className="underline"
                  href={"https://github.com/MaxHilmbauer/subnetter/releases"}
                  target="_blank"
                >
                  GitHub
                </Link>
                .
              </AlertDescription>
            </Alert>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
