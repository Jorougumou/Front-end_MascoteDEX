import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ListaRanking from "../Components/FlatListComponent/ListaRanking"
import { useEffect, useState } from "react"
import { perfil } from "../types/perfil"
import { obterRanking } from "../services/Ranking"
import { ranking } from "../types/Ranking"
import { obterUsuario } from "../services/Usuario"

export default function TelaRanking() {
    const [Ranking, setRanking] = useState<ranking[]>([])
    const [carreganto, setCarregando] = useState<boolean>(false)

    useEffect(() => {
        const ranking = async() => {
            try{
                setCarregando(true)
                const resposta = await obterRanking()
                setRanking(resposta.data)
            } catch(error : any) {
                console.error(error.response?.data)
            } finally{
                setCarregando(false)
            }
        }
        ranking()
    },[])

    if(carreganto) {
        return(
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }



    return(
        <View className="flex-1 w-full mt-[10px] px-[10px] ">
            <View className="mt-[20%]">
                <Text className="text-[30px]">Ranking:</Text>
                <FlatList
                data={Ranking}
                renderItem={({item}) => (
                    <ListaRanking ranking={item}/>
                )}
                />
            </View>
        </View>
    )
}