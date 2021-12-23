import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import { RequireAuth } from "./utils/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { RegisterPage } from "./pages/RegisterPage";
import { ActivationPage } from "./pages/ActivationPage";

export class App extends Component {
  render() {
    return (
      <div className="bg-slate-100 h-screen w-screen absolute ">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <RequireAuth>
                      <HomePage />
                    </RequireAuth>
                  </>
                }
                exact
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activate/:token" element={<ActivationPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    );
  }
}
