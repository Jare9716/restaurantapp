import React, {useState, useContext, useEffect} from "react";
import { Alert } from "react-native";
import { 
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
} from "native-base";
import firebase from "../firebase";

import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";
import PedidosContext from "../context/pedidos/pedidosContext";


const ResumenPedido = ()=>{

    const navigation = useNavigation()

    // context de pedido
    const{pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} = useContext(PedidosContext)

    useEffect(()=>{
        calcularTotal()
    },[pedido])

    const calcularTotal = ()=>{
        
        let nuevoTotal = 0
        nuevoTotal = pedido.reduce((nuevoTotal, articulo)=> nuevoTotal + articulo.total, 0)
        
        mostrarResumen(nuevoTotal)
    }

    //Alerta progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            '¿Estas seguro del contenido?',
            [
                {
                    text: 'Confirnar',
                    onPress: async () => {

                        // crear el objeto con la información del pedido
                        const pedidoObj =  {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, //array,
                            creado: Date.now()
                        }

                        console.log(pedidoObj)

                        try {
                            // Enviar el pedido hacia firebase
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
                            pedidoRealizado(pedido.id)

                            // Redireccionar a progreso pedido
                            navigation.navigate('ProgresoPedido')
                        } catch (error) {
                            
                        }

                    

                        
                    }
                },

                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        )
    }

    //Alerta eliminación

    const confirmarEliminacion = id =>
        Alert.alert(
            'Eliminar Producto',
            '¿Esta seguro de eliminar el producto?',
            [
                {
                    text: 'Confirmar',
                    onPress: () =>{
                        eliminarProducto(id)
                    }
                },
                {
                    text: 'Cancelar', 
                    style: 'cancel'
                }
                
            ]
        )


    return(
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) =>{
                    const {cantidad, nombre, imagen, id, precio} = platillo
                    return(
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: imagen}}/>
                                </Left>

                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: $ {precio}</Text>

                                    <Button 
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style = {{marginTop: 20}}
                                    >
                                        <Text
                                            style = {[globalStyles.botonTexto, {color: '#FFF'}]}
                                        >Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text  style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>

                <Button
                    style = {{marginLeft:0, width:380, marginTop:30}}
                    onPress ={() => navigation.navigate('Menu')}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            
            <Footer>
                <FooterTab>
                    <Button
                        style = {[globalStyles.boton, {marginLeft:0, width:380}]}
                        onPress ={() => progresoPedido()}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Enviar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
                
        </Container>
    )
}

export default ResumenPedido 