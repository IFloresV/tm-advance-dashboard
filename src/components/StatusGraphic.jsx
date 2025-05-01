import React, { useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const generateColors = (count) => {
   const baseColors = ["#FFCE56", "#FF6384", "#2eba0b", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"];
   return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
};

const StatusGraphic = ({ units }) => {
   const [chartType, setChartType] = useState("bar");

   const statusData = useMemo(() => {
      const statusCount = {};
      units.forEach((unit) => {
         const status = unit.state?.name || "desconocido";
         statusCount[status] = (statusCount[status] || 0) + 1;
      });

      const labels = Object.keys(statusCount);
      const data = Object.values(statusCount);
      const colors = generateColors(labels.length);

      return {
         labels,
         datasets: [
            {
               label: "Unidades",
               data,
               backgroundColor: colors,
               borderColor: colors.map((c) => c.replace("0.6", "1")),
               borderWidth: 1,
            },
         ],
      };
   }, [units]);

   return (
      <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow p-4 w-full">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-dark-text">Unidades Activas</h2>
            <select
               value={chartType}
               onChange={(e) => setChartType(e.target.value)}
               className="border border-gray-300 dark:border-dark-border rounded px-2 py-1 text-sm dark:text-dark-text dark:bg-dark-secondary"
            >
               <option value="bar">Gráfico de Barras</option>
               <option value="pie">Gráfico de Pastel</option>
            </select>
         </div>
         {statusData.labels.length === 0 ? (
            <p className="dark:text-dark-muted">No hay datos para mostrar</p>
         ) : chartType === "bar" ? (
            <div className="relative h-48">
               <Bar
                  data={statusData}
                  options={{
                     responsive: true,
                     plugins: {
                        legend: { display: false },
                     },
                  }}
               />
            </div>
         ) : (
            <div className="relative h-56">
               <Pie
                  data={statusData}
                  options={{
                     maintainAspectRatio: false,
                     responsive: true,
                     plugins: {
                        legend: { position: "bottom" },
                     },
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default StatusGraphic;
