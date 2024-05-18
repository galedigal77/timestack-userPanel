import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("/users/login", { email, password });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
                relative
                mx-auto
                max-w-[525px]
                overflow-hidden
                rounded-lg
                bg-white
                py-16
                px-10
                text-center
                sm:px-12
                md:px-[60px]
                "
            >
              <div className="mb-10 text-center md:mb-16">
                <img
                  src="/images/timestack-logo.png"
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                  className="mx-auto mb-4"
                />
              </div>
              {error && <div className="mb-4 text-red-500">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                        border-[#E9EDF4]
                        w-full
                        rounded-md
                        border
                        bg-[#FCFDFE]
                        py-3
                        py-5
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus:border-primary
                        focus-visible:shadow-none
                        "
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="
                        border-[#E9EDF4]
                        w-full
                        rounded-md
                        border
                        bg-[#FCFDFE]
                        py-3
                        py5
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus:border-primary
                        focus-visible:shadow-none
                        "
                  />
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                        w-full
                        px-4
                        py-3
                        bg-indigo-500
                        hover:bg-indigo-700
                        rounded-md
                        text-white
                        "
                  >
                    Login
                  </button>
                </div>
              </form>
              <Link
                to="/forgot-password"
                className="
                    mb-2
                    inline-block
                    text-base text-[#adadad]
                    hover:text-primary hover:underline
                    "
              >
                I forgot my Password
              </Link>
              <p className="text-base text-[#adadad]">
                Don't have an account yet?&nbsp;
                <Link to="/register" className="text-primary hover:underline">
                  Create an Account
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
