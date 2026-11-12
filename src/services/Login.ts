import { api } from "./api";
import { CredenciaisLogin, RespostaAPI } from "../types/Auth";

export async function FazerLogin(credenciais  : CredenciaisLogin) : Promise<RespostaAPI> {

        console.log("Requisição iniciada:")
        const resposta = await api.post<RespostaAPI>('/auth/login', {
            email : credenciais.email,
            senha : credenciais.senha
        });
        return resposta.data
}

export async function FazerCadastro(nome : string, email : string, senha : string) {
    const resposta = await api.post('/auth/register', {
        nome : nome,
        email : email,
        senha : senha
    })
    return resposta.data
}