import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gurshaan Gill",
  description: "Portfolio created by Gurshaan Gill",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Nav />
        {children}
      </body>
    </html>
    </ViewTransitions>
  );
}
