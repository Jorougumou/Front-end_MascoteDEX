import {View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import { ListaMascote } from "../types/mascote"
import { obterMascotes } from "../services/servicoMascotes"

import ModalMascote from "../Components/Modais/ModalMascote"

export default function TelaMascote() {
    const [carregando, setCarregando] = useState<boolean>(false)
    const [ListaMascotes, setListaMascotes] = useState<ListaMascote[]>([])
    const [visivel, setVisivel] = useState<boolean>(false)
    const capturados = ListaMascotes.filter((mascote) => mascote.capturado).length
    const [total, setTotal] = useState<number>(0)
    const porcentagem = total > 0 ? (capturados/total) * 100 : 0
    const formPorcentagem = porcentagem.toFixed(0)
    
    const navigation = useNavigation<any>()

    const mascotes = async() => {
        try{
            setCarregando(true)
            const resposta = await obterMascotes()
            setListaMascotes(resposta.data)
            setTotal(resposta.meta.total)
        } catch(error:any){
            console.error(error.response?.data)
        } finally{
            setCarregando(false)
        }
    }

    useEffect(() => {
        mascotes()
    }, [])

    if (carregando) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    const renderMascote = ({item} : {item : ListaMascote}) => {
        return (
            <View className="p-4 h-[172px] w-[141px] rounded-[10px]"
            style={{backgroundColor : item.capturado ? "#F14C23" : "#B0BEC5"}}
            >
                <TouchableOpacity
                className="flex flex-column items-center"
                onPress={() => navigation.navigate("DetalheMascote", {
                    id : item.id
                })}
                >
                    <Image source={{uri: item.fotoUrl}}
                    className="w-[80px] rounded-[50px] h-[80px]"
                    style={{opacity : item.capturado ? 0.2 : 1}}
                    />
                    <Text className="mt-[30px] text-[20px] text-center" 
                    style={{color : item.capturado ? "gray" : "white",
                        opacity : item.capturado ? 0.2 : 1
                    }}>{item.nome}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View className="flex-1justify-center items-center">
            <View className="p-[10px] justify-center">
                <View className="items-center gap-[5px]">
                    <Text className="text-[20px]">Mascotes</Text>
                    <Text className="text-[20px]">{capturados} / {total}</Text>
                    <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                        <View className="h-full bg-[#F14C23] rounded-full" style={{width : `${formPorcentagem}%`}}/>
                    </View>
                </View>
            </View>
            <View className="w-full items-end my-[10px]">
                <TouchableOpacity
                onPress={() => setVisivel(true)} 
                className="px-[20px] py-[10px] mr-[10px] bg-[#F14C23] rounded-[20px]">
                    <Text className="text-white">
                        Adicionar
                    </Text>
                </TouchableOpacity>
                <ModalMascote visivel={visivel} fechar={() => setVisivel(false)} 
                atualizar={() => mascotes}/>
            </View>
            <FlatList
                columnWrapperClassName="gap-[20px]"
                contentContainerClassName="gap-[20px]"
                contentContainerStyle={{flexGrow : 1, justifyContent : "flex-start"}}
                data={ListaMascotes}
                key={2}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderMascote}
            />
        </View>
    )
}