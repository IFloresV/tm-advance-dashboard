import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZmxvcmVzbWFwIiwiYSI6ImNtYTNoYWZ6aTB3ZmUyc3EyeXNucDU3dnIifQ.rfCZmItA1Dfv6PN4P20E0g";

const mapStyles = {
   Streets: "mapbox://styles/mapbox/streets-v11",
   Satellite: "mapbox://styles/mapbox/satellite-v9",
   Dark: "mapbox://styles/mapbox/dark-v10",
   Light: "mapbox://styles/mapbox/light-v10",
};

const MapboxUnitMap = ({ data }) => {
   const { lat, lng, label, vin } = data;

   const mapContainer = useRef(null);
   const map = useRef(null);
   const markerRef = useRef(null);
   const [style, setStyle] = useState(mapStyles.Streets);

   useEffect(() => {
      if (!lat || !lng) return;

      if (map.current) {
         map.current.setStyle(style);
         map.current.setCenter([lng, lat]);

         if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);

            const newPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <div style="font-size: 14px; font-weight: 500; line-height: 1.4;">
                        <div><strong>Unidad:</strong> ${label}</div>
                        <div><strong>VIN:</strong> ${vin}</div>
                    </div>
   `);

            markerRef.current.setPopup(newPopup);
            markerRef.current.togglePopup(); // Opcional: para reabrirlo automáticamente
         } else {
            markerRef.current = new mapboxgl.Marker()
               .setLngLat([lng, lat])
               .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div style="font-size: 14px; font-weight: 500; line-height: 1.4;">
        <div><strong>Unidad:</strong> ${label}</div>
        <div><strong>VIN:</strong> ${vin}</div>
      </div>
    `),
               )
               .addTo(map.current);
         }
         return;
      }

      map.current = new mapboxgl.Map({
         container: mapContainer.current,
         style: style,
         center: [lng, lat],
         zoom: 14,
      });

      markerRef.current = new mapboxgl.Marker()
         .setLngLat([lng, lat])
         .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="font-size: 14px; font-weight: 500; line-height: 1.4;">
                <div><strong>Unidad:</strong> ${label}</div>
                <div><strong>VIN:</strong> ${vin}</div>
            </div>
    `),
         )
         .addTo(map.current);
   }, [lat, lng, label, vin, style]);

   return (
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
         {/* Selector superpuesto con botones */}
         <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-2 rounded shadow z-10">
            <div className="flex space-x-2">
               {Object.entries(mapStyles).map(([name, url]) => (
                  <button
                     key={name}
                     onClick={() => setStyle(url)}
                     className={`px-2 py-1 text-xs rounded ${
                        style === url ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                     }`}
                  >
                     {name}
                  </button>
               ))}
            </div>
         </div>

         <div ref={mapContainer} className="w-full h-full" />
      </div>
   );
};

export default MapboxUnitMap;
