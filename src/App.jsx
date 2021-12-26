import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { SemesterProvider } from "./context/SemesterContext";
import { ActivationPage } from "./pages/ActivationPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RequireAuth } from "./utils/RequireAuth";

let handleOnDragEnd = (result) => {
  console.log(result);
};
export class App extends Component {
  render() {
    return (
      <div className="bg-slate-100 h-screen w-screen absolute overflow-hidden">
        <BrowserRouter>
          <AuthProvider>
            <SemesterProvider>
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
            </SemesterProvider>
          </AuthProvider>
        </BrowserRouter>
        <ToastContainer
          className="absolute"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
