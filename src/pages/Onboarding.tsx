import { useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { IonContent, IonFooter, IonPage} from "@ionic/react";
import './Onboarding.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,Navigation,Mousewheel
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination,Navigation,Mousewheel]);

const OnboardingPage: React.FC<RouteComponentProps<any>> = props => {
  const history = useHistory();
  const [ swipe, setSwipe ] = useState<SwiperCore>()
  const [ lastSlide, setLastSlide] = useState(false);

  const nextSlide = () => {
    if (swipe) {
      if (lastSlide) {
        localStorage.setItem('visited', 'true');
        return history.push('/home');
      }
      if (swipe.activeIndex === 1) setLastSlide(true)
      swipe.slideNext();
    }
  }

  return (
    <IonPage className="font-inter">
      <IonContent style={{'--ion-background-color':'#f5f7ff'}}>

          <Swiper pagination={true} allowTouchMove={false}
            className="flex justify-center h-full cursor-move"
            onInit={(ev) => setSwipe(ev)}
          >
            <SwiperSlide className="flex  text-center items-center">
              <div className="space-y-3">
                <div className="block w-3/6 md:w-2/6 mx-auto md:mb-28">
                  <img src="./assets/images/logo_full.svg" alt="Logo slinqer" />
                </div>
                <span className="block  mx-auto w-5/6 text-4xl font-bold text-gray-800">
                  Una tienda pensada en el planeta
                </span>
                <p className="block mx-auto  w-4/6 md:w-2/6 text-2xl text-gray-600">
                  Conectamos marcas ecológicas con una comunidad sostenible.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center">
              <div className="space-y-6">
                <div className="block w-3/6 md:w-2/6 mx-auto md:mb-28">
                  <img src="./assets/images/slide2.svg" alt="Manos sosteniendo una planta" />
                </div>
                <span className="block mx-auto text-center w-5/6 text-4xl font-bold text-gray-800">
                  Productos 100% ecológicos
                </span>
                <p className="block mx-auto text-center w-4/6 md:w-2/6 text-2xl text-gray-600">
                  Encuentra los mejores productos y servicios de nuestras marcas eco-aliadas.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center">
              <div className="space-y-6">
                <div className="block w-3/6 md:w-2/6 mx-auto md:mb-28">
                  <img src="./assets/images/slide3.svg" alt="Mujer comprando online" />
                </div>
                <span className="block mx-auto text-center w-5/6 md:w-2/6 text-4xl font-bold text-gray-800">
                  Ecológico no es igual a una sola opción
                </span>
                <p className="block mx-auto text-center w-4/6 md:w-2/6 text-2xl text-gray-600">
                  Encuentra alternativas ecológicas a los productos que siempre usas. Solo entra, elige y listo!.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
      </IonContent>

      <IonFooter >
        <div className="flex mb-4">
          <button className="w-5/6 md:w-5/12 p-3 text-xl mx-auto text-center bg-green text-white font-bold rounded-xl"
            onClick={() => nextSlide()}
          >
            {lastSlide ? 'Ingresar': 'Siguiente'}
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default withRouter(OnboardingPage);
