import { Icon } from "@iconify/react";
import { usePostStore } from "../../store/PostStore";

export const InputPublicar = () => {
  const {setStateForm} = usePostStore()
  return (
    <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-600">
      <input value={""} onClick={setStateForm} placeholder="Escribir nueva publicación" className="w-full p-2 rounded focus:outline-none placeholder-gray-500 text-sm md:text-base"/>
      <div className="flex gap-3 md:gap-4 mt-2 text-gray-400">
        <Icon icon="material-symbols:image-outline" width="22" height="22" className="md:w-6 md:h-6" />
        <Icon icon="ant-design:bars-outlined" width="22" height="22" className="md:w-6 md:h-6" />
        <Icon icon="stash:gif-solid" width="22" height="22" className="md:w-6 md:h-6" />
        <Icon icon="solar:text-bold" width="22" height="22" className="md:w-6 md:h-6" />
      </div>
    </div>
  );
};
