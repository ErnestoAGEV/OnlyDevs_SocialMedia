import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUsuariosStore } from "../store/UsuariosStore";
import { useMostrarPostQuery, useMostrarPostsLikedQuery, useMostrarPostsGuardadosQuery } from "../stack/PostStack";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormActualizarPerfil } from "../components/Forms/FormActualizarPerfil";
import { useGlobalStore } from "../store/GlobalStore";

export const MiPerfilPage = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { stateFormPerfil, setStateFormPerfil } = useGlobalStore();
  const [activeTab, setActiveTab] = useState("posts");
  const { data: dataPost } = useMostrarPostQuery();
  const { data: postsLiked, isLoading: isLoadingLiked } = useMostrarPostsLikedQuery();
  const { data: postsGuardados, isLoading: isLoadingGuardados } = useMostrarPostsGuardadosQuery();

  // Filtrar posts del usuario actual
  const misPosts = dataPost?.pages
    ?.flatMap((page) => page)
    ?.filter((post) => post?.id_usuario === dataUsuarioAuth?.id);

  const tabs = [
    { id: "posts", label: "Publicaciones", icon: "mdi:grid" },
    { id: "likes", label: "Me gusta", icon: "mdi:heart" },
    { id: "saved", label: "Guardados", icon: "mdi:bookmark" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark">
      {/* Modal Editar Perfil */}
      {stateFormPerfil && <FormActualizarPerfil />}

      {/* Header con botón atrás en móvil */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-3 md:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-1">
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <div>
            <h1 className="font-bold text-lg">{dataUsuarioAuth?.nombre}</h1>
            <p className="text-xs text-gray-500">{misPosts?.length || 0} publicaciones</p>
          </div>
        </div>
      </header>

      {/* Banner / Cover */}
      <div className="relative">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary via-blue-400 to-cyan-400">
          {/* Aquí podría ir una imagen de portada */}
        </div>
        
        {/* Foto de perfil */}
        <div className="absolute -bottom-16 md:-bottom-20 left-4 md:left-8">
          <div className="relative">
            <img
              src={dataUsuarioAuth?.foto_perfil}
              alt="Foto de perfil"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white dark:border-bg-dark shadow-lg"
            />
            <button 
              onClick={setStateFormPerfil}
              className="absolute bottom-1 right-1 p-2 bg-primary rounded-full text-white shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Icon icon="mdi:camera" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Botón editar perfil (desktop) */}
        <div className="absolute bottom-4 right-4 hidden md:block">
          <button
            onClick={setStateFormPerfil}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Icon icon="mdi:pencil" />
            Editar perfil
          </button>
        </div>
      </div>

      {/* Info del usuario */}
      <div className="pt-20 md:pt-24 px-4 md:px-8">
        {/* Nombre y username */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{dataUsuarioAuth?.nombre}</h1>
            <p className="text-gray-500">@{dataUsuarioAuth?.nombre?.toLowerCase().replace(/\s/g, "")}</p>
          </div>
          
          {/* Botón editar perfil (móvil) */}
          <button
            onClick={setStateFormPerfil}
            className="md:hidden mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Icon icon="mdi:pencil" />
            Editar perfil
          </button>
        </div>

        {/* Bio */}
        <div className="mt-4">
          {dataUsuarioAuth?.bio ? (
            <p className="text-sm md:text-base">{dataUsuarioAuth?.bio}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">Sin biografía aún...</p>
          )}
        </div>

        {/* Info adicional */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          {dataUsuarioAuth?.fecha_nacimiento && (
            <span className="flex items-center gap-1">
              <Icon icon="mdi:cake-variant" />
              {(() => {
                // Parsear la fecha manualmente para evitar problemas de zona horaria
                const [year, month, day] = dataUsuarioAuth.fecha_nacimiento.split('-').map(Number);
                const fecha = new Date(year, month - 1, day);
                return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
              })()}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Icon icon="mdi:calendar" />
            Se unió en Diciembre 2025
          </span>
          {dataUsuarioAuth?.ubicacion && (
            <span className="flex items-center gap-1">
              <Icon icon="mdi:map-marker" />
              {dataUsuarioAuth.ubicacion}
            </span>
          )}
          {dataUsuarioAuth?.sitio_web && (
            <span className="flex items-center gap-1">
              <Icon icon="mdi:link" />
              <a 
                href={dataUsuarioAuth.sitio_web.startsWith('http') ? dataUsuarioAuth.sitio_web : `https://${dataUsuarioAuth.sitio_web}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {dataUsuarioAuth.sitio_web.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4">
          <button className="hover:underline">
            <span className="font-bold">0</span>
            <span className="text-gray-500 ml-1">Siguiendo</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">0</span>
            <span className="text-gray-500 ml-1">Seguidores</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Icon icon={tab.icon} className="text-lg md:hidden" />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden text-xs">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de tabs */}
      <div className="pb-20 md:pb-4">
        {activeTab === "posts" && (
          <div>
            {misPosts?.length > 0 ? (
              misPosts.map((post) => (
                <PublicacionCard key={post.id} item={post} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon icon="mdi:camera-off" className="text-4xl text-gray-400" />
                </div>
                <h3 className="font-bold text-xl mb-2">Aún no hay publicaciones</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Cuando publiques algo, aparecerá aquí.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "likes" && (
          <div>
            {isLoadingLiked ? (
              <div className="flex justify-center py-16">
                <Icon icon="mdi:loading" className="text-4xl text-primary animate-spin" />
              </div>
            ) : postsLiked?.length > 0 ? (
              postsLiked.map((post) => (
                <PublicacionCard key={post.id} item={post} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon icon="mdi:heart-outline" className="text-4xl text-gray-400" />
                </div>
                <h3 className="font-bold text-xl mb-2">Aún no hay me gusta</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Las publicaciones que te gusten aparecerán aquí.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            {isLoadingGuardados ? (
              <div className="flex justify-center py-16">
                <Icon icon="mdi:loading" className="text-4xl text-primary animate-spin" />
              </div>
            ) : postsGuardados?.length > 0 ? (
              postsGuardados.map((post) => (
                <PublicacionCard key={post.id} item={post} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                  <Icon icon="mdi:bookmark-outline" className="text-4xl text-gray-400" />
                </div>
                <h3 className="font-bold text-xl mb-2">Aún no hay guardados</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Las publicaciones que guardes aparecerán aquí.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
