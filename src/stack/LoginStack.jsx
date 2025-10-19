import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/AuthStore"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const useCrearUsuarioYSesionMutate = () => {
    const {crearUserYLogin, credenciales} = useAuthStore();
    const navigate = useNavigate();
    
    return useMutation({
        mutationKey:["iniciar con email test"],
        mutationFn: async () => {
            const user = await crearUserYLogin({
                email: credenciales.email,
                password: credenciales.password
            });
            return user;
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
        onSuccess: () => {
            toast.success("Inicio de sesión exitoso");
            navigate('/');
        }
    })
}