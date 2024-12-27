import React from "react";
import Offer from "../components/Offer";
import PricingCards from "../components/PricingCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const OfferkiScreen = () => {
  return (
    <>
      <Navbar/>
      <Offer />
      <PricingCards />
      <Footer />
    </>
  );
};

export default OfferkiScreen;
