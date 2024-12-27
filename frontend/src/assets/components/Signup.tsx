
import Footer from './Footer';
import MarketNews from './MarketNews';
import Navbar from './Navbar';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-transparent flex justify-center items-center ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2   p-2">
          <MarketNews />
          <SignupForm />
        </div>
      </div>
    </div>
    <Footer/>
    </>
    

  );
};

export default Signup;