
import "@/assets/styles/globals.css"
import Footer from "@/components/Footer";
import Navbar from '@/components/navbar';
import AuthProvider from "@/components/AuthProvider";
export const metadata={
  title: 'soll_dev startapp',
  description:' the project is for rental properties',
}
const layout = ({children}) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}

export default layout
