import { api } from "./api"

export async function criarMascote(dados  : FormData) {
    const resposta = await api.post('/mascotes', dados)
    return resposta.data
}

export async function obterMascotes () {
    const resposta = await api.get('/mascotes')
    return resposta.data
}

export async function ObterMascoteId(id : string) {
    const resposta = await api.get(`/mascotes/${id}`)
    return resposta.data
}