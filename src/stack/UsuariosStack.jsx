import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSuscription } from "../store/AuthStore";
import { useUsuariosStore } from "../store/UsuariosStore";
import { useGlobalStore } from "../store/GlobalStore";
import { toast } from "sonner";

export const useMostrarUsuariosAuthQuery = () => {
  const { mostrarUsuarioAuth } = useUsuariosStore();
  const { user } = useSuscription();
  return useQuery({
    queryKey: ["mostrar user auth"],
    queryFn: () => mostrarUsuarioAuth({ id_auth: user?.id }),
  });
};

export const useEditarFotoUserMutate = () => {
  const { file, setFile, setFileUrl } = useGlobalStore();
  const queryClient = useQueryClient();
  const { editarUsuarios, dataUsuarioAuth } = useUsuariosStore();
  return useMutation({
    mutationKey: ["editar foto user"],
    mutationFn: async (data) => {
      // Preparar objeto con todos los campos del perfil
      const p = {
        id: dataUsuarioAuth?.id,
        nombre: data.nombre,
        bio: data.bio || null,
        ubicacion: data.ubicacion || null,
        sitio_web: data.sitio_web || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
      };
      
      // Si hay archivo nuevo, pasarlo; si no, pasar "-" para que no intente subir
      const archivoNuevo = file?.size !== undefined ? file : "-";
      await editarUsuarios(p, dataUsuarioAuth?.foto_perfil, archivoNuevo);
    },
    onError: (error) => {
      toast.error("Error al editar usuario: " + error.message);
    },
    onSuccess: () => {
      toast.success("Perfil actualizado!");
      // Limpiar el archivo seleccionado
      setFile([]);
      setFileUrl("-");
      // Refrescar los datos del usuario
      queryClient.invalidateQueries(["mostrar user auth"]);
    },
  });
};

export const useContarUsuariosTodosQuery = () => {
  const {contarUsuariosTodos} = useUsuariosStore()
  return useQuery({
    queryKey:["contar usuarios todos"],
    queryFn:contarUsuariosTodos,
  })
}

export const useMostrarUsuariosTodosQuery = () => {
  const { mostrarUsuariosTodos } = useUsuariosStore();
  return useQuery({
    queryKey: ["mostrar usuarios todos"],
    queryFn: mostrarUsuariosTodos,
  });
};