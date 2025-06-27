import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import "@/assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Home-rental| Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
