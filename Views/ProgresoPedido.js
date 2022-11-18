import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { Container, Text, H1, H3, Button } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from '@react-navigation/native'
import PedidosContext from "../context/pedidos/pedidosContext";
import firebase from "../firebase";
import Countdown from 'react-countdown'

const ProgresoPedido = ()=>{

    const navigation = useNavigation()

    const {idepedido} =  useContext(PedidosContext)

    const [tiempo, setTiempo] = useState(0)
    const [completado, setCompletado] = useState(false)

    useEffect(() =>{
        const obtenerProducto= () =>{
            firebase.db.collection('ordenes')
                        .doc(idepedido)
                        .onSnapshot(function(doc){
                            setTiempo(doc.data().tiempoentrega);
                            setCompletado(doc.data().completado)
                        })
        }
        obtenerProducto()
    },[])

    //Muestra el countDown en la pantalla
    const renderer = ({minutes, seconds}) => {
        console.log(minutes)

        return(
            <Text style= {styles.tiempo}>{minutes}:{seconds}</Text>
        )
    }

    return(
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, {marginTop:50}]}>
                { tiempo === 0 &&(
                    <>
                        <Text style={{textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                        <Text style={{textAlign: 'center'}}>Se esta calculando el tiempo de entrega</Text>
                    </>
                )}
                { !completado && tiempo > 0 &&(
                    <>
                        <Text style={{textAlign: 'center'}}>Su orden estara lista en: 
                        </Text>

                        <View>
                            <Countdown
                                    date={Date.now() + tiempo * 60000}
                                    renderer={renderer}
                                />
                        </View>
                        
                    </>
                )}

                { completado &&(
                    <>
                        <H1 style = {styles.textoCompletado}> Orden Lista</H1>
                        <H3 style = {styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>

                        <Button style = {[globalStyles.boton, {marginTop: 100}]}
                            rounded
                            block
                            onPress={() => navigation.navigate('NuevaOrden')}
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar Una Nueva Orden</Text>
                        </Button>
                    </>
                ) }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        marginTop: 30,
        fontSize: 60,
        textAlign: 'center'
    },
    textoCompletado:{
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default ProgresoPedido  