import React from "react";
import { SemesterList } from "../components/SemesterList";
import { CourseList } from "../components/CourseList";

export const HomePage = () => {
  return (
    <>
      <div
        className="p-5 overflow-auto"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <SemesterList></SemesterList>
        <CourseList></CourseList>
      </div>
    </>
  );
};
