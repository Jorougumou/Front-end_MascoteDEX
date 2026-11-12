import { View, Text, Modal, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import {Dropdown} from "react-native-element-dropdown"
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { CapturarMascote } from "../../services/servicoMascotes";
import { obterEventos } from "../../services/Eventos";

import { Eventos } from "../../types/Events";
import { Ionicons } from "@expo/vector-icons";

interface ModalCriarMascoteProps {
    id : string
    visivel : boolean
    fechar : () => void
    atualizar : () => void | null
    fotoMascote : any
}




export default function ModalCapturaMascote ({id, visivel, fechar, atualizar, fotoMascote} : ModalCriarMascoteProps) {
    const [eventos, setEventos] = useState<Eventos[]>([])
    const [eventosSelecionado, setEventoSelecionado] = useState<string>("")
    const [carregando, setCarregando] = useState<boolean>(false)

    const [foto, setFoto] = useState("")


    useEffect(() => {
        setFoto(fotoMascote)
    }, [fotoMascote])

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





    const Captura = async() => {
        try{
            setCarregando(true)
            const formData = new FormData()

            formData.append("foto", {
                uri : foto,
                name : "mascote.jpg",
                type : "image/jpeg"
            } as any)

            formData.append("eventoId", (eventosSelecionado));

            const resposta = await CapturarMascote(id, formData)
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
                    <TouchableOpacity onPress={Captura} className="p-[10px] px-[30px] bg-[#F14C23] rounded-[20px]">
                        <Text className="text-white">
                            Capturar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}