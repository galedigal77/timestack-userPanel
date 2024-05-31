import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const VerifyEmail = () => {
    const { state } = useLocation();
    const { email } = state || {};
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users/verify-email-code", {
                email_verification_code: verificationCode,
                email: email,
            });
            setMessage("Email verified successfully.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Failed to verify email.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleResendVerification = async () => {
        try {
            const response = await axios.post("/users/send-email-verification-code", {
                email: email,
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Failed to resend verification email.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("/users/logout");
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            setError("Failed to log out. Please try again.");
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
                            {message && (
                                <div className="mb-4 text-green-600">{message}</div>
                            )}
                            {error && (
                                <div className="mb-4 text-red-500">{error}</div>
                            )}
                            <form onSubmit={handleVerifyEmail}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Verification Code"
                                        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-10">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white"
                                    >
                                        Verify Email
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleResendVerification}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                >
                                    Resend Verification Code
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmail;
