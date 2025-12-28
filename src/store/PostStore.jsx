import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

const tabla = "publicaciones";
const InsertarPost = async (p, file) => {
  const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  if (file) {
    const nuevo_id = data?.id;
    const urlImagen = await subirArchivo(nuevo_id, file);
    const pUrl = {
      url: urlImagen.publicUrl,
      id: nuevo_id,
    };
    await EditarPublicacion(pUrl);
  }
};
const EditarPublicacion = async (p) => {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    throw new Error(error.message);
  }
};

const subirArchivo = async (id, file) => {
  const ruta = "publicaciones/" + id;
  const { data, error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file, {
      cacheControl: "0",
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const { data: urlimagen } = await supabase.storage
      .from("archivos")
      .getPublicUrl(ruta);
    return urlimagen;
  }
};

export const usePostStore = create((set) => ({
  itemSelect : null,
  setItemSelect: (p) => set({itemSelect:p}),
  file: null,

  setFile: (p) => set({ file: p }),
  stateImage: false,
  setStateImage: () => {
    set((state) => ({ stateImage: !state.stateImage }));
  },
  stateForm: false,
  setStateForm: () => {
    set((state) => ({ stateForm: !state.stateForm }));
  },
  insertarPost: async (p, file) => {
    await InsertarPost(p, file);
  },
  dataPost: null,
  mostrarPost: async (p) => {
    const { data, error } = await supabase
      .rpc("publicaciones_con_detalles", {
        _id_usuario: p.id_usuario,
        _offset: p.desde,
        _limit: p.hasta
      });
    
    if (error) {
      console.error("Error en mostrarPost:", error);
      throw new Error(error.message);
    }
    console.log("🔍 mostrarPost RPC response:", data);
    console.log("🔍 First item:", data?.[0]);
    set({ dataPost: data });
    return data;
  },
  likePost: async (p) => {
    const { error } = await supabase.rpc("toggle_like", p);
    if (error) throw new Error(error.message);
  },
  
  // Guardar/Quitar guardado de post
  guardarPost: async (p) => {
    const { error } = await supabase.rpc("toggle_guardado", p);
    if (error) throw new Error(error.message);
  },
  
  // Obtener posts que le gustaron al usuario
  mostrarPostsLiked: async (id_usuario) => {
    const { data, error } = await supabase.rpc("publicaciones_liked_por_usuario", {
      _id_usuario: id_usuario
    });
    if (error) throw new Error(error.message);
    return data;
  },
  
  // Obtener posts guardados por el usuario
  mostrarPostsGuardados: async (id_usuario) => {
    const { data, error } = await supabase.rpc("publicaciones_guardadas_por_usuario", {
      _id_usuario: id_usuario
    });
    if (error) throw new Error(error.message);
    return data;
  },

}));
