import '@/assets/styles/globals.css';

export const metadata = {
  title: 'property-search | Find the perfect rental',
  description: 'find your dream rental',
  keywords: 'rental,find rentals,find properties',


}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
       <div>{ children }</div>
      </body>
    </html>
  )
}

export default MainLayout;