import React, { useState, ChangeEvent, FormEvent } from 'react';
import { postData } from '../services/api';

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

const FormInput: React.FC<FormInputProps> = ({ label, id, type = "text", required = false, placeholder, value, onChange, error }) => (
  <div>
    <label className="block text-gray-400 text-sm mb-1" htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      className="w-full p-2.5 bg-transparent border border-[#1a1f37] rounded text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

interface SignupFormProps {
  className?: string;
}

const Signup: React.FC<SignupFormProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    country: '',
    phoneCode: '+1',
    phoneNumber: '',
    address: '',
    city: '',
    zip: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await postData('/signup', formData);
      console.log('Signup successful:', response);
      // Handle successful signup (e.g., redirect to another page)
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <FormInput
        label="Name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <FormInput
        label="Username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <FormInput
        label="Country"
        id="country"
        value={formData.country}
        onChange={handleChange}
        error={errors.country}
      />
      <FormInput
        label="Phone Code"
        id="phoneCode"
        value={formData.phoneCode}
        onChange={handleChange}
        error={errors.phoneCode}
      />
      <FormInput
        label="Phone Number"
        id="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
      />
      <FormInput
        label="Address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />
      <FormInput
        label="City"
        id="city"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
      />
      <FormInput
        label="ZIP Code"
        id="zip"
        value={formData.zip}
        onChange={handleChange}
        error={errors.zip}
      />
      <button type="submit" className="mt-4 p-2.5 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default Signup;