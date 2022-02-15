import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const isLoggedIn = localStorage.getItem("jwt") ? true : false;
  let navigate = useNavigate();

  return (
    <nav
      className="border-2 border-black py-3 mx-96 my-6"
      style={{ boxShadow: "6px 6px" }}
    >
      <div className="flex flex-wrap justify-between items-center mx-8">
        <a href="/" className="flex">
          <svg
            className="mr-3 h-10"
            viewBox="0 0 52 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
              fill="#76A9FA"
            />
            <path
              d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
              fill="#A4CAFE"
            />
            <path
              d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
              fill="#1C64F2"
            />
          </svg>
          <span className="self-center text-lg text-black font-semibold whitespace-nowrap hover:text-gray-600">
            1Feed
          </span>
        </a>
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="text-white font-semibold rounded-3xl bg-gray-700 hover:bg-gray-500 px-4 py-2"
          >
            Logout
          </button>
        ) : (
          <div>
            <button
              onClick={() => navigate("/signup")}
              className="text-white font-semibold rounded-3xl bg-gray-700 hover:bg-gray-500 px-4 py-2"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-white font-semibold rounded-3xl bg-gray-700 hover:bg-gray-500 px-4 py-2"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
