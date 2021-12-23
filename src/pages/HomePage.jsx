import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const HomePage = () => {
  let { user } = useContext(AuthContext);
  let authenticated = user ? true : false;

  return (
    <>
      {authenticated ? (
        <>
          <p>sheeesh</p>
        </>
      ) : (
        <>
          <p>gaaaaaa</p>
        </>
      )}
    </>
  );
};
