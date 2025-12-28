import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { LeftPanel } from "../components/LeftPanel/LeftPanel";
import { useMostrarUsuariosAuthQuery } from "../stack/UsuariosStack";

export const MainLayout = () => {
  const { isLoading, error } = useMostrarUsuariosAuthQuery();
    if (isLoading) {
      return <span>cargando data...</span>;
    }
    if (error) {
      return <span>error al cargar usuarios...{error.message}</span>;
    }
  return (
    <main className="flex justify-center h-screen overflow-hidden bg-white dark:bg-bg-dark text-black dark:text-white transition-colors duration-300">
      <section className="flex flex-col md:flex-row w-full max-w-[1400px] h-full">
        <LeftPanel />
        <section className="flex-1 px-2 md:px-4 overflow-y-auto scrollbar-hide h-full pb-20 md:pb-0 border-x border-gray-200 dark:border-gray-800">
          <Outlet />
        </section>
        <Sidebar />
      </section>
    </main>
  );
};
