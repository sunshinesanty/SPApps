import {Action, MY_ACTION} from "../interfaces";
export const ADD_ACTION = "add";
export const REMOVE_ACTION = "remove";
export const UPDATE_ACTION = "remove";

export function AddToCart(itemID: number, message: string): Action<MY_ACTION> {
    return {
        type: ADD_ACTION,
        payload: {
            id: Math.random(),
            message
        }
    }
}

export function RemoveFromCart(itemID: number, message: string): Action<MY_ACTION> {
    return {
        type: REMOVE_ACTION,
        payload: {
            id: itemID,
            message: ""
        }
    }
}

export function UpdateItem(itemID: number, message: string): Action<MY_ACTION> {
    return {
        type: UPDATE_ACTION,
        payload: {
            id:itemID,
            message
        }
    }
}