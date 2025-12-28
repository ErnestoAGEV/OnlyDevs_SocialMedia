import { Icon } from "@iconify/react";
import { usePostStore } from "../../../store/PostStore";

export const BtnNewPost = () => {
  const {setStateForm} = usePostStore()
  return (
    <button onClick={setStateForm} className="flex mt-4 bg-primary hover:bg-primary/90 font-semibold p-2 px-4 rounded-full items-center justify-center sm:justify-start gap-2 transition cursor-pointer">
      <span className="hidden sm:block">NUEVA PUBLICACION</span>
      <Icon icon="basil:add-outline" width="24" height="24" />
    </button>
  );
};
