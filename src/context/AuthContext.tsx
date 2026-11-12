import { obterToken, RemoverToken } from "../services/servicoToken";
import { salvarToken } from "../services/servicoToken";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextProps {
    autenticado : boolean,
    entrar : (token : string) => Promise<void>;
    sair : () => void

}

const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
)

export function AuthProvider ({children} : {children  : ReactNode}) {
    const [autenticado, setAutenticado] = useState(false)

    useEffect(() => {
        async function verificarToken() {
            try {
                const token = await obterToken()
                setAutenticado(!!token)
            } catch(error){
                return null
            }
        }
        verificarToken()
    }, [])

    async function entrar(token:string) {
        await salvarToken(token)
        setAutenticado(true)
    }

    async function sair() {
        await RemoverToken()
        setAutenticado(false)
    }

    return (
        <AuthContext.Provider value={{autenticado, entrar, sair}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth () {
    return useContext(AuthContext)
}