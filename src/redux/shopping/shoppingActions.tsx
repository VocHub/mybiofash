import { ICartProduct } from '../../interfaces/Order.interface';
import { IProduct} from '../../interfaces/Product.interface';
import actionTypes from './shoppingTypes';


export const addToCart = (product: ICartProduct) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      product
    }
  }
}

export const removeFromCart = (productId: string, productPresentationId: string) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: productId,
      presentationId: productPresentationId
    }
  }
}

export const adjustQty = (product: ICartProduct, qty: number, action: "remove" | "add") => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      product,
      qty,
      action
    }
  }
}

export const loadCurrentItem = (product: IProduct) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: product
  }
}
