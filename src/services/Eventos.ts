import { api } from "./api"
import { criarEventos } from "../types/Events"

export async function obterEventos() {
    const resposta  = await api.get('/eventos')
    return resposta.data
}

export async function CriarEventos(credenciais : criarEventos) {
    const resposta = await api.post("/eventos", {
        nome : credenciais.nome,
        local : credenciais.local,
        dataInicio : credenciais.dataInicio,
        dataFim : credenciais.dataFim
    })

    return resposta.data
}