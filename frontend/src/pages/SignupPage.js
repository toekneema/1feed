import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/solid";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const takenSet = new Set(["josh", "adam", "tony", "armaan"]);

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
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up for an account
            </h2>
          </div>
          <form className="mt-8" action="#" method="POST">
            <div className="rounded-md relative shadow-sm">
              <input
                id="username"
                placeholder="Username"
                onChange={(event) => {
                  usernameIsValid(event.target.value);
                }}
                className="pl-32 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                style={{ paddingLeft: "8.3rem" }}
              />
              <div className="absolute items-center left-3 top-0 bottom-0 z-50 flex">
                <LinkIcon className="h-6 w-6 text-indigo-600" />
                <p className="pl-1 tracking-wide font-bold text-gray-700">
                  1feed.com/
                </p>
              </div>
            </div>

            {usernameErrorMsg !== "valid" && (
              <p
                className="text-red-500 ml-2 mb-5"
                style={{ fontSize: "13px" }}
              >
                {usernameErrorMsg}
              </p>
            )}

            <div className="rounded-md shadow-sm -space-y-px mb-6">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create account
              </button>
            </div>
            <div className="flex items-center justify-center text-sm">
              <a
                href="/login"
                className="flex items-center font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an acccount? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
