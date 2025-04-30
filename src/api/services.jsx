import axios from "axios";

const url = "https://www.telematicsadvance.com/api";
const key = import.meta.env.VITE_KEYAPI;

const Service = {
   Telematics: {
      UnitsList: async () => {
         // const endpoint = `${url}/v1/unit/list.json?key=${key}&unit_id=${unitId}`;
         const endpoint = `${url}/v1/unit/list.json?key=${key}`;
         return await axios.get(endpoint, {
            headers: {
               "Content-Type": "application/json",
            },
         });
      },
   },
};
export default Service;
