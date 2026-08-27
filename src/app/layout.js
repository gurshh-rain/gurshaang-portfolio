import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
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

// Read the theme cookie during SSR so the server-rendered <html> already
// has the right data-theme attribute. This keeps SSR markup in sync with
// the client (no hydration mismatch) and avoids any flash of wrong theme
// since the attribute is set in the initial HTML, not by a boot script.
async function getInitialTheme() {
  try {
    const store = await cookies();
    const v = store.get("theme")?.value;
    return v === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default async function RootLayout({ children }) {
  const initialTheme = await getInitialTheme();

  return (
    <ViewTransitions>
      <html lang="en" data-theme={initialTheme}>
        <body>
          <PreloaderWrapper>{children}</PreloaderWrapper>
        </body>
      </html>
    </ViewTransitions>
  );
}