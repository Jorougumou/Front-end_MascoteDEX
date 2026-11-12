import { View, Text } from "react-native"
import { ranking } from "../../types/Ranking"


interface Props {
    ranking  : ranking
}

export default function ListaRanking ({ranking} : Props) {
    return (
        <View>
            <View className="flex-1 items-left justify-center my-[10px] p-[10px] rounded-[10px] bg-[#F14C23] gap-[10px]">
                <View className="p-[5px] bg-white rounded-[5px] ">
                    <Text className="text-[#F14C23]">{ranking.nome}</Text>
                </View>
                <Text className="text-white">Posição {ranking.posicao}</Text>
            </View>
        </View>
    )
}