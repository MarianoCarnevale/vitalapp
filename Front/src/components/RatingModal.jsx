import { useContext, useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RatingContext } from "../contexts/RatingContext";
import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { VITE_BASE_URL } from "../config/env";
import useOutsideClick from "../hooks/useOutsideClick";

export const RatingModal = ({ modalData, setIsModal }) => {
  const { token } = useContext(UserTokenContext);
  const { response_id } = modalData;
  const { isModal } = useContext(RatingContext);
  const [value, setValue] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const ref = useRef();

  const handleOutsideClick = () => {
    setIsModal(false);
  };

  useOutsideClick(ref, handleOutsideClick);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value !== 0 && !submitting) {
      setSubmitting(true);
      const submitRating = async () => {
        try {
          const data = { rating_value: Number(value) };
          const response = await axios.post(
            `${VITE_BASE_URL}/ratings/${response_id}`,
            data,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          toast.success("Valoración enviada correctamente");
          setTimeout(() => {
            setIsModal(false);
          }, 1500);
        } catch (error) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            setIsModal(false);
          }, 1500);
        } finally {
          setSubmitting(false);
        }
      };
      submitRating();
    }
  }, [value]);

  return (
    <>
      <ToastContainer autoClose={1500} />
      {isModal && (
        <div className=" fixed inset-0 transition-opacity z-20">
          <div className="absolute inset-0 bg-black opacity-75 "></div>
          <div
            ref={ref}
            className="flex flex-col justify-center items-center gap-3
            overflow-hidden transform transition-all bg-white dark:bg-gradient-to-bº dark:from-slate-900 dark:to-sky-800 w-fit mt-72 ml-[50%]  p-8 rounded-lg"
          >
            <p className="font-bold text-2xl text-primary dark:text-white">
              Valora la respuesta:
            </p>

            <Rating
              name="half-rating"
              defaultValue={0.5}
              precision={1}
              size="large"
              value={value}
              onChange={handleRatingChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

RatingModal.propTypes = { response: PropTypes.string };
