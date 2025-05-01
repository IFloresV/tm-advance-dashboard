import React, { useState } from "react";

const UnitsList = ({ data, onSelect, selectedUnit, setShowModal }) => {
   const { units } = data;
   const [search, setSearch] = useState("");

   const handleDetailClick = () => {
      setShowModal(true);
   };

   const filteredUnits = units.filter((unit) =>
      `${unit.label} ${unit.vin}`.toLowerCase().includes(search.toLowerCase()),
   );

   return (
      <div className="relative shadow-md rounded-lg max-h-[250px] overflow-hidden w-full dark:bg-dark-primary dark:text-dark-text">
         <div className="flex items-center gap-2 p-2">
            <input
               type="text"
               placeholder="Buscar unidad..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text"
            />
            <button
               onClick={handleDetailClick}
               disabled={!selectedUnit}
               className={`px-3 py-1 text-sm rounded-lg ${
                  selectedUnit
                     ? "bg-blue-500 text-white hover:bg-blue-600"
                     : "bg-gray-300 text-gray-600 cursor-not-allowed"
               }`}
            >
               Info
            </button>
         </div>

         <div className="overflow-y-auto max-h-72 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-dark-text rounded-lg">
               <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-primary dark:text-dark-text sticky top-0 z-10">
                  <tr className="rounded-lg">
                     <th className="px-2 py-1 sm:px-3 sm:py-2 bg-white dark:bg-dark-secondary">Nombre</th>
                     <th className="px-2 py-1 sm:px-3 sm:py-2 bg-white dark:bg-dark-secondary">Estatus</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredUnits.map((unit) => (
                     <tr
                        key={unit.unit_id}
                        onClick={() => onSelect(unit)}
                        className="cursor-pointer bg-white border-b hover:bg-gray-100 dark:bg-dark-secondary dark:hover:bg-dark-hover"
                     >
                        <th
                           scope="row"
                           className="flex items-center px-2 py-1 sm:px-3 sm:py-2 text-gray-900 whitespace-nowrap dark:text-dark-text"
                        >
                           <div className="ps-1">
                              <div className="text-[11px] sm:text-base font-semibold">{unit.label}</div>
                              <div className="text-[10px] sm:text-sm text-gray-500 dark:text-dark-muted">
                                 {unit.vin}
                              </div>
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
                        <td colSpan="2" className="text-center py-4 text-gray-400 text-sm dark:text-dark-muted">
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
