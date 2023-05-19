import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { IonIcon, IonPage } from "@ionic/react";
import BackButtonHeader from "../components/BackButtonHeader";
import FooterMenu from "../components/FooterMenu";
import { auth, loginProvider } from "../config/firebase";
import { useEffect, useState } from "react";
import { clipboardOutline, homeOutline, logOutOutline } from "ionicons/icons";


const ProfilePage: React.FC<{}> = props => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [])
  const logout = () => {
    signOut(auth).then(() => {
      setUser(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }
  const loginWithGoogle = async () => {
    signInWithPopup(auth, loginProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
        }
      }).catch((error) => {
        alert(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <IonPage className="font-inter bg-gray">
      <BackButtonHeader/>
      {
        !user
        ?
          <div className="h-screen">
            <div className="h-3/5 bg-green">
            </div>
            <div className="mt-3 space-y-3 mx-auto w-11/12 lg:w-5/12">
              <span className="text-2xl font-bold text-gray-700">Ingresa</span>
              <button onClick={() => loginWithGoogle()}
                className="w-4/5 cursor-pointer flex mx-auto space-x-2 justify-center items-center p-4 bg-white rounded-xl text-gray-600 text-2xl shadow-xl font-semibold"
              >
                <img className="h-10" src="./assets/icons/logo-google.svg" alt="logo-google" />
                <p>Ingresar con Google</p>
              </button>
            </div>
          </div>
        :
          <div className="mx-auto w-11/12 lg:w-5/12">
            <img className="mt-10 h-40 mx-auto rounded-full ring-4 ring-green" src={user.photoURL? user.photoURL : "./assets/icons/user.svg"} alt="logo-google" />
            <div className="grid grid-cols-1 space-y-2">
              <span className="mx-auto mt-3 text-2xl text-gray-700 font-bold">{user.displayName}</span>
              <div className="flex justify-between bg-white shadow-lg rounded-lg p-4 text-gray-700 text-xl cursor-pointer">
                <p>Mis direcciones de entrega</p>
                <IonIcon className="text-4xl" icon={homeOutline} />
              </div>
              <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 text-gray-700 text-xl cursor-pointer">
                <p>Mis pedidos</p>
                <IonIcon className="text-4xl" icon={clipboardOutline} />
              </div>
              <div onClick={() => {logout()}} className="flex justify-between bg-white shadow-lg rounded-lg p-4 text-gray-700 text-xl cursor-pointer">
                <p>Cerrar sesion</p>
                <IonIcon className="text-4xl" icon={logOutOutline} />
              </div>
            </div>
          </div>
      }
      <FooterMenu />
    </IonPage>
  );
};
export default ProfilePage;
