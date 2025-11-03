import { useMostrarUsuariosAuthQuery } from "../stack/UsuariosStack";

export const MiPerfilPage = () => {
  const { data, isLoading, error } = useMostrarUsuariosAuthQuery();
  if (isLoading) {
    return <span>cargando data...</span>;
  }
  if (error) {
    return <span>error al cargar usuarios...{error.message}</span>;
  }
  return (
    <div className="h-screen bg-amber-300 text-black flex flex-col">
      <span>MiPerfilPage</span>
      <span>Usuario: {data?.nombre}</span>
    </div>
  );
};
