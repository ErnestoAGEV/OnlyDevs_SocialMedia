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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto h-16 md:h-screen p-1.5 md:p-3 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-lg transition-all duration-300 flex flex-row md:flex-col border-t md:border-t-0 border-gray-100 dark:border-gray-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:shadow-none">
      {/*LOGO - oculto en móvil*/}
      <div className="hidden md:flex h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 text-white font-bold text-sm justify-center items-center m-2 shadow-lg shadow-primary/25">OD</div>
      {/*NAV*/}
      <nav className="flex-1 flex flex-row md:flex-col gap-0.5 md:gap-1 items-center justify-around md:justify-start md:mt-2">
        {links.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center flex-col md:flex-row gap-0.5 md:gap-3 p-2 md:p-2.5 rounded-xl font-medium transition-all md:w-full justify-center md:justify-start ${
                  item.showMobile ? "" : "hidden md:flex"
                } ${
                  isActive
                    ? "text-primary bg-primary/10 dark:bg-primary/15"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
                }`
              }
            >
              <Icon icon={item.icon} className="w-6 h-6" />
              <span className="text-[9px] md:text-sm">{item.label}</span>
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
