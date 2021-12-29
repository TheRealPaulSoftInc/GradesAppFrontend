import React, { createContext, useEffect, useState, useContext } from "react";
import { SemesterContext } from "./SemesterContext";
import { AuthContext } from "./AuthContext";
import { ApiUrlContext } from "./ApiUrlContext";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  let { authToken, logoutUser } = useContext(AuthContext);
  let { apiUrl } = useContext(ApiUrlContext);
  let { currentSemesterId } = useContext(SemesterContext);

  let [courses, setCourses] = useState([{}]);
  let [toggleEffects, setToggleEffects] = useState(false);

  useEffect(() => {
    if (currentSemesterId) getCourses(currentSemesterId);
  }, [toggleEffects, currentSemesterId]);

  useEffect(() => {
    if (
      courses &&
      courses[0] &&
      !(Object.keys(courses[0]).length === 0) &&
      Object.getPrototypeOf(courses[0]) === Object.prototype
    ) {
      courses.map((s, i) =>
        updateCourse({ id: s.id, order: i + 1, semester: s.semester }, true)
      );
    }
  }, [courses]);

  let updateCourse = async (body, reorder = false) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/course/${body.id}/`, {
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

  let postCourse = async (body) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/course/`, {
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
          console.log(response);
          setToggleEffects(!toggleEffects);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let getCourses = async (semesterId) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/course/?semester=${semesterId}`, {
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
          setCourses(response);
        })
        .catch((error) => console.log(error.message));
    }
  };

  let deleteCourse = async (id) => {
    if (authToken != null) {
      fetch(`${apiUrl}grades/course/${id}/`, {
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
    courses: courses,
    setCourses: setCourses,

    getCourses: getCourses,
    postCourse: postCourse,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse,
  };

  return (
    <CourseContext.Provider value={contextData}>
      {children}
    </CourseContext.Provider>
  );
};
