import React, { useContext, useEffect } from "react";
import { CourseContext } from "../context/CourseContext";
import { SemesterContext } from "../context/SemesterContext";
import { Course } from "./Course";

export const SemesterView = (props) => {
  let { currentSemester } = useContext(SemesterContext);
  let { courses, postCourse } = useContext(CourseContext);

  let handleOnClick = (e) => {
    let name = "Course " + courses.length;
    postCourse({ name: name, semester: currentSemester.id });
  };

  useEffect(() => {
    courses.map((c) => console.log(c));
  }, []);

  return (
    <div className="mx-auto 2xl:w-2/5 xl:w-1/2 lg:w-1/2">
      <h1 className="text-3xl font-semibold mb-4">{currentSemester.name}</h1>
      <div className="flex flex-col justify-center gap-8">
        {courses.length > 0 ? (
          courses.map((c) => <Course model={c} key={`course${c.id}`}></Course>)
        ) : (
          <></>
        )}
        <button
          onClick={(e) => handleOnClick(e)}
          className="mx-auto ring-offset-2 rounded-lg shadow-md hover:shadow-sm overflow-hidden focus:ring focus:ring-indigo-500 h-10 w-10 duration-150"
        >
          <div className="bg-white h-10 w-10 flex justify-center hover:bg-indigo-500 duration-150 text-gray-500 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 self-center"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
