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
    onSuccess: async () => {
      p.setComentario("");
      setShowModal();
      toast.success("Comentario agregado");

      // Remover completamente el cache y refetch
      queryClient.removeQueries({ queryKey: ["mostrar post"] });
      await queryClient.refetchQueries({
        queryKey: ["mostrar post"],
        type: "active",
      });
    },
  });
};

export const useMostrarComentariosQuery = () => {
  const { mostrarComentarios } = useComentariosStore();
  const { itemSelect } = usePostStore();
  return useQuery({
    queryKey: ["mostrar comentarios", { _id_publicacion: itemSelect?.id }],
    queryFn: () => mostrarComentarios({ _id_publicacion: itemSelect?.id }),
  });
};
