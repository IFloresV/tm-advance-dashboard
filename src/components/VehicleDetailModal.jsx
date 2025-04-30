import React from "react";

const VehicleDetailModal = ({ unit, onClose }) => {
   if (!unit) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
         <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Detalle de la Unidad</h2>
            <div className="space-y-2 text-sm">
               <div>
                  <strong>Unidad:</strong> {unit.label}
               </div>
               <div>
                  <strong>VIN:</strong> {unit.vin}
               </div>
               <div>
                  <strong>Tipo:</strong> {unit.type}
               </div>
               <div>
                  <strong>Distancia recorrida:</strong> {unit.mileage}
               </div>
               <div className="flex items-center">
                  <strong>Estatus:</strong>
                  <div
                     className={`h-2.5 w-2.5 rounded-full me-1 ml-2 ${
                        unit.state.name === "driving" ? "bg-green-500" : "bg-red-500"
                     }`}
                  ></div>
                  <span className="text-[11px] sm:text-sm">{unit.state.name}</span>
               </div>
            </div>
            <div className="mt-4 text-right">
               <button onClick={onClose} className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600">
                  Cerrar
               </button>
            </div>
         </div>
      </div>
   );
};

export default VehicleDetailModal;
