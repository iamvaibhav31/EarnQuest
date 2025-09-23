import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
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
      <body className='antialiased min-h-screen bg-background text-foreground p-4' suppressHydrationWarning>
        <header className="flex justify-between items-center mb-6">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
            EARN QUEST
          </span>
          <div className="flex gap-4">
            {/* <Button variant="ghost">Users</Button>
          <Button variant="ghost">Report</Button>
          <Button variant="ghost">Sign Out</Button> */}
          </div>
        </header>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
