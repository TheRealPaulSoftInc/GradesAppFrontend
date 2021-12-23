import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
      <div className="w-2/5 min-w-min mx-auto bg-white py-16 px-24 rounded-full mt-20 shadow">
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
          </>
        ) : (
          <p className="text-center">{tokenErrors.detail}</p>
        )}
      </div>
    </>
  );
};
