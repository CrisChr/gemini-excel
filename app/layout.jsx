import Footer from "../components/Footer";
import Header from "../components/Header";
import { cn } from "../lib/utils";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/loading.css";

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: '/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}>
        <Header />
        <div className="flex max-full mx-auto flex-col justify-center py-0 min-h-screen">
          <main className="flex-1 flex justify-center">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
