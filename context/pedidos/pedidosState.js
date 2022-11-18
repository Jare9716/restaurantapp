import React, {useReducer} from "react";

import pedidosReducer from "./pedidosReducer";
import PedidosContext from "./pedidosContext";

import { 
    SELECCIONAR_PRODUCTO, 
    CONFIRMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN, 
    ELIMINAR_PRODUCTO, 
    PEDIDO_ORDENADO 
} from "../../types";

const PedidosState = props =>{


    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idepedido: ''
    }

    //useReducer con dispatch para ejecutar fuhnciones
    const[state, dispatch] =useReducer(pedidosReducer, initialState)

    //Selecciona el producto a ordenar
    const selecionarPlatillo = platillo =>{
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })

    }

    //Cuando el usuario confirma un platillo
    const guardarPedido = pedido =>{
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //Muestra el total a pagar en el resumen
    const mostrarResumen = total =>{
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Elimina un articulo del carrito
    const eliminarProducto = id =>{
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado = id =>{
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return(
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idepedido: state.idepedido,
                selecionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState