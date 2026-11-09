import { View, Text, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ObterMascoteId } from "../services/servicoMascotes";
import { Mascote } from "../types/mascote";

export default function DetalheMascote(){
    const [mascote, setMascote] = useState<Mascote | null>(null)
    const route = useRoute<any>()
    const [carregando, setCarregando] = useState<boolean>(false)

    const id = route.params?.id

    useEffect(() => {
       const obterMascote = async() => {
        try{
            setCarregando(true)
            const resposta = await ObterMascoteId(id)
            setMascote(resposta)
        } catch(error : any) {
            console.error(error.response?.data)
        } finally {
            setCarregando(false)
        }
       }
       obterMascote() 
    }, [])

    if (carregando) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

    return (
        <View className="flex-1 items-center justify-center">
            <View className="border h-[90%] w-[90%] items-center gap-[20px] p-[5px] bg-[#F14C23] rounded-[10px]">
                <View className="items-center">
                    <Image className="w-[100px] h-[100px] mt-[25px] rounded-full" source={{uri : mascote?.fotoUrl}}/>
                    <Text className="mt-[10px] text-white text-[20px]">
                        {mascote?.nome}
                    </Text>
                </View>

                <View className="items-center">
                    <Text className="text-white text-[20px]">Empresa Junior:</Text>
                    <View className="bg-white rounded-[10px]">
                        <Text className="p-[10px] text-[16px]">{mascote?.empresaJunior.nome}</Text>
                    </View>
                </View>

                <View className="items-center">
                    <Text className="text-white text-[20px]">Federação:</Text>
                    <View className="bg-white rounded-[10px]">
                        <Text className="p-[10px] text-center">
                            {mascote?.federacao.nome}
                        </Text>
                    </View>
                </View>

                <View className="items-center">
                    <Text className="text-white text-[20px]">Região</Text>
                    <View className="bg-white rounded-[10px]">
                        <Text className="p-[10px] text-[16px]">{mascote?.federacao.regiao}</Text>
                    </View>
                </View>

                <View className="items-center">
                    <Text className="text-white text-[20px]">Universidade de Origem</Text>
                    <View className="bg-white rounded-[10px]">
                        <Text className="p-[10px] text-[16px] text-center">{mascote?.empresaJunior.universidade}</Text>
                                        </View>
                    </View>
            </View>
        </View>
    )
}