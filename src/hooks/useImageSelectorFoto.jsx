import { Icon } from "@iconify/react";
import { useRef } from "react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { useGlobalStore } from "../store/GlobalStore";
import { useUsuariosStore } from "../store/UsuariosStore";

export const ImageSelectorFoto = () => {
  const { setFile, setFileUrl, fileUrl } = useGlobalStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const fileInputRef = useRef(null);

  function openFileSelector() {
    fileInputRef.current.click();
  }

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      alert("Solo se permiten imagenes.");
      return;
    }
    try {
      const options = {
        maxSizeMB: selectedFile.size > 1024 * 1024 ? 0.1 : 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(selectedFile, options);
      const fileReader = new FileReader();
      setFile(compressedFile);
      fileReader.onload = () => {
        setFileUrl(fileReader.result);
      };
      fileReader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Error al comprimir imagen: " + error.message);
    }
  };

  // Determinar qué imagen mostrar: la seleccionada, la actual del usuario, o placeholder
  const displayImage =
    fileUrl !== "-"
      ? fileUrl
      : dataUsuarioAuth?.foto_perfil || "https://i.ibb.co/39y0kysq/subir.png";

  return (
    <div
      className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden cursor-pointer group border-4 border-white dark:border-neutral-900 shadow-lg"
      onClick={openFileSelector}
    >
      <img
        src={displayImage}
        alt="Foto de perfil"
        className="w-full h-full object-cover"
      />
      {/* Overlay con icono de cámara */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon icon="mdi:camera" className="text-3xl text-white" />
      </div>
      <input
        ref={fileInputRef}
        accept="image/jpeg, image/png"
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};
