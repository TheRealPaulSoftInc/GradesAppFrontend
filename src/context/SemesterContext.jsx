import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const SemesterContext = createContext();

export const SemesterProvider = ({ children }) => {
  let { authToken } = useContext(AuthContext);
  let [semesters, setSemesters] = useState([{}]);
  let [currentSemester, setCurrentSemester] = useState({});
  let [currentSemesterId, setCurrentSemesterId] = useState(null);
  let [toggleEffects, setToggleEffects] = useState(false);

  useEffect(() => {
    getSemesters();
  }, [toggleEffects]);

  useEffect(() => {
    if (semesters && Object.keys(semesters[0]).length != 0) {
      semesters.map((s, i) => updateSemester({ id: s.id, order: i + 1 }, true));
      if (!currentSemesterId) {
        setCurrentSemesterId(semesters[0].id);
      }
    }
  }, [semesters]);

  useEffect(() => {
    setCurrentSemester(semesters.find((s) => s.id == currentSemesterId));
  }, [currentSemesterId]);

  let updateSemester = async (body, reorder = false) => {
    if (authToken != null) {
      fetch(`http://127.0.0.1:8000/api/grades/semester/${body.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((message) => {
              throw new Error(message);
            });
          else return res.json();
        })
        .then((response) => {
          if (!reorder) setToggleEffects(!toggleEffects);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let postSemester = async (body) => {
    if (authToken != null) {
      fetch("http://127.0.0.1:8000/api/grades/semester/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
        body: JSON.stringify(body),
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
      fetch("http://127.0.0.1:8000/api/grades/semester/?limit=12", {
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

  let deleteSemester = async (id) => {
    if (authToken != null) {
      fetch(`http://127.0.0.1:8000/api/grades/semester/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.ok)
            return res.text().then((message) => {
              throw new Error(message);
            });
        })
        .then(() => {
          setToggleEffects(!toggleEffects);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let contextData = {
    semesters: semesters,
    setSemesters: setSemesters,
    currentSemester: currentSemester,
    setCurrentSemester: setCurrentSemester,
    currentSemesterId: currentSemesterId,
    setCurrentSemesterId: setCurrentSemesterId,

    getSemesters: getSemesters,
    postSemester: postSemester,
    updateSemester: updateSemester,
    deleteSemester: deleteSemester,
  };

  return (
    <SemesterContext.Provider value={contextData}>
      {children}
    </SemesterContext.Provider>
  );
};
