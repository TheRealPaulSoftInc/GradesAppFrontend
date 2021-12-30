import React, { createContext } from "react";

export const ApiUrlContext = createContext();

export const ApiUrlProvider = ({ children }) => {
  let contextData = {
    apiUrl: "https://gradesappapi.herokuapp.com/api/",
  };

  return (
    <ApiUrlContext.Provider value={contextData}>
      {children}
    </ApiUrlContext.Provider>
  );
};
