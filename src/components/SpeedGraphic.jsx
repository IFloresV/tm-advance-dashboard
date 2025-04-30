import React, { useMemo } from "react";
import GaugeChart from "react-gauge-chart";

const SpeedGraphic = ({ units }) => {
   const avgSpeed = useMemo(() => {
      const speeds = units.map((u) => u.speed).filter((s) => typeof s === "number" && !isNaN(s));
      if (speeds.length === 0) return 0;
      const sum = speeds.reduce((accumulador, speed) => accumulador + speed, 0);
      return sum / speeds.length;
   }, [units]);

   const normalizedSpeed = Math.min(avgSpeed / 120, 1);

   return (
      <div className="bg-white rounded-2xl shadow p-4 w-full h-full">
         <h2 className="text-xl font-semibold mb-4">Velocidad Promedio</h2>
         <GaugeChart
            id="speed-gauge"
            nrOfLevels={25}
            percent={normalizedSpeed}
            textColor="#000000"
            needleColor="#345243"
            needleBaseColor="#345243"
            formatTextValue={(val) => `${avgSpeed.toFixed(1)} km/h`}
         />
      </div>
   );
};

export default SpeedGraphic;
