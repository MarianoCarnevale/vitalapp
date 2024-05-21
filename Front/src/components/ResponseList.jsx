import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { dateFormat } from "../api/dateFormat.js";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

export const ResponseList = ({ consultation_id }) => {
  const [response, setResponse] = useState([]);
  // const [results, setresults] = useState([]);

  const token = localStorage.getItem("token");
  //Obtener listado de responses del back
  useEffect(() => {
    const getResponses = async () => {
      const resp = await axios.get(
        `${VITE_BASE_URL}/responses/${consultation_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const responses = Object.values(resp.data.data.responses);

      //sacar respuestas
      setResponse(responses);
    };
    getResponses();
  }, []);
  console.log(response);
  return (
    <>
      {response.map((respon) => (
        <li
          key={respon.response_id}
          className="flex justify-between items-center  gap-3 shadow-xl p-4 text-primary font-medium text-md rounded-3xl"
        >
          <p>
            {respon.first_name} {respon.last_name}
          </p>
          <p className="w-5/6  max-lg:max-w-md text-sm text-center font-bold text-secondary">
            {respon.content}
          </p>
          {respon.role === "doctor" && (
            <Rating
              name="rating"
              value={`${respon.avg_rating}`}
              precision={0.5}
              readOnly
            />
          )}
          <p className="grow-1">{dateFormat(respon.created_at)}</p>
        </li>
      ))}
    </>
  );
};

ResponseList.propTypes = {
  consultation_id: PropTypes.string.isRequired,
};
