import { useMutation, useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostStore } from "../store/PostStore";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { useUsuariosStore } from "../store/UsuariosStore";
import { toast } from "sonner";

export const useInsertarPostMutate = () => {
  const { insertarPost, file, setStateForm, setFile } = usePostStore();
  const fechaActual = useFormattedDate();
  const { dataUsuarioAuth } = useUsuariosStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["insertar post"],
    mutationFn: async (data) => {
      let type = "imagen";
      let url = "-";
      
      // Si hay un GIF seleccionado, usarlo directamente
      if (data.gifUrl) {
        type = "gif";
        url = data.gifUrl;
      } else if (file && file.name) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext === "mp4") type = "video";
      }
      
      const p = {
        descripcion: data.descripcion,
        url: url,
        fecha: fechaActual,
        id_usuario: dataUsuarioAuth?.id,
        type: type,
      };
      
      // Si es un GIF, no subimos archivo, solo guardamos la URL
      await insertarPost(p, data.gifUrl ? null : file);
    },
    onError: (error) => {
      toast.error("Error al insertar post: " + error.message);
    },
    onSuccess: () => {
      toast.success("Publicado");
      setStateForm();
      setFile(null);
      // Invalidar queries para refrescar los posts inmediatamente
      queryClient.invalidateQueries({ queryKey: ["mostrar post"], exact: false });
    },
  });
};

export const useLikePostMutate = () => {
  const { likePost } = usePostStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["like post"],
    mutationFn: async (item) => {
      await likePost({ p_post_id: item?.id, p_user_id: dataUsuarioAuth?.id });
    },
    onMutate: async (item) => {
      // Cancelar queries pendientes para evitar sobrescribir nuestra actualización optimista
      await queryClient.cancelQueries({ queryKey: ["mostrar post"] });
      
      // Snapshot del estado anterior
      const previousData = queryClient.getQueryData(["mostrar post", { id_usuario: dataUsuarioAuth?.id }]);
      
      // Actualización optimista
      queryClient.setQueryData(["mostrar post", { id_usuario: dataUsuarioAuth?.id }], (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map(page => 
            page.map(post => 
              post.id === item.id 
                ? { 
                    ...post, 
                    like_usuario_actual: !post.like_usuario_actual,
                    likes: post.like_usuario_actual ? post.likes - 1 : post.likes + 1
                  }
                : post
            )
          )
        };
      });
      
      return { previousData };
    },
    onSuccess: () => {
      // Invalidar queries para refrescar datos
      queryClient.invalidateQueries({ queryKey: ["posts liked"] });
    },
    onError: (error, item, context) => {
      // Revertir en caso de error
      if (context?.previousData) {
        queryClient.setQueryData(["mostrar post", { id_usuario: dataUsuarioAuth?.id }], context.previousData);
      }
      toast.error("Error al dar like: " + error.message);
    }
  });
};
export const useMostrarPostQuery = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { mostrarPost } = usePostStore();
  const cant_pagina = 10;
  return useInfiniteQuery({
    queryKey: ["mostrar post", { id_usuario: dataUsuarioAuth?.id }],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await mostrarPost({
        id_usuario: dataUsuarioAuth?.id,
        desde: pageParam,
        hasta: cant_pagina,
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < cant_pagina) return undefined;
      return allPages.length * cant_pagina;
    },
    initialPageParam: 0,
    enabled: !!dataUsuarioAuth?.id,
  });
};

// Mutación para guardar/quitar guardado de post
export const useGuardarPostMutate = () => {
  const { guardarPost } = usePostStore();
  const { dataUsuarioAuth } = useUsuariosStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["guardar post"],
    mutationFn: async (item) => {
      await guardarPost({ p_post_id: item?.id, p_user_id: dataUsuarioAuth?.id });
    },
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ["mostrar post"] });
      
      // Actualización optimista
      queryClient.setQueryData(["mostrar post", { id_usuario: dataUsuarioAuth?.id }], (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map(page => 
            page.map(post => 
              post.id === item.id 
                ? { 
                    ...post, 
                    guardado_usuario_actual: !post.guardado_usuario_actual
                  }
                : post
            )
          )
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts guardados"] });
    },
    onError: (error) => {
      toast.error("Error al guardar: " + error.message);
      queryClient.invalidateQueries({ queryKey: ["mostrar post"] });
    }
  });
};

// Query para obtener posts que le gustaron al usuario
export const useMostrarPostsLikedQuery = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { mostrarPostsLiked } = usePostStore();
  return useQuery({
    queryKey: ["posts liked", { id_usuario: dataUsuarioAuth?.id }],
    queryFn: () => mostrarPostsLiked(dataUsuarioAuth?.id),
    enabled: !!dataUsuarioAuth?.id,
  });
};

// Query para obtener posts guardados por el usuario
export const useMostrarPostsGuardadosQuery = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const { mostrarPostsGuardados } = usePostStore();
  return useQuery({
    queryKey: ["posts guardados", { id_usuario: dataUsuarioAuth?.id }],
    queryFn: () => mostrarPostsGuardados(dataUsuarioAuth?.id),
    enabled: !!dataUsuarioAuth?.id,
  });
};
