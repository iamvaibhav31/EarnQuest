import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import "./globals.css";

import LogoutButton from "./_components/logout-button";

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(vercelUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground p-4" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between items-center">
            <Image src="/earnQuestIcon.png" alt="EarnQuest logo" width={100} height={100} />
            <LogoutButton />
          </header>

          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
