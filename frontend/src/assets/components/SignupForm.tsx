import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {postData} from "../services/api";

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

const SignupForm = () => {
  const navigate = useNavigate();

  const gotosignin = ( url :string) => {
    navigate(url);
  };
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const gotoverify=(url: string)=>{
    navigate(url);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postData("/signup", formData)
    .then((response) => console.log(response))
    // .catch((error) => console.log(error))
    .catch((error) => console.error(error));



    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-transparent p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Name"
              id="name"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormInput
              label="Username"
              id="username"
              required
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormInput
              label="Password"
              id="password"
              type="password"
              required
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-white mb-1"
              >
                Country
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="country"
                className="w-full p-2.5 bg-transparent border border-gray-600 rounded text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            <FormInput
              label="Phone Number"
              id="phoneNumber"
              required
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />
          </div>

          <FormInput
            label="Address"
            id="address"
            required
            placeholder="Your address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="State (Optional)"
              id="state"
              placeholder="Your state"
              value={formData.state}
              onChange={handleChange}
            />

            <FormInput
              label="City (Optional)"
              id="city"
              placeholder="Your city"
              value={formData.city}
              onChange={handleChange}
            />

            <FormInput
              label="Zip Code (Optional)"
              id="zipCode"
              placeholder="Your zip code"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-2 rounded-md shadow-smpx-4  
                        bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] hover:from-[#B22ADF] hover:to-[#3E62DE] 
                        hover:bg-gradient-to-r transition-all duration-200"
             >
            <span  onClick={()=>gotoverify("/EmailVerification")}
       >Create Account </span>

          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted-black">Already Have an account </span>
          <button
            onClick={() => gotosignin("/Signin")}
            className="text-primary"
          >
            Sign In{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
