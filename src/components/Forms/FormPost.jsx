import { BtnClose } from "../ui/buttons/BtnClose";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import EmojiPicker from "emoji-picker-react";
import { ImageSelector } from "../../hooks/useImageSelector";
import { GifSelector } from "../HomePageComponents/GifSelector";
import { usePostStore } from "../../store/PostStore";
import {useInsertarPostMutate} from "../../stack/PostStack"
import { useForm } from "react-hook-form";

export const FormPost = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const [postText, setPostText] = useState("");
  const {stateImage,setStateImage,setStateForm,file} = usePostStore();
  const {mutate,isPending} = useInsertarPostMutate()
  const {handleSubmit,setValue} = useForm()
  const puedePublicar = postText.trim().length > 0 || file !== null || selectedGif !== null
  
  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    setPostText(prevText => prevText + emojiChar);
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gifUrl) => {
    setSelectedGif(gifUrl);
    setShowGifPicker(false);
    // Ocultar selector de imagen si hay GIF
    if (stateImage) setStateImage();
  };

  const removeGif = () => {
    setSelectedGif(null);
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
    setValue("descripcion", e.target.value)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="fixed z-50 flex items-end md:items-center justify-center inset-0">
      {/* Fondo difuminado */}
      <div className="absolute backdrop-blur-sm bg-black/30 md:bg-black/50 cursor-pointer inset-0" onClick={setStateForm}></div>
      
      {/* Emoji Picker Desktop - A la izquierda del modal */}
      {showEmojiPicker && (
        <div className="hidden md:block absolute z-50 shadow-2xl rounded-xl overflow-hidden" 
             style={{ right: 'calc(50% + 280px)' }}
             ref={pickerRef}>
          <EmojiPicker
            onEmojiClick={addEmoji}
            theme="dark"
            searchDisabled={false}
            width={320}
            height={400}
          />
        </div>
      )}
      
      <section className="bg-white relative w-full md:max-w-lg h-[90vh] md:h-auto md:max-h-[85vh] dark:bg-bg-dark rounded-t-3xl md:rounded-2xl shadow-xl md:shadow-2xl flex flex-col safe-area-inset-bottom md:animate-[fadeIn_0.2s_ease-out]">
        {/* Indicador de arrastre móvil */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        {/* header */}
        <header className="flex items-center justify-between px-4 py-2 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <button onClick={setStateForm} className="text-primary font-medium text-sm md:hidden">Cancelar</button>
          <h2 className="text-base md:text-lg font-semibold absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">Nueva publicación</h2>
          <button 
            disabled={!puedePublicar || isPending}
            onClick={handleSubmit(() => mutate({descripcion:postText}))}
            className={`text-sm font-semibold md:hidden ${puedePublicar ? "text-primary" : "text-gray-400"}`}
          >
            Publicar
          </button>
          <div className="hidden md:block">
            <BtnClose funcion={setStateForm} />
          </div>
        </header>
        {/* user info - Área scrolleable */}
        <main className="px-4 py-3 md:px-6 md:py-5 space-y-3 md:space-y-4 flex-1 overflow-y-auto min-h-0">
          <section className="flex items-center gap-3 md:gap-4">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 md:ring-primary/20"
              src={dataUsuarioAuth?.foto_perfil}
              alt="avatar"
            />
            <div>
              <span className="font-semibold text-sm md:text-base block">{dataUsuarioAuth?.nombre}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon icon="mdi:earth" className="text-gray-400 text-sm" />
                <span className="text-xs text-gray-500">Publicación pública</span>
              </div>
            </div>
          </section>
          <form onSubmit={handleSubmit(() => mutate({descripcion:postText, gifUrl: selectedGif}))}>
            <div className="relative">
              <textarea
                ref={textareaRef}
                placeholder="¿Qué estás pensando?"
                value={postText}
                onChange={handleTextChange}
                rows={3}
                className="w-full placeholder-gray-400 dark:placeholder-gray-500 outline-none resize-none text-base md:text-lg bg-transparent min-h-[80px] md:min-h-[100px] leading-relaxed"
              />
            </div>
          </form>
          {/* GIF seleccionado */}
          {selectedGif && (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={selectedGif} alt="GIF seleccionado" className="w-full max-h-[200px] object-contain bg-black" />
              <button 
                onClick={removeGif}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
              >
                <Icon icon="mdi:close" className="text-white text-lg" />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white">
                GIF
              </div>
            </div>
          )}
          {/* Imagen seleccionada */}
          {stateImage && !selectedGif && <ImageSelector />}
          {/* GIF Picker */}
          {showGifPicker && (
            <GifSelector 
              onGifSelect={handleGifSelect} 
              onClose={() => setShowGifPicker(false)} 
            />
          )}
          {/* Emoji Picker Móvil - debajo del contenido */}
          {showEmojiPicker && (
            <div className="md:hidden w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <EmojiPicker
                onEmojiClick={addEmoji}
                theme="dark"
                searchDisabled={false}
                width="100%"
                height={220}
              />
            </div>
          )}
        </main>
        {/* Footer con acciones - Siempre visible */}
        <footer className="p-3 md:px-6 md:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 rounded-b-none md:rounded-b-2xl shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 md:hidden">Añadir a tu publicación</span>
            {/* Acciones desktop */}
            <div className="hidden md:flex items-center gap-3 flex-1">
              <button 
                onClick={setStateImage} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
                title="Foto/Video"
              >
                <Icon icon="mdi:image" className="text-xl group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Foto/Video</span>
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors group"
                title="Emoji"
              >
                <Icon icon="mdi:emoticon-outline" className="text-xl group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Emoji</span>
              </button>
              <button
                onClick={() => {
                  setShowGifPicker(!showGifPicker);
                  setShowEmojiPicker(false);
                }}
                type="button"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group ${showGifPicker ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                title="GIF"
              >
                <Icon icon="mdi:gif" className="text-xl group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GIF</span>
              </button>
            </div>
            {/* Botón publicar desktop */}
            <button 
              disabled={!puedePublicar || isPending}
              onClick={handleSubmit(() => mutate({descripcion:postText, gifUrl: selectedGif}))}
              className={`hidden md:flex items-center gap-2 py-2.5 px-8 rounded-full font-semibold transition-all duration-200 ${
                puedePublicar 
                  ? "bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 cursor-pointer text-white" 
                  : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-400"
              }`}
            >
              {isPending ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin text-lg" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <Icon icon="mdi:send" className="text-lg" />
                  <span>Publicar</span>
                </>
              )}
            </button>
            {/* Acciones móvil */}
            <div className="flex gap-2 md:hidden">
              <button 
                onClick={setStateImage} 
                className="p-2.5 rounded-full text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                title="Foto/Video"
              >
                <Icon icon="mdi:image" className="text-xl" />
              </button>
              <button
                onClick={() => {
                  setShowGifPicker(!showGifPicker);
                  setShowEmojiPicker(false);
                }}
                type="button"
                className={`p-2.5 rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${showGifPicker ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                title="GIF"
              >
                <Icon icon="mdi:gif" className="text-xl" />
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                type="button"
                className="p-2.5 rounded-full text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                title="Emoji"
              >
                <Icon icon="mdi:emoticon-outline" className="text-xl" />
              </button>
            </div>
          </div>
        </footer>
      </section>
    </section>
  );
};
