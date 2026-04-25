import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { ViewTransitions } from "next-view-transitions";
import PreloaderWrapper from "./components/PreloaderWrapper";

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
  verification: {
    google: "PyXlGf13MpKqovovDIJSMvhtV8pDc7anshKjJNaWu10",
  },
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <PreloaderWrapper>{children}</PreloaderWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}