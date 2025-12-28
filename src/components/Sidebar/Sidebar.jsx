import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { BtnToggleTheme } from "../ui//buttons/BtnToggleTheme";
import { BtnLogout } from "../ui/buttons/BtnLogout";
import { BtnNewPost } from "../ui/buttons/BtnNewPost";

export const Sidebar = () => {
  const links = [
    {
      label: "Inicio",
      icon: "ic:baseline-home",
      to: "/",
      showMobile: true,
    },
    {
      label: "Notificaciones",
      icon: "ic:baseline-notifications",
      to: "/notificaciones",
      showMobile: true,
    },
    {
      label: "Mensajes",
      icon: "ic:baseline-message",
      to: "/mensajes",
      showMobile: true,
    },
    {
      label: "Colecciones",
      icon: "ic:baseline-collections-bookmark",
      to: "/colecciones",
      showMobile: false,
    },
    {
      label: "Suscripciones",
      icon: "ic:baseline-person",
      to: "/suscripciones",
      showMobile: false,
    },
    {
      label: "Añadir Tarjeta",
      icon: "ic:baseline-credit-card",
      to: "/tarjeta",
      showMobile: false,
    },
    {
      label: "Mi Perfil",
      icon: "ic:baseline-account-circle",
      to: "/mi-perfil",
      showMobile: true,
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto h-14 md:h-screen p-1 md:p-2 bg-white dark:bg-bg-dark transition-all duration-300 flex flex-row md:flex-col border-t md:border-t-0 border-gray-200 dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:shadow-none">
      {/*LOGO - oculto en móvil*/}
      <div className="hidden md:flex h-8 w-8 rounded-full bg-blue-100 text-primary font-bold text-xs justify-center items-center m-2">OD</div>
      {/*NAV*/}
      <nav className="flex-1 flex flex-row md:flex-col gap-0 md:gap-2 items-center justify-around md:justify-start">
        {links.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center flex-col md:flex-row gap-0.5 md:gap-3 p-1.5 md:p-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all md:w-full justify-center md:justify-start ${
                  item.showMobile ? "" : "hidden md:flex"
                } ${
                  isActive
                    ? "text-primary dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <Icon icon={item.icon} className="w-6 h-6 md:w-6 md:h-6" />
              <span className="text-[10px] md:text-sm md:block">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="hidden md:block">
        <BtnToggleTheme/>
        <BtnLogout />
      </div>
      <BtnNewPost />
    </div>
  );
};
