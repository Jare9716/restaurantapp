import React, {useContext, useEffect, Fragment} from "react";
import { StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native'
import { 
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from "native-base";

import FirebaseContext from "../context/firebase/firebaseContext";
import PedidosContext from "../context/pedidos/pedidosContext";
import globalStyles from "../styles/global";


const Menu = ()=>{

    //Context de firebase
    const{ menu, obtenerProductos } = useContext(FirebaseContext)

    //Context pedido
    const{ selecionarPlatillo } = useContext(PedidosContext)

    //Hook para rediccionar
    const natvigation = useNavigation()

    useEffect(()=>{
        obtenerProductos()
    },[])

    // Esta función permite organizar por categoria un grupo de comidas, el sort en firebaseState los organiza de forma individual previamente. 
    const mostratHeading = (categoria, i) =>{
        if(i > 0){
            const categoriaAnterior = menu[i-1].categoria
            if(categoriaAnterior !== categoria){
                return(
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                    </Separator>
                )       
            }

        }
        else{
            return(
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }
    }

    return(
        <Container style = {globalStyles.contenedor}>
            <Content style = {{backgroundColor: '#FFF'}}>
                <List>
                    {menu.map( (platillo, i) => {
                        const {imagen, nombre, descripcion, precio, categoria, id} = platillo
                        return(
                            <Fragment key={id}>
                                {mostratHeading(categoria, i)}
                                <ListItem
                                    onPress={()=>{
                                        //Eliminar propiedads del platillo
                                        const {existencia, ...platillo2} = platillo;

                                        selecionarPlatillo(platillo2)
                                        natvigation.navigate('DetallePlatillo')
                                    }}
                                >
                                    <Thumbnail 
                                        large 
                                        square 
                                        source={{uri: imagen}}
                                    />

                                    <Body>
                                        <Text>{nombre}</Text>
                                        
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >
                                            {descripcion}
                                        </Text>

                                        <Text>Precio: $ {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    separador:{
        backgroundColor: '#000',
    },
    separadorTexto:{
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default Menu  