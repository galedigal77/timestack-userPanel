import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', formData);
      localStorage.setItem('token', response.data.access_token);
      setMessage(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <img
                  src="/images/timestack-logo.png"
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                  className="mx-auto mb-4"
                />
              </div>
              {error && (
                <div className="mb-4 text-red-500">{error}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                  >
                    Login
                  </button>
                </div>
              </form>
              {message && (
                <div className="mb-4 text-green-600">{message}</div>
              )}
              <Link
                to="/forgot-password"
                className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
              >
                I Forgot my Password
              </Link>
              <p className="text-base text-[#adadad]">
                Don't have an account?&nbsp;
                <Link to="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
