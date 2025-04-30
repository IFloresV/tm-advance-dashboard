import React, { useState, useEffect } from "react";
import Service from "@api/services";
import { useAxios } from "@hooks/useAxios";

import UnitsList from "@components/UnitsList";
import MapboxUnitMap from "@components/MapboxUnitMap";

const Dashboard = () => {
   const [fetchUnitsList, dataUnitsList, errorUnitsList, loadingUnitsList, resetUnitsList] = useAxios(
      Service.Telematics.UnitsList,
   );

   const [selectedUnit, setSelectedUnit] = useState(null);
   const handleSelect = (unit) => {
      console.log("unit", unit);
      setSelectedUnit(unit);
   };
   useEffect(() => {
      getUnitList();
   }, []);

   const getUnitList = async () => {
      await fetchUnitsList();
   };

   useEffect(() => {
      console.log("dataUnitsList", dataUnitsList);
   }, [dataUnitsList]);

   useEffect(() => {
      console.log("errorUnitsList", errorUnitsList);
   }, [errorUnitsList]);

   return (
      <div className="h-screen p-6">
         <div className="bg-gray-100 rounded-2xl shadow-md h-[calc(100vh-64px)] p-4">
            {loadingUnitsList && <p>Cargando unidades...</p>}
            {dataUnitsList?.data && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                  <div className="overflow-y-auto">
                     <UnitsList data={dataUnitsList.data} onSelect={handleSelect} />
                  </div>
                  <div className="flex ">
                     {selectedUnit ? (
                        <MapboxUnitMap data={selectedUnit} />
                     ) : (
                        <div className="text-center text-gray-500 p-4">Selecciona una unidad para ver su ubicación</div>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
