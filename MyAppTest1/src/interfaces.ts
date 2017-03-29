export type MY_ACTION = { id: number, message: string }
export interface Action<T> {
    type: string;
    payload: T;
}
export interface ICartItem{
    id: number;
    message: string;
}
export interface StateProps {
    cart: ICartItem[];
}

export interface DispatchProps {
    AddToCart(itemID: number, message: string): any;
}