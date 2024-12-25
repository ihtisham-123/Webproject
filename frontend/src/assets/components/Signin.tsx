import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'; // Adjust the path as necessary

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={id}
      className="w-full p-2.5 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/login', formData)
      .then((response) => {
        console.log(response);
        // Handle successful login (e.g., store token, redirect to dashboard)
      })
      .catch((error) => console.error(error));

    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-card rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} method="POST">
          <FormInput
            label="Email"
            id="email"
            type="email"
            required
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="w-full p-2.5 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-2 rounded-md shadow-smpx-4  
                        bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] hover:from-[#B22ADF] hover:to-[#3E62DE] 
                        hover:bg-gradient-to-r transition-all duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-muted-black">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-primary"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;