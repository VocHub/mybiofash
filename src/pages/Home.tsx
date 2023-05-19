import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter  } from "react-router-dom";
import Footer from "../components/FooterMenu";
import Header from "../components/searchBar";
import IPage from "../interfaces/page";
import { auth } from '../config/firebase';
import { IonContent, IonPage, IonSkeletonText } from '@ionic/react';
import { ICategory } from '../interfaces/Category.interface';
import { onAuthStateChanged, User } from "firebase/auth";
import categoriesService from "../services/category.service";
// import { isSupported, getToken } from "firebase/messaging";


const HomePage: React.FC<IPage & RouteComponentProps<any>> = props => {
  const history = useHistory();
  const [categories, setCategories] = useState<ICategory[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // const subscribeFirebase = async() => {
    //   try {
    //     const supported = await isSupported();
    //     if (supported) {
    //       const token = await getToken(messaging);
    //       localStorage.setItem('token', token)
    //       // TODO: check if token is already on database, if not save as new user
    //       console.log(token);
    //     }
    //   } catch (error) {
    //     console.log (error)
    //   }
    // }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    const getCategories = async () => {
      try {
        const categories = await categoriesService.get()
        setCategories(categories);
      } catch (error) {
        console.log (error);
      }
    }
    getCategories();

    // subscribeFirebase();
  }, [])


  return (
    <IonPage className="font-inter">
      <Header showBack={false}/>

      <IonContent style={{'--ion-background-color':'#f5f7ff'}} className="font-inter">
        <div className="w-11/12 lg:w-9/12 mt-6 mx-auto">
          <span className="text-xl font-bold text-gray-500">Categorías</span>
        </div>
        <div className="w-11/12 lg:w-9/12 mt-4 mx-auto grid grid-cols-3 gap-3">
            {categories
            ?
              categories.map(item => item.active && (
                <div key={item.id} onClick={() => history.push(`/tienda/${item.code}`)}
                  className="w-full p-2 cursor-pointer bg-white items-center shadow-xl rounded-xl"
                >
                  <div className="h-16 md:h-36 mb-3">
                    <img src={item.img} className="h-full mx-auto" alt="" />
                  </div>
                  <div className="text-center self-center">
                    <p className="text-gray-700 leading-none">{item.name}</p>
                  </div>
                </div>
              ))
            :
              [1,2,3,4,5,6,7].map(item => <IonSkeletonText key={item} animated className="h-20 lg:h-40 rounded-lg" />)
          }

        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default withRouter(HomePage);
