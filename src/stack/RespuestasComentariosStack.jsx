import { useMutation, useQuery } from "@tanstack/react-query";
import { useRespuestasComentariosStore } from "../store/RespuestasComentariosStore";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { useUsuariosStore } from "../store/UsuariosStore";
import { toast } from "sonner";
import { useComentariosStore } from "../store/ComentariosStore";

export const useInsertarRespuestasComentariosMutate = (p) => {
  const {
    insertarRespuestaComentarios,
    respuestaActivaParaComentarioId,
  } = useRespuestasComentariosStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const fechaActual = useFormattedDate();
  return useMutation({
    mutationKey: ["insertar respuesta a comentario"],
    mutationFn: () => insertarRespuestaComentarios({
      id_comentario: respuestaActivaParaComentarioId,
      comentario: p.respuesta,
      fecha: fechaActual,
      id_usuario: dataUsuarioAuth?.id,
    }),
    onError: (error) => {
      toast.error("Error al insertar respuesta: " + error.message);
    },
    onSuccess: () => {
      toast.success("Respuesta enviada");
      p.setRespuesta("");
    },
  });
};

export const useMostrarRespuestaComentariosQuery = () => {
  const { mostrarRespuestaAComentarios } = useRespuestasComentariosStore();
  const { itemSelect } = useComentariosStore();
  return useQuery({
    queryKey: ["mostrar respuesta comentarios", { id_comentario: itemSelect?.id }],
    queryFn: () => mostrarRespuestaAComentarios({ 
      id_comentario: itemSelect?.id }),enabled:!!itemSelect,
  });
};