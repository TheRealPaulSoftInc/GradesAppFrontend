import React from "react";

export const CourseElement = (props) => {
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
                {props.value.name ? props.value.name : <div>&nbsp;</div>}
                <div className="absolute right-0 top-0 h-full hidden group-hover:flex content-center pr-1">
                  <button
                    className="text-gray-200 hover:text-white"
                    onClick={() => props.handleClickEdit(props.value)}
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
                Weight (%)
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
            {/* divide-y divide-gray-200 */}
            <tr>
              <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                ga
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-x border-indigo-200">
                ga
              </td>
              <td className="px-6 py-4 whitespace-nowrap">ga</td>
            </tr>
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
