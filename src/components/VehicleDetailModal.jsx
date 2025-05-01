import React from "react";
import { obtenerEstadoVehiculo } from "@utils/DiagnosticIA";

const VehicleDetailModal = ({ unit, onClose }) => {
   if (!unit) return null;

   const { mantenimiento, consumo, velocidad, operacion, motor } = obtenerEstadoVehiculo(unit);

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
         <div className="bg-white dark:bg-dark-primary rounded-lg p-6 w-full max-w-md shadow-lg relative text-gray-800 dark:text-dark-text">
            <button
               onClick={onClose}
               className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-white"
               aria-label="Cerrar"
            >
               ❌
            </button>

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
                  <strong>Distancia recorrida:</strong> {unit.mileage} km
               </div>
               <div className="flex items-center">
                  <strong>Estatus:</strong>
                  <div
                     className={`h-2.5 w-2.5 rounded-full me-1 ml-2 ${
                        unit.state.name === "driving" ? "bg-green-400" : "bg-red-500"
                     }`}
                  ></div>
                  <span className="text-[11px] sm:text-sm">{unit.state.name}</span>
               </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300 dark:border-dark-border" />

            <div className="space-y-2">
               <div>
                  <strong>Mantenimiento:</strong>{" "}
                  <span className={mantenimiento.estado === "⚠️" ? "text-red-500" : "text-green-500"}>
                     {mantenimiento.estado} {mantenimiento.mensaje}
                  </span>
               </div>

               <div>
                  <strong>Consumo de combustible:</strong>{" "}
                  <span className={consumo.estado === "⚠️" ? "text-red-500" : "text-green-500"}>
                     {consumo.estado} {consumo.mensaje}
                  </span>
               </div>

               <div>
                  <strong>Velocidad promedio:</strong>{" "}
                  <span className={velocidad.estado === "⚠️" ? "text-red-500" : "text-green-500"}>
                     {velocidad.estado} {velocidad.mensaje}
                  </span>
               </div>

               <div>
                  <strong>Operación:</strong>{" "}
                  <span className={operacion.estado === "⚠️" ? "text-red-500" : "text-green-500"}>
                     {operacion.estado} {operacion.mensaje}
                  </span>
               </div>

               <div>
                  <strong>Motor:</strong>{" "}
                  <span className={motor.estado === "⚠️" ? "text-red-500" : "text-green-500"}>
                     {motor.estado} {motor.mensaje}
                  </span>
               </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-dark-muted mt-2">
               <span>
                  🤖 <strong>Predicción IA:</strong> Esta recomendación fue generada por un sistema de inteligencia
                  artificial basado en los datos de la unidad. Estas alertas pueden ayudar a mantener el vehículo en
                  condiciones óptimas, mejorando la eficiencia operativa y reduciendo posibles problemas a futuro.
               </span>
            </div>

            <div className="mt-4 text-right">
               <button
                  onClick={onClose}
                  className="bg-green-400 text-white px-4 py-1.5 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
               >
                  Cerrar
               </button>
            </div>
         </div>
      </div>
   );
};

export default VehicleDetailModal;
