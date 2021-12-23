import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Semester } from "../components/Semester";

export const HomePage = () => {
  let { authToken } = useContext(AuthContext);
  const [semester, setSemester] = useState({});

  useEffect(() => {
    getSemester(1);
  }, []);

  useEffect(() => {
    if (!semester) {
      postSemester("Semester 1");
    }
  }, [semester]);

  let updateSemester = async (id, name) => {
    if (authToken != null) {
      fetch(`http://127.0.0.1:8000/api/grades/semester/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((message) => {
              throw new Error(message);
            });
          else return res.json();
        })
        .then((response) => {
          setSemester(response);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let postSemester = async (name) => {
    if (authToken != null) {
      fetch("http://127.0.0.1:8000/api/grades/semester/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((message) => {
              throw new Error(message);
            });
          else return res.json();
        })
        .then((response) => {
          setSemester(response);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let getSemester = async (id) => {
    if (authToken != null) {
      fetch(`http://127.0.0.1:8000/api/grades/semester/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((message) => {
              throw new Error(message);
            });
          else return res.json();
        })
        .then((response) => {
          if (response != {}) console.log("GET", response);
          setSemester(response);
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <div className="p-5">
        <Semester model={semester}></Semester>
      </div>
    </>
  );
};
