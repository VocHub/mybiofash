import api from '../config/api';
import { ICategory } from '../interfaces/Category.interface';

const get = async (): Promise<ICategory[]> => {
  try {
    const response = await api.get<ICategory[]>(`/orders/categories`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    throw new Error('No se pudo obtener')
  }
};

const exportedObject = {
  get,
};

export default exportedObject;
