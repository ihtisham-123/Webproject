import React, { useEffect, useState } from "react";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import PricingCards from "../components/PricingCard";
import ContactForm from "../components/ContactForm";
import Banner from "../components/Banner";
import Global from "../components/Global";
import Offer from "../components/Offer";
import ProfitShareSlider from "../components/ProfitSlider";
import { getData } from "../services/api";
import Navbar from "../components/Navbar";
const Home = () => {
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

      <Navbar />
      <Banner />
      <PricingCards />
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
