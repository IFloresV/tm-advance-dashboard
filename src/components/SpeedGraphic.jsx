import React from "react";
import GaugeChart from "react-gauge-chart";

const SpeedGraphic = ({ speed = 0 }) => {
   return (
      <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow p-4 w-full h-full">
         <h2 className="text-xl font-semibold mb-4 dark:text-dark-text">Velocidad Promedio</h2>
         <GaugeChart
            id="speed-gauge"
            nrOfLevels={10}
            percent={speed / 120}
            textColor="#000000"
            needleColor="#345243"
            needleBaseColor="#345243"
            formatTextValue={(val) => `${(speed ?? 0).toFixed(1)} km/h`}
            arcWidth={0.2}
         />
      </div>
   );
};

export default SpeedGraphic;
