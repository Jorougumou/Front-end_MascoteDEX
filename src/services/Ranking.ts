import { api } from "./api"

export async function obterRanking() {
    const resposta = await api.get("/ranking")
    return resposta.data
}