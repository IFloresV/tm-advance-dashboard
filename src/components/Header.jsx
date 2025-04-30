import React from "react";
import logo from "../assets/Logo.png";
import title from "../assets/Title.png";

import SwitchTheme from "./SwitchTheme";

const Header = () => {
   return (
      <header
         style={{ backgroundColor: "#1d1d1b" }}
         className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full border-b text-sm py-2.5"
      >
         <nav className="flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div>
               <img src={logo} alt="Logo" className="w-8 h-8" />
            </div>

            {/* Contenedor del título centrado */}
            <div className="flex-1 flex justify-center">
               <div className="hidden sm:block">
                  <img src={title} alt="Title" />
               </div>
            </div>

            <div className="ml-auto">
               <SwitchTheme />
            </div>
         </nav>
      </header>
   );
};

export default Header;
