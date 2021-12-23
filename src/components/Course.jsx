import React from "react";

export const Course = () => {
  return (
    <div className="flex gap-3 lg:gap-0">
      <div className="shadow overflow-hidden border-b border-gray-300 sm:rounded-lg">
        <table className="table-fixed w-full">
          <thead className="bg-white border-b-2 border-indigo-600">
            <tr>
              <th
                colSpan="5"
                className="bg-indigo-600 text-white font-medium text-lg"
              >
                Math
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
          <div className="shadow overflow-hidden border-b border-gray-300 sm:rounded-lg">
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
