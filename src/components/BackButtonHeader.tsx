import { IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const BackButtonHeader: React.FC<{}> = props => {
  const history = useHistory();

  const goBack = () => {
    if (history.length > 2) {
      return history.goBack();
    }
    history.push("/home");
  }
  return (
    <button onClick={() => goBack()}
      className="absolute mt-2 ml-2 p-3 w-14 h-14 md:bg-green md:text-white shadow-xl flex justify-center items-center text-center rounded-full bg-white z-10">
        <IonIcon className="text-4xl" icon={chevronBack} />
    </button>
  );
};

export default BackButtonHeader;
