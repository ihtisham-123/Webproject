
import MarketNews from './MarketNews';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#0a0b1e] flex justify-center items-center ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2  bg-blue-900 p-2">
          <MarketNews />
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;