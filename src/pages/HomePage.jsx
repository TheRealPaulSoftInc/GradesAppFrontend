import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Semester } from "../components/Semester";

export const HomePage = () => {
  let { authToken } = useContext(AuthContext);
  let [semesters, setSemesters] = useState([]);
  let [currentSemester, setCurrentSemester] = useState({});
  let [toggleEffects, setToggleEffects] = useState(false);

  useEffect(() => {
    getSemesters();
  }, [toggleEffects]);

  useEffect(() => {
    console.log("SHEESH");
    if (!currentSemester) setCurrentSemester(semesters[0].order);
    console.log(semesters.filter((s) => s.order == currentSemester));
  }, [semesters]);

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
        .then((response) => setToggleEffects(!toggleEffects))
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
          setToggleEffects(!toggleEffects);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let getSemesters = async () => {
    if (authToken != null) {
      fetch("http://127.0.0.1:8000/api/grades/semester", {
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
          let semestersRes = response.results;
          if (semestersRes && semestersRes.length > 0)
            setSemesters(semestersRes);
          else postSemester("Semester 1");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="relative 2xl:w-3/10 xl:w-1/4 lg:w-1/5">
          <div className="lg:absolute flex flex-col w-full">
            <h1 className="text-3xl font-semibold mb-4">&nbsp;</h1>
            {semesters ? (
              semesters.map((s) => <p key={`semester${s.id}`}>{s.name}</p>)
            ) : (
              <></>
            )}
          </div>
        </div>
        <Semester
          model={semesters.filter((s) => s.order == currentSemester)}
        ></Semester>
      </div>
    </>
  );
};
