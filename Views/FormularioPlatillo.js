import React, {useState, useContext, useEffect} from "react";
import { Alert } from "react-native";
import { 
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";
import PedidosContext from "../context/pedidos/pedidosContext";

const FormularioPlatillo = ()=>{

    //State para cantidades
    const [cantidad, setCantidad] = useState(1)
    const [total, setTotal] = useState(0)

    //UseContext
    const{platillo, guardarPedido} = useContext(PedidosContext)
    const {precio} = platillo

    //Redireccionar
    const navigation = useNavigation()

    //Usefect para actualizar el total a pagar
    useEffect(()=>{
        calcularTotal()
    },[cantidad])

    //Calcula el total del platillo
    const calcularTotal = () =>{
        const totalPagar = precio*cantidad
        setTotal(totalPagar)
    }

    //Incrementa en uno la cantidad
    const incrementarUno = ()=>{
        const nuevaCantidad = parseInt(cantidad) + 1 
        setCantidad(nuevaCantidad)
    }
    
    //Decrementar en uno la  cantidad
    const decrementarUno = ()=>{
        if(cantidad>1){
            const nuevaCantidad = parseInt(cantidad) - 1 
            setCantidad(nuevaCantidad)
        }
        
    }
    
    //Confirma si la orden es correcta

    const confirmarOrden = ()=>{
        Alert.alert(
            'Deseas confirmar tu pedido',
            'Un pedido confirmado no puede ser modificado',
            [
                {
                    text: 'Confirmar',
                    onPress: ()=>{
                        //Almacenar el pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }

                        guardarPedido(pedido)
                        //Navegar hacia el resumen
                        navigation.navigate('ResumenPedido')
                    }
                },

                {
                    text: 'cancelar',
                    style: 'cancel'
                }
            ]
        )
    }
  

    return(
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid style={{marginLeft: 7}}>
                        <Col>
                            <Button
                                props
                                dark
                                style = {{height: 80, justifyContent: 'center', width: 120}}
                                onPress={()=> decrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="remove"/>
                            </Button>
                        </Col>
                      
                        <Col>
                            <Input
                                style = {{textAlign:'center', fontSize:20}}
                                value={cantidad.toString()}
                                keyboardType='numeric'
                                onChangeText={(cantidad.toString() === 'NaN' )? setCantidad(1):(cantidad)=>setCantidad(cantidad)}
                            />
                        </Col>
                        
                        <Col>
                             <Button
                                props
                                dark
                                style = {{height: 80, justifyContent: 'center', width:120}}
                                onPress={()=> incrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="add"/>
                            </Button>  
                        </Col>
                    </Grid>

                    <Text style={globalStyles.cantidad}>Total: ${total}</Text>

                    
                </Form>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={()=>confirmarOrden()}
                    >
                        <Text style={globalStyles.botonTexto}>Agregar pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    )
}

export default FormularioPlatillo 