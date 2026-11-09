export interface ListaMascote {
    id : string,
    nome : string,
    empresaJunior : string,
    federacao : string
    fotoUrl : string
    capturado : boolean
}

export interface Mascote {
    id : string,
    nome : string,
    empresaJunior : {
        id : string,
        nome : string,
        universidade : string,
        curiosidades : string | null
    },
    federacao : {
        nome : string,
        sigla : string,
        estado : string,
        regiao : string
    }
    fotoUrl : string
    capturado : boolean
    eventos : []
}