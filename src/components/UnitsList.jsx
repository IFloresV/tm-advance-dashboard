import React, { useState } from "react";

const UnitsList = ({ data }) => {
   const { units } = data;
   const [search, setSearch] = useState("");

   const filteredUnits = units.filter((unit) =>
      `${unit.label} ${unit.vin}`.toLowerCase().includes(search.toLowerCase()),
   );

   return (
      <div className="relative shadow-md rounded-lg max-h-[350px] overflow-hidden w-full">
         <div className="p-2">
            <input
               type="text"
               placeholder="Buscar unidad..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="overflow-y-auto max-h-72 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
               <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                  <tr className="rounded-lg">
                     <th className="px-2 py-1 sm:px-3 sm:py-2 bg-white">Nombre</th>
                     <th className="px-2 py-1 sm:px-3 sm:py-2 bg-white">Estatus</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredUnits.map((unit) => (
                     <tr
                        key={unit.unit_id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                     >
                        <th
                           scope="row"
                           className="flex items-center px-2 py-1 sm:px-3 sm:py-2 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                           <div className="ps-1">
                              <div className="text-[11px] sm:text-base font-semibold">{unit.label}</div>
                              <div className="text-[10px] sm:text-sm text-gray-500">{unit.vin}</div>
                           </div>
                        </th>
                        <td className="px-2 py-1 sm:px-3 sm:py-2">
                           <div className="flex items-center">
                              <div
                                 className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full me-1 ${
                                    unit.state.name === "driving" ? "bg-green-500" : "bg-red-500"
                                 }`}
                              ></div>
                              <span className="text-[11px] sm:text-sm">{unit.state.name}</span>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredUnits.length === 0 && (
                     <tr>
                        <td colSpan="2" className="text-center py-4 text-gray-400 text-sm">
                           No se encontraron resultados.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default UnitsList;
