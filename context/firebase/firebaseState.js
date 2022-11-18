import React, {useReducer} from "react";

import firebase from '../../firebase'
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import { OBTENER_PRODRUCTOS_EXITO } from "../../types";

import _ from 'lodash'

const FirebaseState = props =>{


    // Crear state inicial
    const initialState = {
        menu: [], 
        error: false
    }

    //useReducer con dispatch para ejecutar fuhnciones
    const[state, dispatch] =useReducer(FirebaseReducer, initialState)

    // Función para traer los productos 
    const obtenerProductos = () => {


        //Consultar firebase
        firebase.db   
                .collection('productos')
                .where('existencia', '==', true) // traer solo productos con  stook
                .onSnapshot(manejarSnapshot) //Manejar la base de datos en tiempo real
                

        function manejarSnapshot(snapshot){
            let platillos = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            
            // Ordernar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria')

            // Tenemos resultados
            dispatch({
                type: OBTENER_PRODRUCTOS_EXITO,
                payload: platillos
            })
        }
    }

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState