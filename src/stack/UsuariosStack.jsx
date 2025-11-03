import { useQuery } from "@tanstack/react-query"
import {  useSuscription } from "../store/AuthStore"
import { useUsuariosStore } from "../store/UsuariosStore"

export const useMostrarUsuariosAuthQuery = () => {
    const {mostrarUsuarioAuth} = useUsuariosStore()
    const {user} = useSuscription()
    return useQuery({
        queryKey:["mostrar user auth"],
        queryFn:() => mostrarUsuarioAuth({id_auth:user?.id}),
    });
};