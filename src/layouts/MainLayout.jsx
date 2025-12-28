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
    <main className="flex justify-center h-screen overflow-hidden bg-gray-50 dark:bg-bg-dark text-black dark:text-white transition-colors duration-300">
      <section className="flex flex-col md:flex-row w-full max-w-[1400px] h-full">
        <LeftPanel />
        <section className="flex-1 overflow-y-auto scrollbar-hide h-full pb-20 md:pb-0 bg-white dark:bg-bg-dark md:border-x border-gray-100 dark:border-gray-800/50">
          <Outlet />
        </section>
        <Sidebar />
      </section>
    </main>
  );
};
