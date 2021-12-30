import React, { useContext, useEffect } from "react";
import { CourseContext } from "../context/CourseContext";
import { SemesterContext } from "../context/SemesterContext";
import { CourseElement } from "./CourseElement";
import { GradeProvider } from "../context/GradeContext";

export const CourseList = (props) => {
  let { currentSemester } = useContext(SemesterContext);
  let { courses, postCourse, deleteCourse, updateCourse } =
    useContext(CourseContext);

  let handleOnCreate = (e) => {
    let name = "Course " + (courses.length + 1);
    postCourse({ name: name, semester: currentSemester.id });
  };

  let handleClickEdit = (course, setIsEditing) => {
    return () => {
      let element = document.getElementById(`courseEdit${course.id}`);
      let value = element.getElementsByTagName("input")[0].value;
      if (value) {
        updateCourse({
          name: value,
          id: course.id,
          semester: course.semester,
        });
      }
      setIsEditing(false);
    };
  };

  let handleClickDelete = (id) => {
    deleteCourse(id);
  };

  return (
    <div className="mx-auto 2xl:w-2/5 xl:w-1/2 lg:w-1/2">
      <h1 className="text-3xl font-semibold mb-4">{currentSemester.name}</h1>
      <div className="flex flex-col justify-center gap-8">
        {courses.length > 0 ? (
          courses.map((c) => (
            <div key={`course${c.id}`}>
              <GradeProvider courseId={c.id}>
                <CourseElement
                  value={c}
                  handleClickEdit={handleClickEdit}
                  handleClickDelete={handleClickDelete}
                ></CourseElement>
              </GradeProvider>
            </div>
          ))
        ) : (
          <></>
        )}
        <button
          onClick={(e) => handleOnCreate(e)}
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
