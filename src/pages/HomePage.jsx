import React from "react";
import { SemesterList } from "../components/SemesterList";
import { SemesterView } from "../components/SemesterView";

export const HomePage = () => {
  return (
    <>
      <div className="p-5">
        <SemesterList></SemesterList>
        <SemesterView></SemesterView>
      </div>
    </>
  );
};
