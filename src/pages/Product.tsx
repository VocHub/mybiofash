import { IonContent, IonFooter, IonPage, IonRadio, IonRadioGroup } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import  Header from "../components/BackButtonHeader";
import  CartButton from "../components/CartButtonHeader";
import './Product.css'
import { getDocs, query, where, documentId } from "firebase/firestore";
import { productsRef } from "../config/firebase";
import Footer from "../components/FooterMenu";
import { addToCart } from "../redux/shopping/shoppingActions";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,Navigation,Mousewheel,Autoplay
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { IProduct, IProductPresentation } from "../interfaces/Product.interface";
import NumberFormat from 'react-number-format';
import { ICartProduct } from "../interfaces/Order.interface";

SwiperCore.use([
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay
]);


interface IParams {
  productId: string,
}

interface IProps {
  addToCart: (product: ICartProduct) => any
}

const ProductPage: React.FC<IProps> = props => {
  const { productId } = useParams<IParams>();
  const [product, setProduct] = useState<IProduct>();
  const [selected, setSelected] = useState<number>(0);
  const [presentationSelected, setPresentationSelected] = useState<IProductPresentation>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const q = query(productsRef, where(documentId(), '==', productId))
        const productsSnapshot = await getDocs(q);
        const data = productsSnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        const product = data[0] as IProduct;
        setProduct(product);
        setPresentationSelected(product.presentations[0])
      } catch (error) {
        console.log (error)
      }
    }
    getProduct();
  }, [productId])

  useEffect(() => {
    setPresentationSelected(product?.presentations[selected])
  }, [selected, product?.presentations])

  const addProduct = () => {
    if (product && presentationSelected) {
      const productToAdd:ICartProduct = {
        ...product,
        qty: 1,
        presentationSelected: presentationSelected
      };
      props.addToCart(productToAdd)

    }
  }

  const presentationItem = (presentation: IProductPresentation, index: number) =>
    <div className={`p-2 flex items-center justify-center bg-white rounded-xl shadow-lg relative
      ${selected === index && 'ring ring-green-400' }`}
      onClick={() => setSelected(index)} key={presentation.id}
    >
      <IonRadio className="md:mr-2" color="success" value={index} />
      <label>
        <div >
          <p className="block md:text-lg mx-auto text-gray-700">{presentation.presentation}</p>
          {
            presentation.units !== 1 &&
            <span className="block md:text-lg mx-auto text-gray-500">{presentation.units} unidades</span>
          }
          <p className="block text-xl text-gray-900 font-bold">
            <NumberFormat value={presentation.cost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
          </p>
        </div>
      </label>
    </div>

  return (
    <IonPage>
      <Header />
      <CartButton />
      <IonContent className="font-inter" style={{'--ion-background-color':'#f5f7ff'}}>
        {product &&
          <div className="h-screen lg:w-8/12 mx-auto lg:grid lg:grid-cols-2 lg:mt-4">

            <Swiper id="product_swipper" autoplay={{delay: 2500, disableOnInteraction: true}} navigation={true}
              pagination={true} mousewheel={true} className="h-2/3 lg:w-11/12 cursor-move"
            >
              {product.images.map((img)=>
                <SwiperSlide key={img}>
                  <div className="w-full h-full bg-cover bg-center lg:rounded-3xl"
                    style={{backgroundImage: `url(${img})`}}
                  ></div>
                </SwiperSlide>
              )}
            </Swiper>

            <div className="px-8 mb-4">
              <div className="flex justify-evenly mx-auto my-4 lg:my-6">
                {product.vegan === true &&
                  <div className="p-3 text-center justify-center w-26 h-26 shadow-lg rounded-3xl bg-white cursor-pointer">
                    <img className="block w-10 mx-auto" src="./assets/images/vegan.svg" alt="Producto Vegano"/>
                    <span className="block text-lg font-semibold text-gray-800">Vegano</span>
                  </div>
                }
                <div className="p-3 text-center justify-center w-26 h-26 shadow-lg rounded-3xl bg-white cursor-pointer">
                  <img className="block w-10 mx-auto" src="./assets/images/co2.svg" alt="Producto carbono neutro"/>
                  <span className="block text-lg font-semibold text-gray-800 mx-auto">Neutro</span>
                </div>
                <div className="p-3 text-center justify-center w-26 h-26 shadow-lg rounded-3xl bg-white cursor-pointer">
                  <img className="block w-10 mx-auto" src="./assets/images/nature.svg" alt="Producto natural"/>
                  <span className="block text-lg font-semibold text-gray-800">Natural</span>
                </div>
              </div>
              <span className="block text-3xl text-gray-800 mb-2 font-semibold">{product.name}</span>
              <p className="block text-lg text-gray-600 mb-2">{product.description}</p>
              <span className="block text-xl text-gray-800 font-semibold mb-4">Presentaciones</span>
              <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)} className="grid grid-cols-2 gap-2 mb-4">
                {product.presentations.map((presentation, index) => (presentationItem(presentation, index)))}
              </IonRadioGroup>
              <span className="block text-xl text-gray-800 font-semibold mb-2">Beneficios</span>
              <p className="block text-lg text-gray-600 mb-10">{product.benefit}</p>
            </div>

          </div>
        }

      </IonContent>
      <Footer />
      <IonFooter className="bg-gray">
        <div className="md:w-2/5 md:mx-auto flex justify-around items-center my-1 font-inter">
          <span className="flex">
            {presentationSelected &&
              <>
                <p className="text-3xl text-gray-700 font-bold">
                  <NumberFormat value={presentationSelected.cost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                </p>
                {
                  presentationSelected.units !== 1 &&
                  <p className="self-end text-xl text-gray-600">{`/${presentationSelected.units} ud`}</p>
                }
              </>
            }
          </span>
          <div>
            <button onClick={() => addProduct()}
              className="p-4 bg-green rounded-xl text-white text-lg font-semibold"
            >Agregar al carro
            </button>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCart: (product: ICartProduct) => dispatch(addToCart(product))
  }
}

export default connect(null, mapDispatchToProps)(ProductPage);
