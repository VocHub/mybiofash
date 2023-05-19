import React, { useEffect, useState } from 'react';
import { IonBadge, IonIcon, IonToast} from '@ionic/react';
import { Link, useHistory } from "react-router-dom";
import { logoWhatsapp, cartOutline, cartSharp, homeSharp, personOutline, person, homeOutline } from 'ionicons/icons';
import { connect } from "react-redux";
import { ICartProduct } from '../interfaces/Order.interface';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';

type Props = {
  cart: ICartProduct[]
};

const FooterMenu: React.FC<Props> = (props) => {
  const history = useHistory();
  const [showToastEmpty, setShowToastEmpty] = useState(false)
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User>();


  useEffect(() => {
    setCartCount(props.cart.length);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, [props.cart,  cartCount])

  const goToCart = () => {
    if (cartCount > 0) {
      return history.push('/tienda/carrito')
    }
    setShowToastEmpty(true);
  }

  return (
    <div className="w-full  absolute bottom-2">
      <div className="w-11/12 p-1 md:w-3/12 shadow-lg rounded-xl flex justify-around bg-white mx-auto">
        <Link to={'/home'} className={`${history.location.pathname === "/home" ? 'text-green font-bold' : 'text-gray-700'} text-center`}>
          <IonIcon className="text-2xl" icon={`${history.location.pathname === "/home" ? homeSharp : homeOutline}`} />
          <p>Inicio</p>
        </Link>
        <a href="https://wa.me/573162452663" className="text-center text-gray-700">
          <IonIcon className="text-2xl"icon={logoWhatsapp} />
          <p>Soporte</p>
        </a>
        <button onClick={() => goToCart()}>
          {cartCount === 0
            ? <div className="text-gray-700">
                <IonIcon className="text-2xl" icon={cartOutline} />
                <p>Carrito</p>
              </div>
            : <div className="text-gray-700">
                <IonIcon className="text-2xl relative" icon={cartSharp} />
                <IonBadge color="danger" className="absolute mb-6">{props.cart.length}</IonBadge>
                <p>Carrito</p>
              </div>
          }
        </button>
        {/* <Link to={'/favoritos'} className={`${history.location.pathname === "/favoritos" ? 'text-green font-bold' : 'text-gray-700'} text-center`}>
          <IonIcon className="text-2xl" icon={`${history.location.pathname === "/favoritos" ? heart : heartOutline}`} />
          <p>Favoritos</p>
        </Link> */}
        <Link to={'/perfil'} className={`${history.location.pathname === "/perfil" ? 'text-green font-bold' : 'text-gray-700'} text-center`}>
          {user && user.photoURL
            ?
              <>
                <img src={user.photoURL} alt="user"
                  className={`${history.location.pathname === "/perfil" && 'ring-2 ring-green'} w-8 rounded-full`}
                />
                <p>Yo</p>
              </>
            :
              <>
                <IonIcon className="text-2xl" icon={`${history.location.pathname === "/perfil" ? person : personOutline}`} />
                <p>Mi Perfil</p>
              </>
          }
        </Link>
      </div>
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

export default connect(mapStateToProps)(FooterMenu);
