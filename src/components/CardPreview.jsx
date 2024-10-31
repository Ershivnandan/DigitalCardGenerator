import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Cardtemplate from "./Cardtemplate";

const CardPreview = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      const cardRef = doc(db, "cards/", cardId);
      const cardSnapshot = await getDoc(cardRef);
      if (cardSnapshot.exists()) {
        setCardData(cardSnapshot.data());
      } else {
        console.log("No such card exists!");
      }
    };
    fetchCardData();
  }, [cardId]);

  return cardData ? (
    <Cardtemplate {...cardData} />
  ) : (
    <div>Loading...</div>
  );
};

export default CardPreview;
