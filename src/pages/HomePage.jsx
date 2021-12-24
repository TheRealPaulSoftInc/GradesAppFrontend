import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { SemesterView } from "../components/SemesterView";
import { SemesterListElement } from "../components/SemesterListElement";

export const HomePage = () => {
  let { authToken } = useContext(AuthContext);
  let [semesters, setSemesters] = useState([{}]);
  let [currentSemesterN, setCurrentSemesterN] = useState(null);
  let [currentSemester, setCurrentSemester] = useState({});
  let [toggleEffects, setToggleEffects] = useState(false);

  useEffect(() => {
    getSemesters();
  }, [toggleEffects]);

  useEffect(() => {
    if (semesters && Object.keys(semesters[0]).length != 0) {
      if (!currentSemesterN) setCurrentSemesterN(semesters[0].order);
    }
  }, [semesters]);

  useEffect(() => {
    setCurrentSemester(semesters.find((s) => s.order == currentSemesterN));
  }, [currentSemesterN]);

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

  let handleClickGet = (semester) => {
    setCurrentSemesterN(semester.order);
  };

  let handleClickCreate = () => {
    console.log(2);
  };

  let handleClickEdit = () => {
    console.log(3);
  };

  let handleClickDelete = () => {
    console.log(4);
  };

  return (
    <>
      <div className="p-5">
        <div className="relative 2xl:w-3/10 xl:w-1/4 lg:w-1/5">
          <div className="lg:absolute flex flex-col w-full pr-5 max-w-md">
            <h1 className="text-3xl font-semibold mb-4 hidden lg:block ">
              &nbsp;
            </h1>
            {semesters ? (
              semesters.map((s) => (
                <SemesterListElement
                  key={`semester${s.id}`}
                  value={s}
                  handleClickGet={handleClickGet}
                  handleClickCreate={handleClickCreate}
                  handleClickEdit={handleClickEdit}
                  handleClickDelete={handleClickDelete}
                  isSelected={currentSemester.order == currentSemesterN}
                ></SemesterListElement>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <SemesterView model={currentSemester}></SemesterView>
      </div>
    </>
  );
};
