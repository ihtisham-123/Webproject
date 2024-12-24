
import Offer from '../components/Offer'
import Footer from '../components/Footer'

const FeaturesScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        <Offer />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    
    // <>
    // <Offer/>
    // <Footer/>
    
    // </>
  )
}

export default FeaturesScreen