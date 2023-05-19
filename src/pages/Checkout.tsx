import { IonContent, IonFooter, IonIcon, IonLoading, IonPage, IonSpinner } from '@ionic/react';
import { leaf } from 'ionicons/icons';
import { useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from "../components/BackButtonHeader";
import { ICartProduct, IOrder } from '../interfaces/Order.interface';
import OrdersService from "../services/order.service";
import { whatsappButton } from './Cart';
import './Checkout.css';
import config from "../config/config";

interface IPageProps {
  cart: ICartProduct[],
  total: number
}
const CheckoutPage: React.FC<IPageProps> = props => {
  const history = useHistory();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IOrder>();
  const [sendingRequest, setSendingRequest] = useState(false);

  const CityWatched = () => {
    const inCali = useWatch({
      control,
      name: "address.inCali",
    });
    const city = useWatch({
      control,
      name: "address.city",
    });

    if (inCali === "true" || !inCali) {
      return (
        <div className="flex items-center justify-between border-b-4">
          <p className="text-2xl text-gray-700 font-bold mr-2">Envío a Cali/Jamundi</p>
          <p className="text-2xl text-gray-500">
            <NumberFormat value={8000} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
          </p>
        </div>
      )
    }
    return (
      <div className="flex items-center justify-between border-b-4">
        <p className="text-2xl text-gray-700 font-bold mr-2">Envío a {city}</p>
        <p className="text-xl text-gray-500">
          *El valor depende del peso y tamaño de los productos
        </p>
      </div>
    )

  }

  const CityInput = () => {
    const inCali = useWatch({
      control,
      name: "address.inCali",
    });
    return (
      <div className="w-3/5">
      {errors.address?.city && inCali === "false" && <p className="text-red-400">Campo necesario</p>}
      <input
        id="other_input"
        placeholder={(!inCali || inCali === "true") ? "Cali o Jamundi" : "Ingresa tu Ciudad"}
        {...register("address.city", { required: inCali === "true" ? false : true })}
        type="text"
        className={`${inCali === "true" ||!inCali ? "invisible" : ""} w-full py-2 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green`}
        disabled={(inCali === "true" || !inCali) ? true : false}
      />
      </div>
    )
  }

  const TotalComponent = () => {
    const inCali = useWatch({
      control,
      name: "address.inCali",
    });
    if (inCali === "true" || !inCali) {
      return (
        <div className="flex justify-between">
          <p className="text-2xl text-gray-700 font-bold mr-2">Total</p>
          <p className="text-2xl text-gray-500">
            <NumberFormat value={props.total + config.caliShippingCost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
          </p>
        </div>
      )
    }
    return (
      <div className="flex justify-between">
        <p className="text-2xl text-gray-700 font-bold mr-2">Total</p>
        <div className="text-2xl text-gray-500">
          <NumberFormat value={props.total} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
          <p>+ Envío</p>
        </div>
      </div>
    )
  }

  const PaymentButton = () => {
    const inCali = useWatch({
      control,
      name: "address.inCali",
    });
    if (inCali === "true" || !inCali) {
      return (
        <div className="flex justify-center space-x-2">
          <p>Pagar ahora</p>
          <NumberFormat value={props.total + config.caliShippingCost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </div>
      )
    }
    return (
      <div className="flex justify-center space-x-2">
        <p>Pagar ahora</p>
        <NumberFormat value={props.total} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        <p>+ Envio</p>
      </div>
    )
  }

  const onSubmit: SubmitHandler<IOrder> = async formData => {
    try {
      setSendingRequest(true);
      const orderData: IOrder = {
        ...formData,
        phone: parseInt(formData.phone.toString()),
        total: props.total,
        products: props.cart,
      }
      if (orderData.address.inCali === "true") {
        orderData.address.city = "Cali/Jamundi";
      }
      await OrdersService.create(orderData);
      // TODO: also remove cart from reducer
      localStorage.removeItem("cart");
      history.push('/confirmacion');
    } catch (e) {
      console.error (e)
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <IonPage className="font-inter bg-gray">
      <Header />
      <IonContent className="font-inter" style={{'--ion-background-color':'#f5f7ff'}}>
        <div className="text-center mt-6">
          <span className="text-4xl font-bold text-gray-800">Datos de Envío</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} id="myform" className="mt-6 w-11/12 md:w-5/12 mx-auto">
          <div className="flex flex-wrap md:flex-nowrap md:space-x-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="font-medium text-lg text-gray-700">Nombre</label>
              {errors.name && <p className="text-red-400">Campo necesario</p>}
              <div className="mt-1">
                <input
                  id="name"
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full py-2 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="font-medium text-lg text-gray-700">Teléfono</label>
              {errors.phone && <p className="text-red-400">Campo necesario</p>}
              <div className="mt-1">
                <input
                  {...register("phone", { required: true})}
                  type="tel"
                  className="w-full py-2 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green"
                />
              </div>

            </div>
          </div>


          <div>
            <label className="font-medium text-lg text-gray-700">Ciudad</label>
            <div className="flex md:space-x-4">
              <select className="w-2/5 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green" {...register("address.inCali")}>
                <option value="true">Cali o Jamundi</option>
                <option value="false">Otra</option>
              </select>
              <CityInput />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="font-medium text-lg text-gray-700">Dirección</label>
            {errors.address?.address && <p className="text-red-400">Campo necesario</p>}
            <div className="mt-1">
              <input
                {...register("address.address", { required: true })}
                type="text"
                className="w-full py-2 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="font-medium text-lg text-gray-700">Comentarios Adicionales</label>
            <input
              {...register("address.comments", { required: false })}
              type="text"
              placeholder="*Torre, apartamento, piso"
              className="w-full py-2 rounded-lg shadow-sm focus:outline-none focus:border-green border border-gray-300 focus:ring-2 focus:ring-green"
            />
          </div>
          {whatsappButton()}
          <div className="text-center my-10">
            <span className="text-4xl font-bold text-gray-800">Tipo de envío</span>
          </div>

          <div className="flex w-full md:w-2/3 space-x-4 mx-auto ">
            <div className="w-1/2 p-4 flex items-center justify-center bg-white rounded-xl shadow-lg relative">
              <input className="absolute top-3 right-3" {...register("shipment", { required: true })} id="normal_input" name="shipment" type="radio" value="normal" checked/>
              <label htmlFor="normal_input" >
                <div>
                  <span className="text-2xl font-semibold text-gray-700">Normal</span>
                </div>
                <p className="text-xl text-gray-500">Entrega en 1 o 2 días hábiles</p>
              </label>
            </div>
            <div className="w-1/2 p-4 flex items-center justify-center bg-gray-100 rounded-xl shadow-lg relative ring ring-green ring-opacity-50">
              <input className="absolute top-3 right-3" {...register("shipment", { required: true })} id="eco_input" name="shipment" type="radio" value="eco " disabled/>
              <label htmlFor="eco_input">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-green">Ecológico</span>
                  <IonIcon className="ml-2 text-green text-2xl" icon={leaf} />
                </div>
                <p className="text-lg text-gray-400">Entrega con bajo impacto medioambiental</p>
                <p className="text-xl text-gray-400 text-center mt-2">Disponible pronto*</p>
              </label>
            </div>
          </div>

          <div className="text-center my-8">
            <span className="text-4xl font-bold text-gray-800">Método de Pago</span>
            {errors.payment && <p className="text-red-400">Elige un método de pago</p>}
          </div>

          <div className="flex space-x-4 mb-10">
            <div className="w-1/3 p-4 flex items-center justify-center bg-white rounded-xl shadow-lg relative">
              <input className="absolute top-3 right-3" {...register("payment", { required: true })} id="nequi_input" name="payment" type="radio" value="nequi" />
              <label htmlFor="nequi_input" >
                <img className="h-12 md:h-16 " src="./assets/icons/nequi.webp" alt="Logo Nequi" />
              </label>
            </div>
            <div className="w-1/3 p-4  flex items-center justify-center bg-white rounded-xl shadow-lg relative">
              <input className="absolute top-3 right-3" {...register("payment", { required: true })} id="bancolombia_input" name="payment" type="radio" value="bancolombia" />
              <label htmlFor="bancolombia_input">
                <img className="h-auto mt-4" src="./assets/icons/bancolombia.webp" alt="Logo Bancolombia" />
              </label>
            </div>
            <div className="w-1/3 p-4  flex items-center justify-center bg-white rounded-xl shadow-lg relative">
              <input className="absolute top-3 right-3" {...register("payment", { required: true })} id="daviplata_input" name="payment" type="radio" value="daviplata"/>
              <label htmlFor="daviplata_input">
                <img className="h-12 md:h-20 " src="./assets/icons/daviplata.webp" alt="Logo Daviplata" />
              </label>
            </div>
            <div className="w-1/3 p-4  flex items-center justify-center bg-white rounded-xl shadow-lg relative">
              <input className="absolute top-3 right-3" {...register("payment", { required: true })} id="pse_input" name="payment" type="radio" value="pse"/>
              <label htmlFor="pse_input">
                <img className="h-12 md:h-20" src="./assets/icons/pse.png" alt="Logo PSE" />
              </label>
            </div>

          </div>
        </form>

        <div className="text-center mt-10">
          <span className="text-4xl font-bold text-gray-800">Resumen</span>
        </div>
        <div className="w-11/12 md:w-5/12 mx-auto space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl text-gray-700 font-bold mr-2">Valor productos</p>
            <p className="text-2xl text-gray-500">
              <NumberFormat value={props.total} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </p>
          </div>
          <CityWatched />
          <TotalComponent />

        </div>
        <IonLoading
          isOpen={sendingRequest}
          message={'Creando orden...'}
        />
      </IonContent>

      <IonFooter>
        <div className="flex justify-center">
          <button type="submit" form="myform"
            className="w-full m-1 lg:w-5/12 p-4 bg-green rounded-xl text-white text-2xl font-semibold"
          >
            {sendingRequest
              ?  <IonSpinner name="dots" />
              : <PaymentButton />
            }
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
}

const mapStateToProps = (state: any) => {
  return {
    cart: state.shop.cart,
    total: state.shop.total,
  }
}
export default connect(mapStateToProps)(CheckoutPage);
