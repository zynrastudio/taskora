import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Taskora - Modern Task Management",
  description: "A modern, collaborative, and beautifully designed task manager built for everyday productivity.",
  keywords: ["task management", "productivity", "collaboration", "todo", "tasks"],
  authors: [{ name: "Taskora Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
