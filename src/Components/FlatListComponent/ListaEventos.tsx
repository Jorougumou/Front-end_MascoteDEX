import { View, Text } from "react-native"
import { Eventos } from "../../types/Events"


interface Props {
    Evento : Eventos
}

export default function ListaEventos ({Evento} : Props) {
    return (
        <View>
            <View className="flex-1 items-left justify-center my-[10px] p-[10px] rounded-[10px] bg-[#F14C23] gap-[10px]">
                <View className="p-[5px] bg-white rounded-[5px] ">
                    <Text className="text-[#F14C23]">{Evento.nome}</Text>
                </View>
                <Text className="text-white">Local: {Evento.local}</Text>
                <Text className="text-white">Inicio: {Evento.dataFim}</Text>
                <Text className="text-white">Encerramento: {Evento.criadoEm}</Text>
                <Text className="text-white">Criado: {Evento.criadoEm}</Text>
            </View>
        </View>
    )
}