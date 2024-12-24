import React, { useEffect, useState } from 'react';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import PricingCards from '../components/PricingCard';
import ContactForm from '../components/ContactForm';
import Banner from '../components/Banner';
import Global from '../components/Global';
import Offer from '../components/Offer';
import ProfitShareSlider from '../components/ProfitSlider';
import { getData } from '../services/api';

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData('/'); // Replace with your endpoint
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    {/* <div>
    <div>
        {data ? (
          <div>
            <h1>Fetched Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div> */}


      <Banner/>
      <PricingCards/> 
      <Global/>
      <Offer/>
      <FAQ />
      <ProfitShareSlider/>
      <ContactForm/>
      <Footer />
    </>
  )
}

export default Home