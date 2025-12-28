import { Icon } from "@iconify/react";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useMostrarUsuariosTodosQuery } from "../../stack/UsuariosStack";
import { Link } from "react-router-dom";

export const LeftPanel = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { data: usuarios } = useMostrarUsuariosTodosQuery();

  // Filtrar usuarios sugeridos (excluir al usuario actual)
  const usuariosSugeridos = usuarios
    ?.filter((u) => u.id !== dataUsuarioAuth?.id)
    ?.slice(0, 3);

  return (
    <aside className="hidden lg:flex flex-col w-[300px] shrink-0 p-4 space-y-4 h-full overflow-y-auto scrollbar-hide bg-gray-50/50 dark:bg-transparent">
      {/* Mini Perfil Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800/50">
        {/* Banner */}
        <div className="h-20 bg-gradient-to-r from-primary via-blue-400 to-cyan-400 relative">
          <img
            src={dataUsuarioAuth?.foto_perfil}
            alt="avatar"
            className="w-18 h-18 rounded-full object-cover border-4 border-white dark:border-neutral-900 absolute -bottom-9 left-4 shadow-lg"
          />
        </div>
        {/* Info */}
        <div className="pt-12 px-4 pb-4">
          <h3 className="font-bold text-base">{dataUsuarioAuth?.nombre}</h3>
          <p className="text-gray-400 text-sm">@{dataUsuarioAuth?.nombre?.toLowerCase().replace(/\s/g, '')}</p>
          {dataUsuarioAuth?.bio && (
            <p className="text-sm mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
              {dataUsuarioAuth?.bio}
            </p>
          )}
          {/* Stats */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
            <div className="text-center flex-1">
              <span className="font-bold text-lg block">0</span>
              <span className="text-xs text-gray-400">Posts</span>
            </div>
            <div className="text-center flex-1">
              <span className="font-bold text-lg block">0</span>
              <span className="text-xs text-gray-400">Seguidores</span>
            </div>
            <div className="text-center flex-1">
              <span className="font-bold text-lg block">0</span>
              <span className="text-xs text-gray-400">Siguiendo</span>
            </div>
          </div>
          {/* Link a perfil */}
          <Link
            to="/mi-perfil"
            className="flex items-center justify-center gap-2 mt-4 py-2.5 w-full rounded-xl bg-gradient-to-r from-primary to-blue-400 text-white hover:opacity-90 transition-all text-sm font-medium shadow-lg shadow-primary/25"
          >
            <Icon icon="mdi:account" className="text-lg" />
            Mi Perfil
          </Link>
        </div>
      </div>

      {/* Usuarios Sugeridos */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800/50">
        <h3 className="font-bold text-base mb-4 flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Icon icon="mdi:account-plus" className="text-primary text-lg" />
          </div>
          A quién seguir
        </h3>
        <div className="space-y-2">
          {usuariosSugeridos?.map((usuario) => (
            <div
              key={usuario.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
            >
              <img
                src={usuario.foto_perfil}
                alt={usuario.nombre}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{usuario.nombre}</p>
                <p className="text-xs text-gray-400 truncate">
                  @{usuario.nombre?.toLowerCase().replace(/\s/g, '')}
                </p>
              </div>
              <button className="px-4 py-1.5 bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 text-white text-xs font-bold rounded-full transition-colors">
                Seguir
              </button>
            </div>
          ))}
          {(!usuariosSugeridos || usuariosSugeridos.length === 0) && (
            <p className="text-sm text-gray-400 text-center py-6">
              No hay usuarios sugeridos
            </p>
          )}
        </div>
        {usuarios?.length > 3 && (
          <button className="text-primary text-sm font-medium mt-3 hover:underline w-full text-left">
            Mostrar más
          </button>
        )}
      </div>

      {/* Trending / Tendencias */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800/50">
        <h3 className="font-bold text-base mb-4 flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/20">
            <Icon icon="mdi:fire" className="text-orange-500 text-lg" />
          </div>
          Tendencias
        </h3>
        <div className="space-y-1">
          {["#JavaScript", "#React", "#OnlyDevs", "#CodingLife", "#WebDev"].map(
            (tag, index) => (
              <div
                key={tag}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
              >
                <div>
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{tag}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {Math.floor(Math.random() * 500 + 100)} publicaciones
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-300 dark:text-gray-600">#{index + 1}</span>
              </div>
            )
          )}
        </div>
        <button className="text-primary text-sm font-medium mt-3 hover:underline w-full text-left">
          Ver más tendencias
        </button>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-gray-400 space-x-1.5 px-2 pb-4">
        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Términos</a>
        <span>·</span>
        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacidad</a>
        <span>·</span>
        <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Cookies</a>
        <p className="mt-2 text-gray-300 dark:text-gray-600">© 2025 OnlyDevs</p>
      </div>
    </aside>
  );
};
