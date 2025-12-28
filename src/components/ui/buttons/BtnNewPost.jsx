import { Icon } from "@iconify/react";
import { usePostStore } from "../../../store/PostStore";

export const BtnNewPost = () => {
  const {setStateForm} = usePostStore()
  return (
    <button onClick={setStateForm} className="fixed md:relative bottom-20 md:bottom-auto right-4 md:right-auto z-40 md:z-auto flex md:mt-4 bg-primary hover:bg-primary/90 font-semibold p-3 md:p-2 md:px-4 rounded-full items-center justify-center md:justify-start gap-2 transition cursor-pointer shadow-lg md:shadow-none">
      <span className="hidden md:block">NUEVA PUBLICACION</span>
      <Icon icon="basil:add-outline" width="28" height="28" className="md:w-6 md:h-6" />
    </button>
  );
};
