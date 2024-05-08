import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Corrected import path
import 'photoswipe/dist/photoswipe.css';


export const metadata = {
  title: 'property search | Find the perfect rental',
  description: 'find your dream rental',
  keywords: 'rental,find rentals,find properties',


}

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
    <AuthProvider>
    <html lang='en'>
      <body>
       <Navbar/>
       <main>{ children }</main>
       <Footer/>
       <ToastContainer/>
      </body>
    </html>
    </AuthProvider>
    </GlobalProvider>
  )
}

export default MainLayout;