import { ICartProduct } from '../../interfaces/Order.interface';
import { IState } from '../../interfaces/Shop.interface';
import actionTypes from './shoppingTypes';




const INITIAL_STATE: IState = {
  products: [],
  cart: [],
  total: 0,
  currentItem: null,
}
interface IAction {
  type: actionTypes,
  payload: any,
}
let STATE = INITIAL_STATE;
const state_saved = localStorage.getItem('cart');
if (state_saved) {
  STATE = JSON.parse(state_saved) as IState;
}

const getProductFromCart = (productId: string, presentationId: string, cart: ICartProduct[]) => {
  const product = cart.find(item => (item.id === productId && item.presentationSelected.id === presentationId));
  return product;
}

const shopReducer = (state = STATE, action: IAction) => {

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productToAdd: ICartProduct = action.payload.product;
      state.total += productToAdd.presentationSelected.cost;
      // Check if Item is in cart already
      let inCart = state.cart.some(item => (item.id === productToAdd.id && item.presentationSelected.id === productToAdd.presentationSelected.id));
      let newState: IState = {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              (item.id === productToAdd.id && item.presentationSelected.id === productToAdd.presentationSelected.id )
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...action.payload.product, qty: 1 }],
      }

      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;

    case actionTypes.REMOVE_FROM_CART:
      let product = getProductFromCart(action.payload.id, action.payload.presentationId, state.cart);
      if (product) state.total -= (product.presentationSelected.cost * product.qty);
      let newCart = state.cart.filter((item) => {
        if (item.id === action.payload.id && item.presentationSelected.id === action.payload.presentationId) {
          return false;
        }
        return true;
      });
      localStorage.setItem('cart', JSON.stringify({...state, cart: newCart}));
      return {
        ...state,
        cart: newCart
      };

    case actionTypes.ADJUST_ITEM_QTY:
      switch (action.payload.action) {
        case "remove":
          state.total -= action.payload.product.presentationSelected.cost;
          break;
        case "add":
          state.total += action.payload.product.presentationSelected.cost;
          break;
        default:
          break;
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.id === action.payload.product.id && item.presentationSelected.id === action.payload.product.presentationSelected.id)
            ? { ...item, qty: + action.payload.qty }
            : item
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
