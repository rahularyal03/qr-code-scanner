import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Manager",
  description: "Generated by WeCode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Header />
        {children}
        <ToastContainer position="bottom-right"/>

      </body>
    </html>
  );
}
