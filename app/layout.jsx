
import "@/assets/styles/globals.css"
import Footer from "@/components/Footer";
import Navbar from '@/components/navbar';
export const metadata={
  title: 'soll_dev startapp',
  description:' the project is for rental properties',
}
const layout = ({children}) => {
  return (
    <html>    
      <body>
      <Navbar/>
       <main>
      {children}
      </main>
      <Footer/>
        </body> 
   
    </html>
  )
}

export default layout
