import React, { createContext } from "react";

export const ApiUrlContext = createContext();

export const ApiUrlProvider = ({ children }) => {
  let contextData = {
    apiUrl: "http://127.0.0.1:8000/api/",
  };

  return (
    <ApiUrlContext.Provider value={contextData}>
      {children}
    </ApiUrlContext.Provider>
  );
};
