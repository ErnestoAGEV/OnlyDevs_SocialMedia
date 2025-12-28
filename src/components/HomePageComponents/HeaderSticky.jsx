import { Icon } from "@iconify/react";
import { useContarUsuariosTodosQuery } from "../../stack/UsuariosStack";

export const HeaderSticky = () => {

  const {data:cantidadUsuarios} = useContarUsuariosTodosQuery()

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600 px-3 md:px-4 py-2 md:py-3 bg-white dark:bg-bg-dark">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">INICIO</h1>
        <button className="flex gap-1 md:gap-2 items-center">
          <span className="font-semibold text-gray-500/80 text-xs md:text-base">{cantidadUsuarios} usuarios</span>
          <Icon icon="mage:dots" width="20" height="20" className="md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};
