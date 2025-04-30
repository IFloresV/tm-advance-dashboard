import React, { createContext, useReducer } from "react";

const dark = "dark";
const light = "light";

const initTheme = () => {
   const storedTheme = localStorage.getItem("theme") || light;
   return { theme: storedTheme };
};

const themeReducer = (state, action) => {
   switch (action.type) {
      case dark:
         return { theme: dark };
      case light:
         return { theme: light };
      default:
         return state;
   }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const [theme, dispatchTheme] = useReducer(themeReducer, {}, initTheme);

   return <ThemeContext.Provider value={{ theme, dispatchTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
