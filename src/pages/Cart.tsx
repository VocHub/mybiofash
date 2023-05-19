import { IonContent, IonFooter, IonIcon, IonPage } from "@ionic/react";
import { chevronForwardOutline,logoWhatsapp  } from "ionicons/icons";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Header from "../components/BackButtonHeader";
import CartProductRow from "../components/CartProductRow";
import { ICartProduct } from "../interfaces/Order.interface";
interface IProps {
  cart: ICartProduct[],
  total: number,
}

export const whatsappButton = () =>
  <a className="mt-4 mx-4 flex h-20 flex justify-around items-center bg-white shadow-lg rounded-lg overflow-hidden"
  style={{background: '#00bb2d' }} href="https://wa.me/573162452663"
  >
    <span className="w-2/3 ml-4 text-center flex items-center text-xl md:text-2xl font-bold text-white">
      ¿Necesitas ayuda con tu pedido? Dejanos ayudarte
    </span>
    <IonIcon className="text-5xl text-white" icon={logoWhatsapp} />
  </a>

const CartPage: React.FC<IProps> = props => {
  const [cart, setCart] = useState(props.cart)
  useEffect(() => {
    setCart(props.cart);
  }, [props.cart])
  const history = useHistory();
  return (
    <IonPage className="bg-gray">
      <Header />
      <IonContent className="font-inter" style={{'--ion-background-color':'#f5f7ff'}}>
        <div className="text-center mt-10">
          <span className="text-4xl font-bold text-gray-800">Eco-Carrito</span>
        </div>
        <div className="w-full lg:w-5/12 mx-auto">
          {cart.map(item => <CartProductRow key={item.id} item={item}/>)}
          {whatsappButton()}
        </div>
      </IonContent>
      <IonFooter>
        <div className="lg:w-2/5 md:mx-auto font-inter flex justify-around items-center my-2">
          <div>
            <span className="block text-gray-400 font-bold text-xl">Total</span>
            <p className="block text-3xl text-gray-700 font-bold">
              <NumberFormat value={props.total} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </p>
          </div>
          <div>
            <button onClick={() => history.push('/tienda/carrito/checkout')}
              className="flex items-center p-4 bg-green rounded-xl text-white text-2xl font-semibold"
            >Siguiente
              <IonIcon className="text-4xl" icon={chevronForwardOutline} />
            </button>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
}

const mapStateToProps = (state: any) => {
  return {
    cart: state.shop.cart,
    total: state.shop.total
  }
}
export default connect(mapStateToProps)(CartPage);
