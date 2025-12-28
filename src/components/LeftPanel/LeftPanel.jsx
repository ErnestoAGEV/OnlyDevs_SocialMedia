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
    <aside className="hidden lg:flex flex-col w-[280px] shrink-0 p-4 space-y-4 h-full overflow-y-auto scrollbar-hide">
      {/* Mini Perfil Card */}
      <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
        {/* Banner */}
        <div className="h-16 bg-gradient-to-r from-primary to-blue-400 rounded-xl -mx-2 -mt-2 mb-8 relative">
          <img
            src={dataUsuarioAuth?.foto_perfil}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border-4 border-gray-50 dark:border-neutral-900 absolute -bottom-8 left-4"
          />
        </div>
        {/* Info */}
        <div className="mt-2">
          <h3 className="font-bold text-base">{dataUsuarioAuth?.nombre}</h3>
          <p className="text-gray-500 text-sm">@{dataUsuarioAuth?.nombre?.toLowerCase().replace(/\s/g, '')}</p>
          {dataUsuarioAuth?.bio && (
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
              {dataUsuarioAuth?.bio}
            </p>
          )}
        </div>
        {/* Stats */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center flex-1 min-w-0">
            <span className="font-bold text-base block">0</span>
            <span className="text-[10px] text-gray-500 truncate block">Posts</span>
          </div>
          <div className="text-center flex-1 min-w-0">
            <span className="font-bold text-base block">0</span>
            <span className="text-[10px] text-gray-500 truncate block">Seguidores</span>
          </div>
          <div className="text-center flex-1 min-w-0">
            <span className="font-bold text-base block">0</span>
            <span className="text-[10px] text-gray-500 truncate block">Siguiendo</span>
          </div>
        </div>
        {/* Link a perfil */}
        <Link
          to="/mi-perfil"
          className="flex items-center justify-center gap-2 mt-4 py-2 w-full rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
        >
          <Icon icon="mdi:account" className="text-lg" />
          Mi Perfil
        </Link>
      </div>

      {/* Usuarios Sugeridos */}
      <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-base mb-4 flex items-center gap-2">
          <Icon icon="mdi:account-plus" className="text-primary" />
          A quién seguir
        </h3>
        <div className="space-y-3">
          {usuariosSugeridos?.map((usuario) => (
            <div
              key={usuario.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <img
                src={usuario.foto_perfil}
                alt={usuario.nombre}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{usuario.nombre}</p>
                <p className="text-xs text-gray-500 truncate">
                  @{usuario.nombre?.toLowerCase().replace(/\s/g, '')}
                </p>
              </div>
              <button className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-full transition-colors">
                Seguir
              </button>
            </div>
          ))}
          {(!usuariosSugeridos || usuariosSugeridos.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-4">
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
      <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-base mb-4 flex items-center gap-2">
          <Icon icon="mdi:fire" className="text-orange-500" />
          Tendencias
        </h3>
        <div className="space-y-3">
          {["#JavaScript", "#React", "#OnlyDevs", "#CodingLife", "#WebDev"].map(
            (tag, index) => (
              <div
                key={tag}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-sm">{tag}</p>
                  <p className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 500 + 100)} publicaciones
                  </p>
                </div>
                <span className="text-xs text-gray-400">#{index + 1}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-gray-400 space-x-2 px-2">
        <a href="#" className="hover:underline">Términos</a>
        <span>·</span>
        <a href="#" className="hover:underline">Privacidad</a>
        <span>·</span>
        <a href="#" className="hover:underline">Cookies</a>
        <p className="mt-2">© 2025 OnlyDevs</p>
      </div>
    </aside>
  );
};
