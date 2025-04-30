import React, { useState, useEffect } from "react";
import Service from "@api/services";
import { useAxios } from "@hooks/useAxios";

import UnitsList from "@components/UnitsList";
import MapboxUnitMap from "@components/MapboxUnitMap";
import VehicleDetailModal from "@components/VehicleDetailModal";
import StatusGraphic from "../components/StatusGraphic";
import SpeedGraphic from "../components/SpeedGraphic";
import FuelConsumptionGraphic from "../components/FuelConsumptionGraphic";

const Dashboard = () => {
   const [fetchUnitsList, dataUnitsList, , loadingUnitsList] = useAxios(Service.Telematics.UnitsList);

   const [selectedUnit, setSelectedUnit] = useState(null);
   const [showModal, setShowModal] = useState(false);

   const handleSelect = (unit) => {
      setSelectedUnit(unit);
   };

   useEffect(() => {
      getUnitList();
   }, []);

   const getUnitList = async () => {
      await fetchUnitsList();
   };

   return (
      <div className="bg-light-secondary dark:bg-dark-secondary p-2 min-h-screen flex flex-col">
         <div
            className="rounded-2xl shadow-md flex-1 p-6 bg-light-primary dark:bg-dark-primary
          text-light-text dark:text-dark-text border dark:border-dark-border"
         >
            {loadingUnitsList && <p>Cargando unidades...</p>}
            {dataUnitsList?.data && (
               <>
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
                           <div className="text-center text-gray-500 p-4">
                              Selecciona una unidad para ver su ubicación
                           </div>
                        )}
                     </div>
                  </div>

                  {dataUnitsList?.data?.units && (
                     <div className="flex flex-col lg:flex-row gap-4 mt-4">
                        <div className="w-full lg:w-1/3">
                           <SpeedGraphic speed={selectedUnit?.speed} />
                        </div>
                        <div className="w-full lg:w-1/3">
                           <StatusGraphic units={dataUnitsList.data.units} />
                        </div>
                        <div className="w-full lg:w-1/3">
                           <FuelConsumptionGraphic units={dataUnitsList.data.units} />
                        </div>
                     </div>
                  )}
               </>
            )}
         </div>

         {showModal && <VehicleDetailModal unit={selectedUnit} onClose={() => setShowModal(false)} />}
      </div>
   );
};

export default Dashboard;
