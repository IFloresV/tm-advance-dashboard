import React from "react";
import { ThemeProvider } from "@context/ThemeContext";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
const App = () => {
   return (
      <>
         <ThemeProvider>
            <Header />
            <Dashboard />
         </ThemeProvider>
      </>
   );
};

export default App;
