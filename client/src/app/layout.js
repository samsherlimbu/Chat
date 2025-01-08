import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext/page";
import { SocketContentProvider } from "./context/socketContext/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <SocketContentProvider>
        <NextUIProvider>
        {children}
        <Toaster/>
        </NextUIProvider>
        </SocketContentProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
