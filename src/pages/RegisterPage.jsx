import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  let { registerUser, registerErrors, isUserCreated } = useContext(AuthContext);

  return (
    <>
      <p className="text-5xl font-semibold tracking-wide text-center mt-20">
        GradesApp🪄
      </p>
      <div
        className="w-2/5 h-1/2 min-w-min mx-auto bg-white py-16 px-24 mt-20 shadow flex flex-col place-content-center"
        style={{ "border-radius": "8.5rem" }}
      >
        {isUserCreated ? (
          <>
            <p className="text-center">
              Your account was successfully{" "}
              <a className="font-medium">created</a>.
            </p>
            <p className="text-center">
              A <a className="font-medium">verification link</a> has been sent
              to your email
            </p>
            <p className="text-center text-6xl">✉️</p>
          </>
        ) : (
          <>
            <p className=" font-bold text-xl mb-4 mt-2">Create your account</p>
            <form onSubmit={registerUser}>
              <input
                type="mail"
                name="email"
                placeholder="Email"
                className="my-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-full"
              />
              {registerErrors.email ? (
                registerErrors.email.map((e) => (
                  <p class="text-sm font-normal text-red-600">{e}</p>
                ))
              ) : (
                <></>
              )}
              <input
                type="password"
                name="password1"
                placeholder="Password"
                className="my-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-full"
              />
              {registerErrors.password ? (
                registerErrors.password.map((e) => (
                  <p class="text-sm font-normal text-red-600">{e}</p>
                ))
              ) : (
                <></>
              )}
              <input
                type="password"
                name="password2"
                placeholder="Repeat password"
                className="my-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-full"
              />
              <button
                type="submit"
                className="my-2 w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </form>
            <p className="text-center mt-3 text-sm">
              You already have an account? Login&nbsp;
              <Link
                to="/login"
                className="font-medium underline decoration-solid text-indigo-600"
              >
                Here
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </>
  );
};
