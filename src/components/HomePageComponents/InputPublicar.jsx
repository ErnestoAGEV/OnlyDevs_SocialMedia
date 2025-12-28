import { Icon } from "@iconify/react";
import { usePostStore } from "../../store/PostStore";

export const InputPublicar = () => {
  const {setStateForm} = usePostStore()
  return (
    <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-800/50">
      <div 
        onClick={setStateForm}
        className="flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer transition-all group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-sm">
          +
        </div>
        <span className="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 text-sm md:text-base transition-colors">¿Qué está pasando?</span>
      </div>
      <div className="flex gap-2 mt-3 ml-1">
        <button className="p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
          <Icon icon="mdi:image-outline" className="text-xl md:text-2xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
          <Icon icon="mdi:gif" className="text-xl md:text-2xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
          <Icon icon="mdi:emoticon-outline" className="text-xl md:text-2xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors">
          <Icon icon="mdi:poll" className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
};
