import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ApiUrlContext } from "./ApiUrlContext";

export const GradeContext = createContext();

export const GradeProvider = ({ courseId, children }) => {
  let { authToken, logoutUser } = useContext(AuthContext);
  let { apiUrl } = useContext(ApiUrlContext);

  let [grades, setGrades] = useState([{}]);
  let [toggleEffects, setToggleEffects] = useState(false);

  useEffect(() => {
    if (courseId) getGrades(courseId);
  }, [toggleEffects]);

  useEffect(() => {
    if (
      grades &&
      grades[0] &&
      !(Object.keys(grades[0]).length === 0) &&
      Object.getPrototypeOf(grades[0]) === Object.prototype
    ) {
      console.log(grades);
      grades.map((g, i) =>
        updateGrade({ id: g.id, order: i + 1, course: g.course }, true)
      );
    }
  }, [grades]);

  let updateGrade = async (body, reorder = false) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/grade/${body.id}/`, {
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
              if (res.status == 401) logoutUser(true);
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

  let postGrade = async (body) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/grade/`, {
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
              if (res.status == 401) logoutUser(true);
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

  let getGrades = async (courseId) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/grade/?course=${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
      })
        .then((res) => {
          if (!res.ok)
            return res.text().then((message) => {
              if (res.status == 401) logoutUser(true);
              throw new Error(message);
            });
          else return res.json();
        })
        .then((response) => {
          if (response && response.length > 0) setGrades(response);
          else
            postGrade({
              name: "Evaluation 1",
              course: courseId,
              weight: 0,
              score: 0,
            });
        })
        .catch((error) => console.log(error.message));
    }
  };

  let deleteGrade = async (id) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/grade/${id}/`, {
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
              if (res.status == 401) logoutUser(true);
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
    grades: grades,
    setGrades: setGrades,

    getGrades: getGrades,
    postGrade: postGrade,
    updateGrade: updateGrade,
    deleteGrade: deleteGrade,
  };

  return (
    <GradeContext.Provider value={contextData}>
      {children}
    </GradeContext.Provider>
  );
};
