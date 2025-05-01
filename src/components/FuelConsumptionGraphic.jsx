import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
   Chart as ChartJS,
   LineElement,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
   Title,
   PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, Title, PointElement);

const calculateAvgFuelConsumptionByType = (units) => {
   const fuelConsumptionByType = units.reduce((acc, unit) => {
      if (unit.avg_fuel_consumption?.norm) {
         const type = unit.icon || "desconocido";
         if (!acc[type]) acc[type] = [];
         acc[type].push(unit.avg_fuel_consumption.norm);
      }
      return acc;
   }, {});

   return Object.keys(fuelConsumptionByType).map((type) => {
      const avg = fuelConsumptionByType[type].reduce((sum, val) => sum + val, 0) / fuelConsumptionByType[type].length;
      return { type, avgFuelConsumption: avg };
   });
};

const FuelConsumptionGraphic = ({ units }) => {
   const avgFuelConsumptionData = useMemo(() => {
      const consumptionData = calculateAvgFuelConsumptionByType(units);
      const labels = consumptionData.map((data) => data.type);
      const data = consumptionData.map((data) => data.avgFuelConsumption);

      return {
         labels,
         datasets: [
            {
               data,
               borderColor: "#FF9F40",
               backgroundColor: "rgba(255, 159, 64, 0.2)",
               fill: true,
               tension: 0.4,
               borderWidth: 2,
            },
         ],
      };
   }, [units]);

   return (
      <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow p-4 w-full">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-dark-text">Consumo de Combustible por Tipo de Unidad</h2>
         </div>
         {avgFuelConsumptionData.labels.length === 0 ? (
            <p className="dark:text-dark-muted">No hay datos para mostrar</p>
         ) : (
            <div className="relative h-56">
               <Line
                  data={avgFuelConsumptionData}
                  options={{
                     responsive: true,
                     plugins: {
                        legend: { display: false },
                     },
                     scales: {
                        x: {
                           beginAtZero: true,
                        },
                        y: {
                           min: 0,
                        },
                     },
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default FuelConsumptionGraphic;
