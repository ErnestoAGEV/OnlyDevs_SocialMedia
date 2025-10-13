import { Icon } from "@iconify/react";

export const BtnLogout = () => {
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-start cursor-pointer">
      <Icon icon="material-symbols:logout" width="24" height="24" />
      <spa className="hidden sm:block">Cerrar sesión</spa>
    </button>
  );
};
