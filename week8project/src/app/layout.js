import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Music app",
  description: "Where you can express an opinion on music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/music">Find your tunes</Link>
        <Link href="/addsong">Add a song here</Link>
        <Link href="/music/id">Find your specific song</Link>
        {children}
      </body>
    </html>
  );
}
