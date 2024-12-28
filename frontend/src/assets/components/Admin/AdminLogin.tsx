import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

const AdminLogin = ({ setToken }: { setToken: (token: string) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/admin/dashboard');
    } catch {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Log In</h2>
          <form onSubmit={handleSubmit} method="POST">
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-muted-black mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-border rounded-lg bg-input text-black focus:outline-none focus:ring focus:ring-ring"
                placeholder="admin@example.com"
                required
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-muted-black mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  className="w-full p-2 border border-border rounded-lg bg-input text-black focus:outline-none focus:ring focus:ring-ring"
                  placeholder=""
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-muted-black"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? '👁' : '👁'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-primary-foreground w-full py-2 rounded-md shadow-smpx-4  
                        bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] hover:from-[#B22ADF] hover:to-[#3E62DE] 
                        hover:bg-gradient-to-r transition-all duration-200"
            >
              LOGIN
            </button>
          </form>

          {/* Error Message */}
          {errors.general && (
            <div className="text-red-500 text-center mt-4">
              {errors.general}
            </div>
          )}

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-muted-black">Don't have an account? </span>
            <button onClick={() => handleNavigation('/Signup')} className="text-primary">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;