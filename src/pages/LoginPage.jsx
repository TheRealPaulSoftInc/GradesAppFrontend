import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  let { loginUser, loginErrors, resendActivationLink, user } =
    useContext(AuthContext);
  let authenticated = user ? true : false;
  let [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) navigate("/");
  }, []);

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-center mt-20">
        GradesApp🪄
      </h1>
      <div
        className="w-134 h-1/2 mx-auto bg-white py-16 px-24 mt-20 shadow flex flex-col place-content-center rounded-2xl"
      >
        <p className=" font-bold text-xl mb-4 mt-2">Login to GradesApp</p>
        <form onSubmit={loginUser}>
          {loginErrors.message ? (
            <p class="text-sm font-normal text-red-600">
              {loginErrors.status == 403 ? (
                <>
                  {loginErrors.message} or resend the verification email&nbsp;
                  <a
                    onClick={() => resendActivationLink(email)}
                    className="font-medium underline decoration-solid text-indigo-600 cursor-pointer"
                  >
                    Here
                  </a>
                </>
              ) : (
                loginErrors.message
              )}
            </p>
          ) : (
            <></>
          )}
          <input
            type="mail"
            name="email"
            placeholder="Email"
            className="my-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-full duration-150"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="my-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-full duration-150"
          />
          <button
            type="submit"
            className="my-2 w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-150"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3 text-sm">
          You don't have an account? Create a new one&nbsp;
          <Link
            to="/register"
            className="font-medium underline decoration-solid text-indigo-600"
          >
            Here
          </Link>
          .
        </p>
      </div>
    </>
  );
};
