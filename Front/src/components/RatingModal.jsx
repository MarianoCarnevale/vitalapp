import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RatingContext } from "../contexts/RatingContext";
import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { VITE_BASE_URL } from "../config/env";

// import { VITE_BASE_URL } from "../config/env.js";
// import axios from "axios";

export const RatingModal = ({ modalData, setIsModal }) => {
  const { token } = useContext(UserTokenContext);
  const { response_id } = modalData;
  const { isModal } = useContext(RatingContext);
  const [value, setValue] = useState(0);
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);

    // hay que cambiar hacer un axios de post rating
  };

  const handleSubmit = async () => {
    try {
      const data = { rating_value: Number(value) };
      console.log(data);
      const response = await axios.post(
        `${VITE_BASE_URL}/ratings/${response_id}`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Valoración enviada correctamente")
      setTimeout(() => {
        setIsModal(false);
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        setIsModal(false);
      }, 1500);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      {isModal && (
        <div className=" fixed inset-0 transition-opacity z-20">
          <div className="absolute  inset-0 bg-gray-500 opacity-75 "></div>
          <div
            className="flex flex-col gap-7
            overflow-hidden transform transition-all bg-white dark:bg-slate-400 p-8 m-auto rounded-lg"
          >
            <p>Valora la respuesta:</p>

            <Rating
              name="half-rating"
              defaultValue={0.5}
              precision={0.5}
              size="large"
              value={value}
              onChange={handleRatingChange}
            />

            <button onClick={handleSubmit}>Valorar</button>
          </div>
        </div>
      )}
    </>
  );
};
RatingModal.propTypes = { response: PropTypes.string };
