import { api } from "./api"

export async function obterEventos() {
    const resposta  = await api.get('/eventos')
    return resposta.data
}