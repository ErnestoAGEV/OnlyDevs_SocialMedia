import { Icon } from "@iconify/react";
import { PostImageFrame } from "./PostImageFrame";
import { PostVideoFrame } from "./PostVideoFrame";

export const PublicacionCard = ({ item }) => {
  return (
    <div className="border-b border-gray-500/50 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-bold">Nombre de usuario</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm whitespace-nowrap">
            hace 8 horas
          </span>
          <button>
            <Icon icon="tabler:dots" width="24" height="24" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-2 ">{item?.descripcion}</p>
        <div>{item?.url !== "-" && (item?.type === "imagen"?(<PostImageFrame src={item?.url} />):(<PostVideoFrame src={item?.url}/>)) }</div>
        <div className="flex justify-between mt-4">
          <button>
            <Icon
              icon={"mdi:heart-outline"}
              className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,184,233,0.2)] cursor-pointer"
            />
          </button>
          <button className="flex items-center gap-2 cursor-pointer">
            <Icon
              icon={"mdi:comment-outline"}
              className="text-3xl p-1 rounded-full text-gray-400 cursor-pointer"
            />
            <span className="text-xs md:text-sm text-gray-400">Comentar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
