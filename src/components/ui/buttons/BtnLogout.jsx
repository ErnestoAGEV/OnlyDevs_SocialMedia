import { Icon } from "@iconify/react";
import { useAuthStore } from "../../../store/AuthStore";

export const BtnLogout = () => {
  const {cerrarSesion} = useAuthStore()
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center md:justify-start cursor-pointer" onClick={cerrarSesion}>
      <Icon icon="material-symbols:logout" width="24" height="24" />
      <span className="hidden md:block">Cerrar sesión</span>
    </button>
  );
};
