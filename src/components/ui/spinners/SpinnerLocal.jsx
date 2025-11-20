import { PuffLoader } from "react-spinners";

export const SpinnerLocal = () => {
  return (
    <div className="w-full flex justify-center items-center p-6">
      <PuffLoader color="#c8c8c8" size={30} />
    </div>
  );
};
