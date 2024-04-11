import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'property search | Find the perfect rental',
  description: 'find your dream rental',
  keywords: 'rental,find rentals,find properties',


}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <html lang='en'>
      <body>
       <Navbar/>
       <main>{ children }</main>
       <Footer/>
      </body>
    </html>
    </AuthProvider>
  )
}

export default MainLayout;