import { ICartProduct } from "./Order.interface";
import { IProduct } from "./Product.interface";

export interface IState {
  products: IProduct[],
  cart: ICartProduct[]
  total: number,
  currentItem: any,
}
