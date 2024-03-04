import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Music app",
  description: "Where you can express an opinion on music",
};

export default function RootLayout({ children }) {
  const { userId } = authMiddleware();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className="p-2 m-2 bg-red-800 text-white space-x-14 h-12 text-lg">
            <Link href="/">Home page</Link>
            <Link href="/music">Find your tunes</Link>
            <Link href="/music/addsong">Add a song here</Link>
            {userId ? <UserButton /> : <SignInButton />}
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
