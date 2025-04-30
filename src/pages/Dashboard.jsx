import React, { useState, useEffect } from "react";
import Service from "@api/services";
import { useAxios } from "@hooks/useAxios";

import UnitsList from "@components/UnitsList";
import MapboxUnitMap from "@components/MapboxUnitMap";
import VehicleDetailModal from "@components/VehicleDetailModal";
import StatusGraphic from "../components/StatusGraphic";
import SpeedGraphic from "../components/SpeedGraphic";

const Dashboard = () => {
   const [fetchUnitsList, dataUnitsList, errorUnitsList, loadingUnitsList, resetUnitsList] = useAxios(
      Service.Telematics.UnitsList,
   );

   const [selectedUnit, setSelectedUnit] = useState(null);
   const [showModal, setShowModal] = useState(false);

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
      if (dataUnitsList?.data) {
         //  const speed = dataUnitsList.data.units.filter((unit) => unit.speed !== undefined).map((unit) => unit.speed);
         //  console.log("speed", speed);
         const filteredUnits = dataUnitsList.data.units
            .filter((unit) => unit.speed !== null && unit.speed !== undefined)
            .map((unit) => ({ unit_id: unit.unit_id, speed: unit.speed }));
      }
   }, [dataUnitsList]);

   return (
      <div className=" p-6">
         <div className="bg-gray-100 rounded-2xl shadow-md h-full p-4">
            {loadingUnitsList && <p>Cargando unidades...</p>}
            {dataUnitsList?.data && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                  <div className="overflow-y-auto flex-1">
                     <UnitsList
                        data={dataUnitsList.data}
                        onSelect={handleSelect}
                        selectedUnit={selectedUnit}
                        setShowModal={setShowModal}
                     />
                  </div>
                  <div className="relative flex flex-col lg:flex-row">
                     {selectedUnit ? (
                        <MapboxUnitMap
                           coordinates={{ lat: selectedUnit.lat, lng: selectedUnit.lng }}
                           label={selectedUnit.label}
                           vin={selectedUnit.vin}
                        />
                     ) : (
                        <div className="text-center text-gray-500 p-4">Selecciona una unidad para ver su ubicación</div>
                     )}
                  </div>
                  {dataUnitsList?.data?.units && (
                     <div className="flex flex-col lg:flex-row gap-4 mt-4">
                        <div className="w-full lg:w-1/2">
                           <StatusGraphic units={dataUnitsList.data.units} />
                        </div>
                        <div className="w-full lg:w-1/2">
                           <SpeedGraphic units={dataUnitsList.data.units} />
                        </div>
                     </div>
                  )}
               </div>
            )}
         </div>

         {showModal && <VehicleDetailModal unit={selectedUnit} onClose={() => setShowModal(false)} />}
      </div>
   );
};

export default Dashboard;
