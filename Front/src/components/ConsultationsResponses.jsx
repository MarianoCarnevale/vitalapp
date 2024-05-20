import { useEffect, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useResponses } from "../hooks/useResponse.jsx";
import { dateFormat } from "../api/dateFormat.js";
import StarIcon from "@mui/icons-material/Star";
import { RatingContext } from "../contexts/RatingContext.jsx";
import { RatingModal } from "./RatingModal.jsx";

export const ConsultationsResponses = (consultation) => {
  const [modalData, setModalData] = useState(null);

  const { isModal, setIsModal } = useContext(RatingContext);
  const { responses, register, OnSubmit, fetchResponses } =
    useResponses(consultation);

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleClick = (response_id) => {
    setIsModal(!isModal);
    setModalData({ response_id });
    setIsModal(true);
  };
  console.log(responses);
  return (
    <>
      {isModal && <RatingModal modalData={modalData} setIsModal={setIsModal} />}
      <section className="items-center lg:w-1/2 m-auto flex flex-col gap-6 max-lg:w-full max-lg:max-w-md">
        <ToastContainer autoClose={1500} />
        <p className=" text-primary text-2xl font-semibold mb-5">
          Historial de Respuestas
        </p>

        <form onSubmit={OnSubmit} className="flex flex-col w-full gap-7">
          <label
            htmlFor="NewResponse"
            className="text-primary text-2xl font-semibold mb-5"
          >
            Escribe tu respuesta
          </label>
          <input
            id="NewResponse"
            className="border-2 border-primary p-2 w-full rounded"
            type="text"
            {...register("content")}
          />
          <button className="bg-primary p-2 w-full rounded-md text-white active:bg-white active:text-black border-2  disabled:bg-secondary">
            Enviar
          </button>
        </form>
        {(responses.length > 0 && (
          <ul className="w-full flex flex-col gap-5 bg-white p-5 my-5  border-white rounded-3xl max-h-[17rem] overflow-auto hide-scrollbar shadow-lg">
            {responses.map((response) => {
              return (
                <li
                  className={`flex flex-col justify-between  gap-3 `}
                  key={response.response_id}
                >
                  <div
                    className={`flex flex-col shadow-xl p-6 w-full font-medium text-md rounded-3xl`}
                  >
                    <div
                      className={`flex ${
                        response.first_name === consultation.doctor
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <p className={`text-primary font-semibold mb-5 $`}>
                        {response.role === "doctor" ? "Doctor" : "Paciente"}:{" "}
                        {response.first_name}
                        {response.role === "doctor" && (
                          <>
                            <button
                              onClick={() => {
                                handleClick(response.response_id);
                              }}
                            >
                              <StarIcon style={{ color: "#FFA000" }} />
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                    <hr className="border border-primary w-full" />
                    <p>{response.content}</p>
                    <p>{dateFormat(response.created_at)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )) || (
          <p className=" text-primary text-2xl font-semibold mb-5">
            No hay respuestas disponibles
          </p>
        )}
      </section>
    </>
  );
};
