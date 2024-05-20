import { useContext } from "react";
import { RatingContext } from "../contexts/RatingContext";

export const RatingModal = () => {
  const { isModal } = useContext(RatingContext);
  return <>{isModal && <div>hola</div>}</>;
};
