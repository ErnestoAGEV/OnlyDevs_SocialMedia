import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../supabase/supabase.config";

export const useSupabaseSuscription = ({ channelName, options, queryKey }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const subscription = supabase.channel(channelName).on("postgres_changes",options,(payload) => {
        const {eventType, table} = payload
        
        // Para comentarios, hacer reset completo para actualizar contadores
        if(table === "comentarios" && eventType === "INSERT") {
            queryClient.resetQueries({ queryKey, exact: false });
            return;
        }
        
        if(["INSERT","DELETE"].includes(eventType)) {
            // Solo invalida en INSERT y DELETE, no en UPDATE (likes)
            queryClient.invalidateQueries(queryKey);
        }
        // Para UPDATE, esperar un poco para que el servidor procese
        if(eventType === "UPDATE") {
            setTimeout(() => {
                queryClient.invalidateQueries(queryKey);
            }, 500);
        }
    })
    .subscribe();
    return () => {
        supabase.removeChannel(subscription);
    }
  }, [channelName,options,queryKey,queryClient]);
};
