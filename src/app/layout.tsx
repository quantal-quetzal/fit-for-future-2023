import { Bottom } from "@/components/layout/Bottom";
import { Top } from "@/components/layout/Top";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit for Future 2023",
  description: "Fit for Future 2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Top />
          <div className="shadow">{children}</div>
          <Bottom />
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
