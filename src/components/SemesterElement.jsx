import React, { useState } from "react";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export const SemesterElement = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  let wrapClasses =
    "flex justify-between group hover:bg-white active:bg-slate-50 rounded-md";
  let buttonClasses =
    "p-2 pl-6 text-left text-gray-700 hover:text-gray-500 group-hover:pl-0 w-full";
  if (props.isSelected) {
    wrapClasses += " bg-slate-200";
    buttonClasses += " font-medium";
  }

  return (
    <>
      <div className={wrapClasses}>
        <div
          className="text-gray-700 hover:text-gray-400 py-2 pl-1 hidden group-hover:flex items-center"
          {...props.dragHandleProps}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
        <div id={`semesterLabel${props.value.id}`} className="grow">
          {isEditing ? (
            <OutsideClickHandler
              handleEvent={props.handleClickEdit(props.value, setIsEditing)}
            >
              <div className="px-2 group-hover:px-0">
                <input
                  type="text"
                  maxLength="15"
                  defaultValue={props.value.name}
                  className="w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1 px-3 my-1.5 shadow rounded-lg duration-150"
                />
              </div>
            </OutsideClickHandler>
          ) : (
            <button
              className={buttonClasses}
              onClick={() => props.handleClickGet(props.value)}
            >
              {props.value.name}
            </button>
          )}
        </div>
        <div className="w-max p-2 hidden group-hover:flex flex-row gap-1 items-center">
          <button
            className="text-gray-700 hover:text-gray-400"
            onClick={() => setIsCreating(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="text-gray-700 hover:text-gray-500"
            onClick={() => setIsEditing(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            className="text-gray-700 hover:text-red-500"
            onClick={() => props.handleClickDelete(props.value.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      {isCreating ? (
        <div id={`semesterCreate${props.value.id}`}>
          <OutsideClickHandler
            handleEvent={props.handleClickCreate(props.value, setIsCreating)}
            className="w-full"
          >
            <input
              type="text"
              maxLength="15"
              defaultValue={"Semester " + (props.value.order + 1)}
              className="mt-2 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-lg duration-150"
            />
          </OutsideClickHandler>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
