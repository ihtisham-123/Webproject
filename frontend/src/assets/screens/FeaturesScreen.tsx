
import Offer from '../components/Offer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const FeaturesScreen = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Offer />
      </main>
      <Footer />
    </div>
    </>
    
    
    
    
  )
}

export default FeaturesScreen