import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let authenticated = user ? true : false;

  return (
    <div className="bg-white shadow flex justify-between items-center px-5 py-1.5">
      <Link to="/" className="text-2xl font-semibold tracking-wide">
        GradesApp🪄
      </Link>
      {authenticated ? (
        <p onClick={logoutUser}>Logout</p>
      ) : (
        <div className="flex gap-2">
          <Link to="/login" class="hover:bg-slate-100 rounded-md px-3 py-1">
            Login
          </Link>
          <Link to="/register" class="hover:bg-slate-100 rounded-md px-3 py-1">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
