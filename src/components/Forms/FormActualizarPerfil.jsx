import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { ImageSelectorFoto } from "../../hooks/useImageSelectorFoto";
import { useEditarFotoUserMutate } from "../../stack/UsuariosStack";
import { useGlobalStore } from "../../store/GlobalStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useRef, useEffect, useState } from "react";

export const FormActualizarPerfil = () => {
  const { setStateFormPerfil, setFile, setFileUrl } = useGlobalStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: dataUsuarioAuth?.nombre || "",
      bio: dataUsuarioAuth?.bio || "",
      ubicacion: dataUsuarioAuth?.ubicacion || "",
      sitio_web: dataUsuarioAuth?.sitio_web || "",
      fecha_nacimiento: dataUsuarioAuth?.fecha_nacimiento || "",
    },
  });

  const { mutate, isPending } = useEditarFotoUserMutate();

  // Limpiar archivo y cerrar con animación
  const handleClose = () => {
    setIsClosing(true);
    // Limpiar archivo seleccionado al cerrar
    setFile([]);
    setFileUrl("-");
    setTimeout(() => {
      setStateFormPerfil();
    }, 200);
  };

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-neutral-900 w-full md:max-w-lg md:rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isClosing
            ? "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
            : "translate-y-0 md:scale-100"
        } max-h-[95vh] md:max-h-[85vh] rounded-t-3xl md:rounded-2xl flex flex-col`}
      >
        {/* Drag indicator móvil */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="text-xl" />
            </button>
            <h1 className="text-lg font-bold">Editar perfil</h1>
          </div>
          <button
            type="submit"
            form="form-perfil"
            disabled={isPending || isSubmitting}
            className="px-5 py-1.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Icon icon="mdi:loading" className="text-lg animate-spin" />
            ) : (
              "Guardar"
            )}
          </button>
        </header>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Banner / Portada */}
          <div className="relative h-32 md:h-40 bg-gradient-to-r from-primary via-blue-400 to-cyan-400">
            <button className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/60 rounded-full">
                  <Icon icon="mdi:camera-plus" className="text-2xl text-white" />
                </div>
                <div className="p-3 bg-black/60 rounded-full">
                  <Icon icon="mdi:close" className="text-2xl text-white" />
                </div>
              </div>
            </button>
          </div>

          {/* Foto de perfil */}
          <div className="relative px-4">
            <div className="absolute -top-16 md:-top-20">
              <div className="relative group">
                <ImageSelectorFoto />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Icon icon="mdi:camera" className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form
            id="form-perfil"
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 pt-20 md:pt-24 pb-6 space-y-5"
          >
            {/* Nombre */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                className={`peer w-full px-4 pt-6 pb-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.nombre
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-gray-300 dark:border-gray-600 focus:ring-primary/30 focus:border-primary"
                }`}
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                })}
              />
              <label
                className={`absolute left-4 top-4 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs ${
                  errors.nombre
                    ? "text-red-500"
                    : "text-gray-500 peer-focus:text-primary"
                }`}
              >
                Nombre
              </label>
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <Icon icon="mdi:alert-circle" />
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="relative">
              <textarea
                placeholder=" "
                rows={3}
                maxLength={160}
                className="peer w-full px-4 pt-6 pb-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                {...register("bio", {
                  maxLength: {
                    value: 160,
                    message: "Máximo 160 caracteres",
                  },
                })}
              />
              <label className="absolute left-4 top-4 text-sm text-gray-500 peer-focus:text-primary transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Biografía
              </label>
              <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                160
              </span>
            </div>

            {/* Ubicación */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon icon="mdi:map-marker-outline" />
              </div>
              <input
                type="text"
                placeholder=" "
                className="peer w-full pl-10 pr-4 pt-6 pb-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                {...register("ubicacion")}
              />
              <label className="absolute left-10 top-4 text-sm text-gray-500 peer-focus:text-primary transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Ubicación
              </label>
            </div>

            {/* Sitio web */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon icon="mdi:link-variant" />
              </div>
              <input
                type="url"
                placeholder=" "
                className="peer w-full pl-10 pr-4 pt-6 pb-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                {...register("sitio_web")}
              />
              <label className="absolute left-10 top-4 text-sm text-gray-500 peer-focus:text-primary transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Sitio web
              </label>
            </div>

            {/* Fecha de nacimiento (solo visual) */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon icon="mdi:cake-variant-outline" />
              </div>
              <input
                type="date"
                className="peer w-full pl-10 pr-4 pt-6 pb-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-gray-700 dark:text-gray-200"
                {...register("fecha_nacimiento")}
              />
              <label className="absolute left-10 top-2 text-xs text-gray-500 peer-focus:text-primary transition-all pointer-events-none">
                Fecha de nacimiento
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
