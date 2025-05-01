import { useEffect, useContext } from "react";
import ThemeContext from "@context/ThemeContext";

const SwitchTheme = () => {
   const { theme, dispatchTheme } = useContext(ThemeContext);

   useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";

      if (savedTheme === "dark") {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }

      dispatchTheme({ type: savedTheme });
   }, [dispatchTheme]);

   const changeTheme = (e) => {
      const isDark = e.target.checked;
      const newTheme = isDark ? "dark" : "light";

      if (isDark) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", newTheme);
      dispatchTheme({ type: newTheme });
   };

   return (
      <div className="flex items-center gap-2">
         <label className="flex items-center cursor-pointer">
            <input type="checkbox" onChange={changeTheme} checked={theme.theme === "dark"} className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full dark:bg-gray-600 peer-checked:bg-green-400 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all"></div>
         </label>
      </div>
   );
};

export default SwitchTheme;
