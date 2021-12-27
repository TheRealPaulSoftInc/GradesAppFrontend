import React from "react";
import { SemesterList } from "../components/SemesterList";
import { SemesterView } from "../components/SemesterView";

export const HomePage = () => {
  return (
    <>
      <div
        className="p-5 overflow-auto"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <SemesterList></SemesterList>
        <SemesterView></SemesterView>
      </div>
    </>
  );
};
