import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useComentariosStore } from "../store/ComentariosStore";
import { useUsuariosStore } from "../store/UsuariosStore";
import { usePostStore } from "../store/PostStore";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { toast } from "sonner";

export const useInsertarComentarioMutate = (p) => {
  const { insertarComentario, setShowModal } = useComentariosStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const { itemSelect } = usePostStore();
  const fechaActual = useFormattedDate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["insertar comentario"],
    mutationFn: () =>
      insertarComentario({
        comentario: p.comentario,
        id_usuario: dataUsuarioAuth?.id,
        id_publicacion: itemSelect?.id,
        fecha: fechaActual,
      }),
    onError: (error) => {
      toast.error("Error al comentar post: " + error.message);
    },
    onSuccess: () => {
      p.setComentario("");
      toast.success("Comentario agregado");
      
      // Invalidar queries manualmente para actualización inmediata
      queryClient.invalidateQueries({ queryKey: ["mostrar comentarios"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["mostrar post"], exact: false });
    },
  });
};

export const useMostrarComentariosQuery = () => {
  const { mostrarComentarios } = useComentariosStore();
  const { itemSelect } = usePostStore();
  return useQuery({
    queryKey: ["mostrar comentarios", { _id_publicacion: itemSelect?.id }],
    queryFn: () => mostrarComentarios({ _id_publicacion: itemSelect?.id }),
    enabled: !!itemSelect?.id,
  });
};
