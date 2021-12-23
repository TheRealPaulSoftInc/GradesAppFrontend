import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ActivationPage = () => {
  let { token } = useParams();
  let [tokenErrors, setTokenErrors] = useState({});
  let [isAccountActivated, setIsAccountActivated] = useState(false);

  let activateUser = async (e) => {
    fetch(`http://127.0.0.1:8000/api/accounts/activate/${token}/`, {
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
      <p className="text-5xl font-semibold tracking-wide text-center mt-20">
        GradesApp🪄
      </p>
      <div
        className="w-2/5 min-w-min mx-auto bg-white py-16 px-24 mt-20 shadow"
        style={{ "border-radius": "8.5rem" }}
      >
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
