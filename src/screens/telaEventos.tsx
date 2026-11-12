import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { useCallback, useEffect, useState } from "react"
import { Eventos } from "../types/Events"
import { perfil } from "../types/perfil"
import { obterEventos } from "../services/Eventos"
import ModalEvento from "../Components/Modais/ModalEvento"
import { useFocusEffect } from "@react-navigation/native"
import ListaEventos from "../Components/FlatListComponent/ListaEventos"
import { obterUsuario } from "../services/Usuario"

export default function TelaEventos() {
    const [eventos, setEventos] = useState<Eventos[]>([])
    const [carreganto, setCarregando] = useState<boolean>(false)
    const [tipo_perfil, setTipoPerfil] = useState<perfil>()
    const [visivel, setVisivel] = useState<boolean>(false)

    useEffect(() => {
        const load = () => {
            setCarregando(true)
        }
        load()
    }, [])

    useFocusEffect(
        useCallback(() => {
            const evento = async() => {
                try{
                    const resposta = await obterEventos()
                    setEventos(resposta.data)
                } catch(error : any) {
                    console.error(error.response?.data)
                } finally{
                    setCarregando(false)
                }
            }
            evento()
        }, [])
    )

    useEffect(() => {
        const acesso = async() => {
            try{
                const resposta = await obterUsuario()
                setTipoPerfil({
                    DIREX : resposta.perfil === "DIREX",
                    MEMBRO : resposta.perfil === "MEMBRO"
                })
            } catch(error:any){
                console.error(error.response?.data)
            }
        }
        acesso()
    }, [])

    if(carreganto) {
        return(
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }



    return(
        <View className="flex-1 items-center justify-center">
            <View className="h-[90%]">
                {tipo_perfil?.DIREX === true &&(
                    <View className="items-end">
                        <TouchableOpacity onPress={() => setVisivel(true)} 
                        className="flex-row items-center 
                        px-[20px] 
                        py-[8px]
                        bg-[#F14C23] 
                        rounded-[10px]">
                            <Ionicons name="add" size={15} color={"white"}/>
                            <Text className="text-white">
                                Adicionar
                            </Text>
                        </TouchableOpacity>
                        <ModalEvento visivel={visivel} fechar={() => setVisivel(false)}/>
                    </View>
                )}
                <FlatList
                data={eventos}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <ListaEventos Evento={item}/>
                )}
                />
            </View>
        </View>
    )
}