import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  return (
    <>
      <div className="min-h-full flex flex-col items-center justify-center mt-16 px-4 sm:px-6 lg:px-8">
        <h2
          className="text-black font-semibold text-center leading-9"
          style={{ fontFamily: "Inter", fontSize: "36px" }}
        >
          Welcome back to{" "}
          <span className="text-gray-400 hover:text-indigo-500">onefeed</span>
        </h2>

        <div className="max-w-sm w-full">
          <form
            className="mt-16 space-y-12"
            onSubmit={async (event) => {
              event.preventDefault();
              const [error, hasError] = await login(email, password);
              hasError ? toast(error) : navigate("/edit");
            }}
          >
            <div>
              <div className="mb-3 relative">
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="tracking-wider w-full px-3 py-2 placeholder:text-gray-400 border-2 border-gray-400 focus:outline-black sm:text-sm"
                  placeholder="EMAIL ADDRESS"
                />
              </div>
              <div>
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="tracking-wider w-full px-3 py-2 placeholder:text-gray-400 border-2 border-gray-400 focus:outline-black sm:text-sm"
                  placeholder="PASSWORD"
                />
              </div>
              <div className="mt-2 flex justify-end text-sm">
                <a
                  href="https://www.youtube.com"
                  className="font-medium hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex tracking-widest justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-indigo-500 focus:outline-none"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center text-sm mt-6">
            <a
              href="/signup"
              className="flex items-center font-medium hover:text-indigo-500"
            >
              No account yet? Sign Up
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
