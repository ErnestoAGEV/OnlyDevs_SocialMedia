import { useRelativeTime } from "../../hooks/useRelativeTime";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";
import { InputRespuestaComentario } from "./InputRespuestaComentario";
import { RespuestaCard } from "./RespuestaCard";

export const ComentarioCard = ({ item }) => {
  const {
    respuestaActivaParaComentarioId,
    limpiarRespuestaActiva,
    setRespuestaActiva,
    dataRespuestaComentario,
  } = useRespuestasComentariosStore();
  const { setItemSelect, itemSelect: itemSelectComentario } =
    useComentariosStore();

  return (
    <div className="pl-2 md:pl-4">
      <div className="flex items-start gap-2 group relative w-full">
        <img
          src={item?.foto_usuario}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0 relative">
          <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-xs md:text-sm w-fit max-w-[95%] md:max-w-[90%] flex gap-2">
            <section>
              <span className="font-semibold block text-[10px] md:text-xs">
                {item?.nombre_usuario}
              </span>
              <p className="break-words">{item?.comentario}</p>
            </section>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-gray-500 ml-2 relative">
            <span>{useRelativeTime(item?.fecha)}</span>
            <button
              className="hover:underline cursor-pointer"
              onClick={() =>
                respuestaActivaParaComentarioId === item?.id
                  ? limpiarRespuestaActiva()
                  : setRespuestaActiva(item?.id)
              }
            >
              {respuestaActivaParaComentarioId === item?.id
                ? "Cancelar"
                : "Responder"}
            </button>
          </div>
          {item?.respuestas_count > 0 && (
            <button
              className="text-gray-400 my-2 text-xs hover:underline cursor-pointer"
              onClick={() => setItemSelect(item)}
            >
              {item?.respuestas_count === 1
                ? `Ver ${item?.respuestas_count} respuesta`
                : `Ver las ${item?.respuestas_count} respuestas`}
            </button>
          )}
          {itemSelectComentario?.id === item.id &&
            dataRespuestaComentario?.map((item, index) => {
              return <RespuestaCard item={item}/>;
            })}
          {respuestaActivaParaComentarioId === item?.id && (
            <div>
              <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute bottom-18 -ml-[29px]" />
              <InputRespuestaComentario />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
