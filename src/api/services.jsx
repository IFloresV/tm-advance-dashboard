import axios from "axios";

const url = "https://www.telematicsadvance.com/api";
const key = "0480c335c087382c2eb2b41614e84c76414d6c91";

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
