import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonSkeletonText } from '@ionic/react';
import { RouteComponentProps, useParams } from "react-router-dom";
import Footer from "../components/FooterMenu";
import Header from "../components/searchBar";
import ProductRow, { Params } from "../components/ProductRow";
import { connect } from 'react-redux';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { IProduct } from '../interfaces/Product.interface';

interface IProps {
  products: IProduct[],
}
const ProductsPage: React.FC<IProps & RouteComponentProps<any>> = props => {
  const { category } = useParams<Params>();
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('tags','array-contains', category ))
        const productsSnapshot = await getDocs(q);
        const data = productsSnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        });
        setProducts(data as IProduct[]);
      } catch (error) {
        console.log (error)
      }
    }
    getProducts();
  }, [category])

  const productSkeleton = (key: string) =>
    <div key={key} className="w-11/12 flex bg-white shadow-sm rounded-xl ">
      <div className="w-1/3">
        <IonSkeletonText animated className="h-full rounded-l-xl" />
      </div>
      <div className="w-2/3 p-4">
        <IonSkeletonText animated className="h-6 mb-4" />
        <IonSkeletonText animated className="w-7/12" />
        <IonSkeletonText animated className="w-10/12" />
        <IonSkeletonText animated className="w-9/12" />
        <IonSkeletonText animated className="w-8/12" />
        <div className="flex flex-wrap item-center justify-between mt-3">
          <IonSkeletonText animated className="w-4/12 h-6" />
          <IonSkeletonText animated className="w-6/12 h-6"/>
        </div>
      </div>
    </div>

  return (
    <IonPage className="font-inter">
      <Header showBack={true}/>

      <IonContent className="font-inter" style={{'--ion-background-color':'#f5f7ff'}}>
        <div className="w-11/12 lg:w-5/12 grid grid-cols-2 md:grid-cols-3 gap-3 mx-auto pt-4">
          {products
          // TODO: we most sort the products by some sort of relevance, ex # of sales or starts etc. -> NOT AS RANDOM SORT
          ? products.sort(() => Math.random() - 0.5).map(product => <ProductRow key={product.id} product={product}/>)
          : [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(skeleton => (productSkeleton((skeleton * 2).toString()))) }
        </div>
      </IonContent>

      <Footer />
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    products: state.shop.products,
  }
}

export default connect(mapStateToProps)(ProductsPage);
