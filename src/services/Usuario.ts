import { api } from "./api";
import { obterToken } from "./servicoToken";

export async function obterUsuario() {
    const token = await obterToken()
    const resposta = await api.get('/auth/me', {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return resposta.data
}
