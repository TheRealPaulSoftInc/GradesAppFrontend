import React, { useState, useEffect, useContext } from "react";
import OutsideClickHandler from "../utils/OutsideClickHandler";
import { GradeContext } from "../context/GradeContext";
import NumberFormat from "react-number-format";

export const CourseElement = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  let { grades, getGrades, postGrade, deleteGrade, updateGrade } =
    useContext(GradeContext);

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (val > max) {
        val = max;
      }
    }

    return val;
  }

  let gradeFormat = (val) => {
    let integer = limit(val.substring(0, 2), "20");
    let decimal = limit(val.substring(2, 5), "999");
    let decimalFormated = decimal ? "." + decimal : "";
    if (val.length === 0) {
      return "00";
    }
    return integer + decimalFormated;
  };

  let weightFormat = (val) => {
    let integer = limit(val.substring(0, 2), "99");
    let decimal = limit(val.substring(2, 5), "999");
    let decimalFormated = decimal ? "." + decimal : "";
    return integer + decimalFormated + "%";
  };

  let editGrade = ({ grade, name, weight, score }) => {
    let body = { id: grade.id, course: grade.course };
    if (name && name != grade.name) body["name"] = name;
    if (weight && weight != grade.weight) body["weight"] = weight.split("%")[0];
    if (score && score != grade.score) body["score"] = score;
    if (Object.keys(body).length > 2) updateGrade(body);
  };

  return (
    <div className="flex gap-3 lg:gap-0">
      <div className="shadow overflow-hidden border-b border-gray-300 rounded-lg group">
        <table className="table-fixed w-full">
          <thead className="bg-white border-b-2 border-indigo-600">
            <tr>
              <th
                colSpan="5"
                className="bg-indigo-600 text-white font-medium text-lg relative"
              >
                {isEditing ? (
                  <div
                    id={`courseEdit${props.value.id}`}
                    className="w-4/5 mx-auto"
                  >
                    <OutsideClickHandler
                      handleEvent={props.handleClickEdit(
                        props.value,
                        setIsEditing
                      )}
                    >
                      <input
                        type="text"
                        maxLength="25"
                        defaultValue={props.value.name}
                        className="w-full text-black text-center text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1 px-3 my-1.5 shadow rounded-lg duration-150"
                      />
                    </OutsideClickHandler>
                  </div>
                ) : (
                  <>{props.value.name ? props.value.name : <div>&nbsp;</div>}</>
                )}
                <div className="absolute right-0 top-0 h-full hidden group-hover:flex content-center pr-1">
                  <button
                    className="text-gray-200 hover:text-white"
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
                    className="text-gray-200 hover:text-red-500"
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
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan="3"
                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider border-x border-indigo-200"
              >
                Weight
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider"
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {grades ? (
              grades.map((g) => (
                <tr key={`grade${g.id}`}>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="w-full focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm cursor-pointer"
                      type="text"
                      maxLength="25"
                      defaultValue={g.name}
                      onBlur={(e) =>
                        editGrade({ grade: g, name: e.target.value })
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-x border-indigo-200">
                    <NumberFormat
                      className="w-full focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm cursor-pointer"
                      defaultValue={g.weight}
                      onBlur={(e) =>
                        editGrade({ grade: g, weight: e.target.value })
                      }
                      format={weightFormat}
                    ></NumberFormat>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NumberFormat
                      className="w-full focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm cursor-pointer"
                      defaultValue={g.score}
                      onBlur={(e) =>
                        editGrade({ grade: g, score: e.target.value })
                      }
                      format={gradeFormat}
                    ></NumberFormat>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:relative">
        <div className="lg:absolute lg:ml-3">
          <div className="shadow overflow-hidden border-b border-gray-300 rounded-lg">
            <table className="table-fixed ">
              <thead className="bg-white border-b-2 border-indigo-600 ">
                <tr>
                  <th
                    colSpan="5"
                    className="bg-indigo-600 text-white font-medium text-lg"
                  >
                    &nbsp;
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider border-r border-indigo-200"
                  >
                    Target
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider "
                  >
                    Average
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* divide-y divide-gray-200 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-indigo-200">
                    ga
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">ga</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
