import React, { useEffect, useState } from "react";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import PricingCards from "../components/PricingCard";
import ContactForm from "../components/ContactForm";
import Banner from "../components/Banner";
import Global from "../components/Global";
import Offer from "../components/Offer";
import ProfitShareSlider from "../components/ProfitSlider";
import Navbar from "../components/Navbar";
import Popup from "../components/Popup";
import CryptoRoller from "../components/CryptoRoller";
import CryptoNewsFeed from "../components/CryptoNews";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <Navbar />
      <Banner />
      <CryptoRoller/>
      <PricingCards />
      <CryptoNewsFeed/>
      <Global />
      <Offer />
      <FAQ />
      <ProfitShareSlider />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;