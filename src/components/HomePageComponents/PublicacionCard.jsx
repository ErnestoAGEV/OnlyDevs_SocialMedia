import { Icon } from "@iconify/react";
import { PostImageFrame } from "./PostImageFrame";
import { PostVideoFrame } from "./PostVideoFrame";
import { useLikePostMutate, useGuardarPostMutate } from "../../stack/PostStack";
import { usePostStore } from "../../store/PostStore";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useRelativeTime } from "../../hooks/useRelativeTime";

export const PublicacionCard = ({ item }) => {
  const { setItemSelect } = usePostStore();
  const { mutate: mutateLike } = useLikePostMutate();
  const { mutate: mutateGuardar } = useGuardarPostMutate();
  const { setShowModal } = useComentariosStore();
  
  return (
    <div className="border-b border-gray-100 dark:border-gray-800/50 p-4 md:p-5 hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src={item?.foto_usuario}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm md:text-base truncate max-w-[150px] md:max-w-none hover:text-primary cursor-pointer transition-colors">{item?.nombre_usuario}</span>
            <span className="text-gray-400 text-xs">
              {useRelativeTime(item?.fecha)}
            </span>
          </div>
        </div>
        <button className="p-2 h-fit rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-400 hover:text-gray-600">
          <Icon icon="mdi:dots-horizontal" className="text-xl" />
        </button>
      </div>

      <div className="mt-3 ml-14 md:ml-15">
        <p className="mb-3 text-gray-800 dark:text-gray-200 leading-relaxed">{item?.descripcion}</p>
        <div>
          {item?.url !== "-" &&
            (item?.type === "imagen" ? (
              <PostImageFrame src={item?.url} />
            ) : item?.type === "gif" ? (
              <div className="rounded-2xl overflow-hidden relative border border-gray-100 dark:border-gray-800">
                <img 
                  src={item?.url} 
                  alt="GIF" 
                  className="w-full max-h-[300px] md:max-h-[400px] object-contain bg-gray-900"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-md text-xs text-white font-medium">
                  GIF
                </div>
              </div>
            ) : (
              <PostVideoFrame src={item?.url} />
            ))}
        </div>
        <div className="flex items-center gap-1 mt-4">
          <button
            onClick={() => mutateLike(item)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              item?.like_usuario_actual
                ? "text-pink-500 bg-pink-50 dark:bg-pink-500/10"
                : "text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10"
            }`}
          >
            <Icon
              icon={item?.like_usuario_actual ? "mdi:heart" : "mdi:heart-outline"}
              className="text-xl"
            />
            {item?.likes > 0 && <span className="text-sm font-medium">{item?.likes}</span>}
          </button>
          
          <button 
            onClick={() => {
              setItemSelect(item)
              setShowModal()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Icon icon="mdi:comment-outline" className="text-xl" />
            {item?.comentarios_count > 0 && <span className="text-sm font-medium">{item?.comentarios_count}</span>}
          </button>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all">
            <Icon icon="mdi:repeat-variant" className="text-xl" />
          </button>
          
          <button 
            onClick={() => mutateGuardar(item)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              item?.guardado_usuario_actual
                ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10"
                : "text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10"
            }`}
          >
            <Icon 
              icon={item?.guardado_usuario_actual ? "mdi:bookmark" : "mdi:bookmark-outline"} 
              className="text-xl" 
            />
          </button>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-all ml-auto">
            <Icon icon="mdi:share-outline" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
