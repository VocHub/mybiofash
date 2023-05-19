import { addDoc, collection } from 'firebase/firestore';
import api from '../config/api';
import { db } from '../config/firebase';
import { IOrder } from '../interfaces/Order.interface';

const create = async (data: IOrder) => {
  try {
    console.log (data);
    // Create info firestore DB
    await addDoc(collection(db, "orders"), {...data});
    // Notify order by email
    const response = await api.post(`/orders/notification`, data);
    console.log(response.data)
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return error;
  }
};

const exportedObject = {
  create,
};

export default exportedObject;
