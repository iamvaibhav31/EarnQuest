import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import "./globals.css";

import LogoutButton from "./_components/logout-button";

const vercelUrl = process.env.VERCEL_URL
  ? `https://earnquest.onrender.com/`
  : "https://earnquest.onrender.com/";

export const metadata: Metadata = {
  metadataBase: new URL(vercelUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen  bg-background text-foreground flex flex-col gap-4 relative" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Image
            src="/Star.png"
            alt="EarnQuest logo"
            width={250}
            height={50}
            className="h-auto object-contain absolute top-0 left-0 hidden md:block z-[-1]"
          />
          <header className="flex justify-between items-center px-4 py-4 ">
            <Image src="/earnQuestIcon.png" alt="EarnQuest logo" width={140} height={70} className="h-auto object-contain" />
            <LogoutButton />
          </header>

          {children}
          {/* <Image
            src="/Star.png"
            alt="EarnQuest logo"
            width={250}
            height={50}
            className="h-auto object-contain absolute bottom-0 right-0 hidden md:block z-[-1] "
          /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
