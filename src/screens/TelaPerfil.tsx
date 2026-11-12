import {View, Text, TouchableOpacity} from "react-native"
import { useEffect } from "react"
import { obterUsuario } from "../services/Usuario"
import { useState } from "react"

import { usuario } from "../types/perfil"

export default function TelaPerfil() {
    const [Usuario, setUsuario] = useState<usuario>()

    useEffect(() => {
        const usuarioInfos = async() => {
            const resposta = await obterUsuario()
            setUsuario(resposta)
        }
        usuarioInfos()
    }, [])

    return(
        <View className="flex-1 items-center">
            <View className="border w-[90%] bg-[#F14C23] h-[90%] mt-[50px] items-center justify-center">
                <View className="gap-[15px]">
                    <View>
                        <Text className="text-[16px] text-black">Nome:</Text>
                        <View className="p-[5px] bg-white rounded-[10px]">
                            <Text>{Usuario?.nome}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="text-[16px] text-black">Email:</Text>
                        <View className="p-[5px] bg-white rounded-[10px]">
                            <Text> {Usuario?.email}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="text-[16px] text-black">Acesso:</Text>
                        <View className="p-[5px] bg-white rounded-[10px]">
                            <Text>{Usuario?.perfil}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}