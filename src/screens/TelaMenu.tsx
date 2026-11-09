import {View, Text, TouchableOpacity} from "react-native"
import { useEffect } from "react"
import { obterUsuario } from "../services/Usuario"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../context/AuthContext"

export default function TelaMenu() {
    const {sair} = useAuth()

    useEffect(() => {
        const usuario = async() => {
            try {
                const resposta = await obterUsuario()
                console.log(resposta.perfil)
            } catch(error : any) {
                console.error(error.response?.data)
            }
        } 
        usuario()
    }, [])

    return(
        <View className="flex flex-1 justify-center items-center">
            <View className="flex items-center bg-orange-300 p-[40px] h-[60%]">
                <Text className="text-[50px]">ola</Text>
                <TouchableOpacity onPress={sair} className="flex flex-row mt-[20px] bg-red-500 p-[10px] w-[100px] rounded-[10px] items-center gap-[35px]">
                    <Text className="text-[16px] text-white">Sair</Text>
                    <Ionicons name="exit" size={18} color={"white"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}