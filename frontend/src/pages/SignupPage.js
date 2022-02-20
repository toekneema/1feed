import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../global";

export const SignupPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 1200;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const takenSet = new Set(["josh", "adam", "tony", "armaan"]);
  const [firstInputFocused, setFirstInputFocused] = useState(false);
  const [secondInputFocused, setSecondInputFocused] = useState(false);

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
      <div className="min-h-full flex flex-col items-center justify-center mt-16 px-4 sm:px-6 lg:px-8">
        <h2
          className="text-black font-semibold text-center leading-9"
          style={{ fontFamily: "Inter", fontSize: "36px" }}
        >
          Welcome to{" "}
          <span className="text-gray-400 hover:text-indigo-500">onefeed</span>
        </h2>
        <h2
          className="text-black font-semibold mb-4 text-center"
          style={{ fontFamily: "Inter", fontSize: "36px" }}
        >
          {!isMobile ? "Start by naming your feed" : "Name your feed"}
        </h2>{" "}
        <div className="max-w-sm w-full">
          <form
            className="mt-16 space-y-12"
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
            <div className="relative">
              <div className="relative">
                <div className="relative">
                  <input
                    id="username"
                    placeholder="Username"
                    onChange={(event) => {
                      usernameIsValid(event.target.value);
                    }}
                    onFocus={() => setFirstInputFocused(true)}
                    onBlur={() => setFirstInputFocused(false)}
                    className="pl-32 appearance-none tracking-wider w-full relative py-2 placeholder:text-gray-400 border-2 border-gray-400 focus:outline-black sm:text-sm"
                    style={{ textTransform: "uppercase" }}
                  />
                  <div
                    className={
                      firstInputFocused || (username && !usernameErrorMsg)
                        ? "absolute items-center left-3 top-0 bottom-0 z-50 flex tracking-wide font-bold text-black pl-1"
                        : "absolute items-center left-3 top-0 bottom-0 z-50 flex tracking-wide font-bold text-gray-400 pl-1"
                    }
                  >
                    1FEED.COM/
                  </div>
                </div>
                <div
                  className={
                    firstInputFocused || (username && !usernameErrorMsg)
                      ? "absolute -left-12 top-2.5 rounded-full bg-black p-0.5"
                      : "absolute -left-12 top-2.5 rounded-full bg-gray-400 p-0.5"
                  }
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              {usernameErrorMsg !== "valid" && (
                <p
                  className="text-red-500 ml-1 flex-wrap"
                  style={{ fontSize: "13px" }}
                >
                  {usernameErrorMsg}
                </p>
              )}
            </div>

            <div>
              <div className="mb-3 relative">
                <input
                  onFocus={() => setSecondInputFocused(true)}
                  onBlur={() => setSecondInputFocused(false)}
                  onChange={(event) => setEmail(event.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="tracking-wider w-full px-3 py-2 placeholder:text-gray-400 border-2 border-gray-400 focus:outline-black sm:text-sm"
                  placeholder="EMAIL ADDRESS"
                />
                <div
                  className={
                    secondInputFocused || (email && password)
                      ? "absolute -left-12 top-2.5 rounded-full bg-black p-0.5"
                      : "absolute -left-12 top-2.5 rounded-full bg-gray-400 p-0.5"
                  }
                >
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <input
                  onFocus={() => setSecondInputFocused(true)}
                  onBlur={() => setSecondInputFocused(false)}
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
