import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../supabase/supabase.config";

export const useSupabaseSuscription = ({ channelName, options, queryKey }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const subscription = supabase.channel(channelName).on("postgres_changes", options, (payload) => {
        const { eventType, table } = payload;
        console.log("🔄 Realtime event:", { eventType, table, queryKey });
        
        // Para likes, invalidar posts (para actualizar el contador)
        if (table === "likes") {
            queryClient.invalidateQueries({ queryKey: ["mostrar post"], exact: false });
            return;
        }
        
        // Para comentarios, invalidar comentarios y posts (para actualizar el contador)
        if (table === "comentarios") {
            queryClient.invalidateQueries({ queryKey: ["mostrar comentarios"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["mostrar post"], exact: false });
            return;
        }

        // Para respuestas a comentarios
        if (table === "respuestas_comentarios") {
            queryClient.invalidateQueries({ queryKey: ["mostrar respuesta comentarios"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["mostrar comentarios"], exact: false });
            return;
        }
        
        // Para otras tablas (publicaciones, etc.)
        queryClient.invalidateQueries({ queryKey, exact: false });
    })
    .subscribe((status) => {
      console.log("📡 Subscription status:", channelName, status);
    });
    
    return () => {
        supabase.removeChannel(subscription);
    }
  }, [channelName, options, queryKey, queryClient]);
};
