import React, { useState, useEffect } from "react";
import Service from "@api/services";
import { useAxios } from "@hooks/useAxios";

import UnitsList from "@components/UnitsList";

const Dashboard = () => {
   const [fetchUnitsList, dataUnitsList, errorUnitsList, loadingUnitsList, resetUnitsList] = useAxios(
      Service.Telematics.UnitsList,
   );

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
      <div className="h-screen p-4">
         <div className="bg-gray-100 rounded-2xl shadow-md h-[calc(100vh-64px)] p-4">
            {loadingUnitsList && <p>Cargando unidades...</p>}
            {errorUnitsList && <p className="text-red-500">Error: {errorUnitsList}</p>}
            {dataUnitsList && (
               <div className="h-full overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Lista de Unidades</h2>
                  <UnitsList data={dataUnitsList.data} />
               </div>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
