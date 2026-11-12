import { View, Text, Modal, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import {Dropdown} from "react-native-element-dropdown"
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { criarMascote } from "../../services/servicoMascotes";
import { obterEventos } from "../../services/Eventos";

import { Eventos } from "../../types/Events";
import { Ionicons } from "@expo/vector-icons";

interface ModalMascoteProps {
    visivel : boolean
    fechar : () => void
    atualizar : () => void
}




export default function ModalMascote ({visivel, fechar, atualizar} : ModalMascoteProps) {
    const [eventos, setEventos] = useState<Eventos[]>([])
    const [eventosSelecionado, setEventoSelecionado] = useState<string>("")
    const [carregando, setCarregando] = useState<boolean>(false)

    const [foto, setFoto] = useState("")
    const [nomeMascote, setNomeMascote] = useState("")
    const [ejNome, setEJNome] = useState("")
    const [ejUniversidade, setEjUniversidade] = useState("")
    const [ejCuriosidades, setEjCuriosidades] = useState("")

    if (carregando) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }


    const abrirCamera = async() => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync()

        if (!permissao.granted) {
            console.log("permissão negada")
            return
        }

        const resultado = await ImagePicker.launchCameraAsync({
            mediaTypes:["images"],
            allowsEditing : false,
            quality : 1
        })
        resultado

        if (!resultado.canceled) {
            setFoto(resultado.assets[0].uri)
        }
    }



    useEffect(() => {
        const EventosMenu = async() => {
            try {
                const resposta = await obterEventos()
                setEventos(resposta.data)
            } catch(error : any){
                return console.error(error.response?.data)
            }   
        }
        EventosMenu()
    }, [])

    const NovoMascote = async() => {
        try{
            setCarregando(true)
            const formData = new FormData()

            formData.append("foto", {
                uri : foto,
                name : "mascote.jpg",
                type : "image/jpeg"
            } as any)

            formData.append("nome", nomeMascote)
            formData.append("eventoId", (eventosSelecionado));
            formData.append("ejNome", ejNome);
            formData.append("ejUniversidade", ejUniversidade);
            formData.append("ejFederacaoId", "8b6205a1-cd9a-4da3-89ba-72809f8efb09")
            formData.append("ejCuriosidades", ejCuriosidades);

            const resposta = await criarMascote(formData)
            atualizar()
            fechar()
            return resposta.data
        } catch(error : any) {
            console.log(error.response?.data)
        } finally{
            setCarregando(false)
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
                    <TouchableOpacity onPress={abrirCamera} className="bg-[#D3D3D3] rounded-[10px] h-[20%] 
                    items-center justify-center w-[85%] overflow-hidden">
                        {foto !== "" ? (
                            <Image className="rounded-[10px] w-full h-full"
                            resizeMode="cover"
                            source={{uri : foto}}/>
                        ) : (
                            <Ionicons name="camera" size={50} color="gray"/>
                        )}
                    </TouchableOpacity>
                    <View className="w-full px-[20px]">
                        <Text>Nome Mascote</Text>
                        <TextInput
                        value={nomeMascote}
                        onChangeText={setNomeMascote}
                        className="w-[90%] border rounded-[10px]" />
                    </View>
                    <View className="w-full px-[20px]">
                        <Dropdown
                        style={{height : 50, borderWidth : 1}}
                        data={eventos.map(evento => ({
                            label : evento.nome,
                            value : evento.id
                        }))}
                        labelField="label"
                        valueField="value"
                        value={eventosSelecionado}
                        onChange={item => setEventoSelecionado(item.value)}
                        placeholder="Selecione um evento"
                        />

                    </View>
                    <View className="w-full px-[20px]">
                        <Text>Nome da EJ</Text>
                        <TextInput 
                        value={ejNome}
                        onChangeText={setEJNome}
                        className="w-[90%] border rounded-[10px]" />
                    </View>                 
                    <View className="w-full px-[20px]">
                        <Text>Universidade</Text>
                        <TextInput
                        value={ejUniversidade}
                        onChangeText={setEjUniversidade}
                        className="w-[90%] border rounded-[10px]" />
                    </View>
                    <View className="w-full px-[20px]">
                        <Text>Curiosidade</Text>
                        <TextInput
                        value={ejCuriosidades}
                        onChangeText={setEjCuriosidades}
                        className="w-[90%] border rounded-[10px]" />
                    </View>
                    <TouchableOpacity onPress={NovoMascote} className="p-[10px] px-[30px] bg-[#F14C23] rounded-[20px]">
                        <Text className="text-white">
                            Criar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}