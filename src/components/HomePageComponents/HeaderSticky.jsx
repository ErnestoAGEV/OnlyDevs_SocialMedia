import { Icon } from "@iconify/react";
import { useContarUsuariosTodosQuery } from "../../stack/UsuariosStack";

export const HeaderSticky = () => {

  const {data:cantidadUsuarios} = useContarUsuariosTodosQuery()

  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800/50 px-4 md:px-5 py-3 md:py-4 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Inicio</h1>
        <button className="flex gap-2 items-center px-3 py-1.5 rounded-full bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
          <Icon icon="mdi:account-group" className="text-primary" />
          <span className="font-medium text-gray-600 dark:text-gray-300 text-xs md:text-sm">{cantidadUsuarios}</span>
        </button>
      </div>
    </div>
  );
};
