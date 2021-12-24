import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Semester } from "../components/Semester";

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

  return (
    <>
      <div className="p-5">
        <div className="relative 2xl:w-3/10 xl:w-1/4 lg:w-1/5">
          <div className="lg:absolute flex flex-col w-full pr-5 max-w-md">
            <h1 className="text-3xl font-semibold mb-4">&nbsp;</h1>
            {semesters ? (
              semesters.map((s) => (
                <div className="flex justify-between group hover:bg-white rounded-md">
                  <p key={`semester${s.id}`} className="p-2">
                    {s.name}
                  </p>
                  <div className="w-max pl-8 p-2 hidden group-hover:flex flex-row gap-1 items-center">
                    <a class="text-gray-700 hover:text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                    <a class="text-gray-700 hover:text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </a>
                    <a class="text-gray-700 hover:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <Semester model={currentSemester}></Semester>
      </div>
    </>
  );
};
