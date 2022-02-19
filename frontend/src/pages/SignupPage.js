import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../global";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const takenSet = new Set(["josh", "adam", "tony", "armaan"]);
  let navigate = useNavigate();

  const usernameIsValid = (s) => {
    s = s.toLowerCase();
    setUsername(s);
    if (s === "") {
      setUsernameErrorMsg("Username required");
    } else if (!s.match("^[a-zA-Z0-9_.]+$")) {
      setUsernameErrorMsg(
        'Usernames may only contain letters, numbers, underscores ("_") and periods (".").'
      );
    } else if (s.length < 3 || s.length > 30) {
      setUsernameErrorMsg("Usernames must be between 3 and 30 characters.");
    } else if (takenSet.has(s)) {
      setUsernameErrorMsg("Username taken.");
    } else {
      setUsernameErrorMsg("");
    }
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          <h2
            className="text-black font-semibold text-center"
            style={{ fontFamily: "Inter", fontSize: "36px" }}
          >
            Welcome to{" "}
            <span className="text-gray-400 hover:text-indigo-500">onefeed</span>
          </h2>
          <h2
            className="text-black font-semibold -mt-3 mb-4 text-center"
            style={{ fontFamily: "Inter", fontSize: "36px" }}
          >
            Start by naming your feed
          </h2>
          <form
            className="mt-16 space-y-16"
            onSubmit={async (event) => {
              event.preventDefault();
              const [error, hasError] = await register(
                username,
                email,
                password
              );
              hasError ? toast(error) : navigate("/edit");
            }}
          >
            <div>
              <div className="relative">
                <input
                  id="username"
                  placeholder="Username"
                  onChange={(event) => {
                    usernameIsValid(event.target.value);
                  }}
                  className="pl-32 appearance-none tracking-wider w-full relative px-3 py-2 placeholder:text-gray-500 border-2 border-gray-500 focus:outline-black sm:text-sm"
                  style={{ textTransform: "uppercase" }}
                />
                <div className="absolute items-center left-3 top-0 bottom-0 z-50 flex tracking-wide font-bold text-gray-700 pl-1">
                  1FEED.COM/
                </div>
              </div>

              {usernameErrorMsg !== "valid" && (
                <p className="text-red-500 ml-2" style={{ fontSize: "13px" }}>
                  {usernameErrorMsg}
                </p>
              )}
            </div>

            <div>
              <div className="mb-3">
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="tracking-wider w-full px-3 py-2 placeholder:text-gray-500 border-2 border-gray-500 focus:outline-black sm:text-sm"
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
                  className="tracking-wider w-full px-3 py-2 placeholder:text-gray-500 border-2 border-gray-500 focus:outline-black sm:text-sm"
                  placeholder="PASSWORD"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex tracking-widest justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-indigo-500 focus:outline-none"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center text-sm mt-6">
            <a
              href="/login"
              className="flex items-center font-medium hover:text-indigo-500"
            >
              Already have an acccount? Login
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
