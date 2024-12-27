import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp: code });
      setMessage(response.data.message);
      setError('');
      navigate('/signin');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#13111C]">
      <div className="w-full max-w-md bg-[#1A1625] border border-purple-500/20 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Email Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-600 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter the verification code"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Verify Email
          </button>
        </form>
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}