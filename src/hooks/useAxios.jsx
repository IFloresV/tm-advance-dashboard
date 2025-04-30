import { useState } from "react";

export const useAxios = (endpoint) => {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const resetData = () => {
      setData(null);
      setError(null);
      setLoading(false);
   };

   const fetchData = async (...args) => {
      setLoading(true);
      try {
         const response = await endpoint(...args);

         if (response.data.error) {
            setError(response.data.error || "Error desconocido");
            setData(null);
         } else if (response.data) {
            setData(response.data);
            setError(null);
         } else {
            setError("Respuesta inesperada del servidor");
            setData(null);
         }
      } catch (error) {
         setError(error.message);
         setData(null);
      } finally {
         setLoading(false);
      }
   };

   return [fetchData, data, error, loading, resetData];
};
