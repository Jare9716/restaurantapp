import { OBTENER_PRODRUCTOS_EXITO } from "../../types";

export default (state, action) => {
    switch(action.type){
        case OBTENER_PRODRUCTOS_EXITO:
            return{
                ...state,
                menu: action.payload
            }

        default:
            return state;
    }
}