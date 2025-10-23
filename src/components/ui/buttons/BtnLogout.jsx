import { Icon } from "@iconify/react";
import { useAuthStore } from "../../../store/AuthStore";

export const BtnLogout = () => {
  const {cerrarSesion} = useAuthStore()
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center sm:justify-start cursor-pointer" onClick={cerrarSesion}>
      <Icon icon="material-symbols:logout" width="24" height="24" />
      <spa className="hidden sm:block">Cerrar sesión</spa>
    </button>
  );
};
