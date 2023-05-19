import React, { useState } from 'react';
import { IonHeader, IonIcon, IonSearchbar} from '@ionic/react';
import { RouteComponentProps, withRouter, useHistory } from "react-router-dom";
import { chevronBack } from 'ionicons/icons';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../config/firebase';
interface componentProperties {
  showBack: boolean
}

const SearchBar: React.FC<componentProperties & RouteComponentProps<any>> = props => {
  const history = useHistory();
  const [searchText] = useState('');
  const [showBack] = useState(props.showBack);

  const goBack = () => {
    if (history.length > 2) {
      return history.goBack();
    }
    history.push("/home");
  }

  const searchProduct = async (search: string) => {
    await addDoc(collection(db, "searches"), {
      search
    });
  }

  return (
    <IonHeader className="h-14 md:h-20 flex justify-center items-center bg-gray" >
      {showBack
        ? <IonIcon onClick={() => goBack()} className="ml-2 text-4xl cursor-pointer" icon={chevronBack} />
        : <img id="logo" className="ml-2 h-12 md:h-16" src="./assets/images/slinqer_logo.svg" alt="Logo Slinqer" />
      }
      <IonSearchbar className="mx-auto" mode="ios"
        placeholder="Shampoo en barra" animated={true}
        value={searchText} onIonChange={e => searchProduct(e.detail.value!)}
        debounce={1000}
      >
      </IonSearchbar>
    </IonHeader>
  );
};

export default withRouter(SearchBar);
