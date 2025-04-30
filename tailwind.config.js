// tailwind.config.js
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
   theme: {
      extend: {
         colors: {
            dark: {
               primary: "#2e3030", // Fondo principal oscuro
               secondary: "#1e1e1e", // Paneles o tarjetas
               text: "#e0e0e0", // Texto principal en modo oscuro
               muted: "#a0a0a0", // Texto secundario o menos destacado
               border: "#2e2e2e", // Borde oscuro para separaciones
               hover: "#2c2c2c", // Color de hover
            },
            light: {
               primary: "#ffffff", // Fondo blanco
               secondary: "#f5f5f5", // Paneles o tarjetas
               text: "#1e1e1e", // Texto principal en modo claro
               muted: "#757575", // Texto secundario o menos destacado
               border: "#dcdcdc", // Borde claro para separaciones
               hover: "#f0f0f0", // Color de hover
            },
         },
      },
   },

   plugins: [require("flowbite/plugin")],
};
