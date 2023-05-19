import { IonContent, IonFooter, IonIcon, IonPage } from "@ionic/react";
import { checkmarkCircle, logoWhatsapp, paperPlane } from "ionicons/icons";
import { useHistory } from "react-router";

const OrderConfirmedPage: React.FC<{}> = props => {
  const history = useHistory();
  return (
    <IonPage className="font-inter">
      <IonContent className="font-inter">
        <div className="w-11/12 md:w-5/12 h-1/3 mt-6 mx-auto flex justify-center items-center bg-green rounded-2xl shadow-lg">
          <div >
            <IonIcon style={{fontSize: '150px'}} className="block text-white mx-auto" icon={checkmarkCircle} />
            <p className="block text-2xl font-bold text-white">Recibimos tu pedido</p>
          </div>
        </div>

        <div className="w-11/12 md:w-5/12 flex justify-center mx-auto mt-6">
          <div>
            <p className="text-gray-500 text-center">Horario 8:00am - 6:00pm</p>
            <p className="text-xl text-gray-800 text-center">Te contactaremos dentro de los próximos 20 minutos para coordinar los detalles de tu pedido.</p>
            <p className="text-lg text-gray-400 text-center mt-10">O si prefieres puedes contactarnos aquí</p>
          </div>
        </div>

        <div className="w-11/12 md:w-4/12 justify-center mx-auto flex space-x-2">
          <a className="w-1/2 mt-4 p-3 mx-auto justify-center flex h-20 items-center bg-white shadow-lg rounded-xl"
            style={{background: '#00bb2d' }} href="https://wa.me/573162452663"
          >
            <span className="mr-2 text-center flex items-center text-lg md:text-xl font-bold text-white">
              Asesor Whatsapp
            </span>
            <IonIcon className="text-4xl text-white" icon={logoWhatsapp} />
          </a>
          <a className="w-1/2 mt-4 p-3 mx-auto jusitfy-center flex h-20 items-center bg-white shadow-lg rounded-xl"
            style={{background: '#0088cc' }} href="https://t.me/slinqer"
          >
            <span className="mr-2 text-center flex items-center text-lg md:text-xl font-bold text-white">
              Asesor Telegram
            </span>
            <IonIcon className="text-4xl text-white" icon={paperPlane} />
          </a>
        </div>

      </IonContent>
      <IonFooter>
        <div className="flex justify-center m-2">
          <button onClick={() => history.push('/tienda')} className="w-full md:w-1/3 p-4 ring ring-green text-xl text-green font-bold rounded-lg">
            Volver al Inicio
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
}

export default OrderConfirmedPage;
