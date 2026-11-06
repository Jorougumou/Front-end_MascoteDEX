import * as SecureStore from "expo-secure-store"

const CHAVETOKEN = 'usuario_token';

export async function salvarToken(token : string) : Promise<void> {
    try {
        await SecureStore.setItemAsync(CHAVETOKEN, token);
        console.log("Token Salvo com sucesso!")
    } catch(error : any) {
        console.error(error)
        throw error
    }
}

export async function obterToken() : Promise<string | null> {
    try{
        const token = await SecureStore.getItemAsync(CHAVETOKEN)
        return token
    } catch(error : any){
        console.error("Erro ao obter token", error)
        return null
    }
}

export async function RemoverToken() : Promise<void> {
    try{
        await SecureStore.deleteItemAsync(CHAVETOKEN)
    } catch(error : any){
        console.error("Erro ao obter token", error)
        throw error
    }
}