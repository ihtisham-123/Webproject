
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const FAQScreen = () => {
  return (

    <>
      <Navbar />
      <div className='flex  flex-col items-center justify-center'>
        <FAQ />
        <Footer />

      </div>


    </>
  )
}

export default FAQScreen