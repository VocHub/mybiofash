import { IonBadge, IonIcon, IonToast } from "@ionic/react";
import { cartOutline, cartSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ICartProduct } from "../interfaces/Order.interface";

type Props = {
  cart: ICartProduct[]
};
const CartButtonHeader: React.FC<Props> = props => {
  const history = useHistory();
  const [showToastEmpty, setShowToastEmpty] = useState(false)
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(props.cart.length);
  }, [props.cart,  cartCount])

  const goToCart = () => {
    if (cartCount > 0) {
      return history.push('/tienda/carrito')
    }
    setShowToastEmpty(true);
  }

  return (
    <div>
      <button onClick={() => goToCart()}
        className="absolute top-0 right-3 mt-2 ml-2 p-3 w-14 shadow-xl h-14 md:bg-green md:text-white flex justify-center items-center text-center rounded-full bg-white z-10">
          {cartCount === 0
              ? <div className="">
                  <IonIcon className="text-4xl" icon={cartOutline} />
                </div>
              : <div className="">
                  <IonIcon className="text-4xl relative" icon={cartSharp} />
                  <IonBadge color="danger" className="absolute mb-6">{props.cart.length}</IonBadge>
                </div>
            }
          <IonIcon className="text-4xl" icon={cartSharp} />
      </button>
      <IonToast
        isOpen={showToastEmpty}
        onDidDismiss={() => setShowToastEmpty(false)}
        message="Aún no tienes productos en el carrito"
        duration={800}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(CartButtonHeader);
