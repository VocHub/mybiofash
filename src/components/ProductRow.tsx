import { useHistory } from "react-router-dom";
import { IProduct } from "../interfaces/Product.interface";
import NumberFormat from 'react-number-format';

interface IProps {
  product: IProduct,
}

export type Params = {
  category: string
}

const ProductRow: React.FC<IProps> = props => {
  const history = useHistory();

  const goToProduct = (productId: string) => {
    history.push(`producto/${productId}`)
  };

  return (
    <div className=" bg-white shadow-lg rounded-xl font-inter cursor-pointer" onClick={() => goToProduct(props.product.id)}>
      <div className="w-full h-40 bg-cover bg-center rounded-t-xl"
        style={{backgroundImage: `url(${props.product.images[0]})`}}
      ></div>
      <div className="p-2">
        <p className="text-gray-600 leading-none text-lg"
        >{props.product.name}</p>
        <div className="flex flex-wrap item-center justify-between">
          <span className="flex items-center">
            <p className="text-gray-700 font-bold text-xl md:text-2xl">
              <NumberFormat value={props.product.presentations[0].cost} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
            </p>
            {
              props.product.presentations[0].units !== 1 &&
              <p className="text-gray-500">{`/${props.product.presentations[0].units} ud`}</p>
            }
          </span>
        </div>
      </div>
    </div>
  );
}


export default ProductRow;
