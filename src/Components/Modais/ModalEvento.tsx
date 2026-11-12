import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { CriarEventos } from "../../services/Eventos";
import DateTimePicker from "@react-native-community/datetimepicker"
import { Platform } from "react-native";

interface ModalMascoteProps {
    visivel : boolean
    fechar : () => void
}




export default function ModalEvento ({visivel, fechar} : ModalMascoteProps) {
    const [marcarInicio, setMarcarInicio] = useState<boolean>(false)
    const [marcarFim, setMarcarFim] = useState<boolean>(false)
    const [nomeEvento, setNomeEvento] = useState("")
    const [Local, setLocal] = useState("")
    const [DataInicio, setDataInicio] = useState(new Date())
    const [DataFim, setDataFim] = useState(new Date())

    const NovoEvento = async() => {
        try {
            const resposta = await CriarEventos({nome : nomeEvento, local : Local, 
            dataInicio : DataInicio.toISOString().split("T")[0], 
            dataFim : DataFim.toISOString().split("T")[0]})
            fechar()
            return resposta
        } catch(error : any){
            console.log(error.response?.data)
        }
    }

    return (
        <Modal
        visible={visivel}
        onRequestClose={fechar}
        >
            <View className="flex-1 white justify-center items-center">
                <View className="flex-1 border items-center justify-center 
                border w-[100%] gap-[10px]">
                    <View className="w-full px-[20px]">
                        <Text>Nome do Evento</Text>
                        <TextInput 
                        value={nomeEvento}
                        onChangeText={setNomeEvento}
                        className="w-[90%] border rounded-[10px]" />
                    </View>
                    <View className="w-full px-[20px]">
                        <Text>Local</Text>
                        <TextInput 
                        value={Local}
                        onChangeText={setLocal}
                        className="w-[90%] border rounded-[10px]" />
                    </View>    
                    <View className="w-full px-[20px]">
                        <Text>Data de inicio</Text>
                        <TouchableOpacity
                        onPress={() => setMarcarInicio(true)}
                        className="py-[10px] border w-[90%] rounded-[10px]">
                            <Text className="px-[10px]">{DataInicio.toLocaleDateString("pt-BR")}</Text>
                        </TouchableOpacity>
                    </View>
                    {(marcarInicio) && (
                        <DateTimePicker
                        value={DataInicio}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onValueChange={(_event, dataSelecionada) => {
                            setDataInicio(dataSelecionada)
                            setMarcarInicio(false)
                        }}
                        onDismiss={() => {
                            setMarcarInicio(false)
                        }}
                        />
                    )}
                    <View className="w-full px-[20px]">
                        <Text>Data de fim</Text>
                        <TouchableOpacity
                        onPress={() => setMarcarFim(true)}
                        className="py-[10px] border w-[90%] rounded-[10px]">
                            <Text className="px-[10px]">{DataFim.toLocaleDateString("pt-BR")}</Text>
                        </TouchableOpacity>
                    </View>
                    {(marcarFim) && (
                        <DateTimePicker
                        value={DataFim}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onValueChange={(_event, dataSelecionada) => {
                            setDataFim(dataSelecionada)
                            setMarcarFim(false)
                        }}
                        onDismiss={() => {
                            setMarcarFim(false)
                        }}
                        />
                    )}
                    <TouchableOpacity onPress={NovoEvento} className="p-[10px] px-[30px] bg-[#F14C23] rounded-[20px]">
                        <Text className="text-white">
                            Criar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}