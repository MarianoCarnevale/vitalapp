import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_BASE_URL } from "../config/env";
import axios from "axios";

const YourConsultation = () => {
  const [consultation, setConsultation] = useState();

  const token = localStorage.getItem("token");

  const { consultation_id } = useParams();

  useEffect(() => {
    const getConsultation = async () => {
      const resp = await axios.get(
        `${VITE_BASE_URL}/consultations/${consultation_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const consultation = Object.values(resp.data.data.consultations);

      setConsultation(consultation);
    };
    getConsultation();
  }, []);
  console.log(consultation[0].consultation_id);
  return (
    <section className="w-5/6 max-w-md m-auto py-10 flex flex-col bg-white rounded-md ">
      <ToastContainer />
      <h1>Tu consulta</h1>
    </section>
  );
};

export default YourConsultation;
