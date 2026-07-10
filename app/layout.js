import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elite Motors | Luxury Car Dealership Beverly Hills",
  description: "Discover our curated selection of the world's finest automobiles. From vintage classics to modern supercars, Elite Motors provides an exclusive ownership experience tailored to your passion.",
};

export default function RootLayout({ children }) {
  return (
      <html
        lang="en"
        className="bg-white text-gray-900"
        data-scroll-behavior="smooth"
        suppressHydrationWarning
      >
      <body className={`${inter.className} bg-white text-gray-900 antialiased`} suppressHydrationWarning>
        <AuthProvider>
        <NavbarWrapper>
          <main>{children}</main>
        </NavbarWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
