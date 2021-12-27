import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiUrlContext } from "../context/ApiUrlContext";

export const ActivationPage = () => {
  let { token } = useParams();
  let [tokenErrors, setTokenErrors] = useState({});
  let [isAccountActivated, setIsAccountActivated] = useState(false);
  let { apiUrl } = useContext(ApiUrlContext);

  let activateUser = async (e) => {
    fetch(`${apiUrl}accounts/activate/${token}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            data["status"] = res.status;
            setTokenErrors(data);
            throw new Error(JSON.stringify(data));
          });
        else return res.json();
      })
      .then((response) => {
        setIsAccountActivated(true);
        toast.success("Email successfully verified!", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => activateUser(), []);

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-center mt-20">
        GradesApp🪄
      </h1>
      <div className="w-134 h-1/2 min-w-max mx-auto bg-white py-16 px-24 mt-20 shadow flex flex-col place-content-center rounded-2xl">
        {isAccountActivated ? (
          <>
            <p className="text-center">
              Your account was successfully
              <a className="font-medium">&nbsp;activated</a>.
            </p>
            <p className="text-center">
              Go to&nbsp;
              <Link
                to="/login"
                className="font-medium underline decoration-solid text-indigo-600"
              >
                this link
              </Link>
              &nbsp;to login into GradesApp.
            </p>
            <p className="text-center text-6xl mt-2">✨</p>
          </>
        ) : (
          <>
            <p className="text-center">{tokenErrors.detail}</p>
            <p className="text-center text-6xl mt-2">🔒</p>
          </>
        )}
      </div>
    </>
  );
};
