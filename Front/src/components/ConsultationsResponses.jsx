import { useEffect, useContext, useState } from "react";
import { useResponses } from "../hooks/useResponse.jsx";
import StarIcon from "@mui/icons-material/Star";
import { RatingContext } from "../contexts/RatingContext.jsx";
import { RatingModal } from "./RatingModal.jsx";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteResponseModal } from "./DeleteResponseModal.jsx";
import { ToastContainer } from "react-toastify";

export const ConsultationsResponses = (consultation) => {
  // sacar el user del token
  const { user } = useContext(UserTokenContext);

  const [modalData, setModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { isModal, setIsModal } = useContext(RatingContext);

  const { responses, register, OnSubmit, fetchResponses } =
    useResponses(consultation);

  useEffect(() => {
    fetchResponses();
  }, [deleteModal]);

  const handleClick = (response_id) => {
    setIsModal(!isModal);
    setModalData({ response_id });
    setIsModal(true);
  };

  const handleDeleteResponse = (response_id) => {
    setDeleteModalData({ response_id, consultation });
    setDeleteModal(!deleteModal);
  };

  // Función para convertir a la fecha que saldrá en el front
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

    return formattedDate;
  };

  return (
    <>
      {isModal && <RatingModal modalData={modalData} setIsModal={setIsModal} />}
      <section className="w-5/6 max-w-lg max-lg:m-auto flex flex-col gap-6 mb-20">
        <ToastContainer autoClose={1500} value={500} />
        {/* <hr className="mt-5 border border-primary dark:border-white w-full" /> */}
        <p className=" text-primary dark:text-white text-left text-3xl font-semibold ">
          Respuestas
        </p>

        <form onSubmit={OnSubmit} className="flex flex-col w-full gap-3">
          <input
            placeholder="Escribe tu respuesta"
            id="NewResponse"
            className="border-2 border-primary placeholder:dark:text-white dark:bg-sky-900 rounded-3xl p-4 w-full"
            type="text"
            {...register("content")}
          />
          <button className="dark:bg-sky-900 shadow-lg hover:shadow-sm duration-300 py-4 font-bold text-primary p-2 w-full rounded-xl dark:text-white  disabled:bg-secondary">
            Enviar
          </button>
        </form>
        {(responses.length > 0 && (
          <ul className="w-full flex flex-col h-fit max-h-[39rem] dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800 bg-white p-5   border-white rounded-3xl overflow-auto hide-scrollbar shadow-lg">
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
                      className={`flex items-center gap-2 ${
                        response.first_name === consultation.doctor
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <p
                        className={`text-primary dark:text-white font-semibold`}
                      >
                        {response.role === "doctor" ? "Doctor" : "Paciente"}:{" "}
                        {response.first_name}
                        {response.role === "doctor" && (
                          <>
                            <button
                              onClick={() => {
                                handleClick(response.response_id);
                              }}
                            >
                              <StarIcon
                                className="mb-[0.1rem] ml-2 dark:fill-white hover:fill-yellow-400 dark:hover:fill-yellow-400 cursor-pointer"
                                color="primary"
                              />
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                    <hr className="border border-primary dark:border-white w-full my-2" />
                    <p
                      className={`w-full text-secondary dark:text-white
                      ${response.role === "doctor" ? "text-left" : "text-right"}
                      `}
                    >
                      {response.content}
                    </p>

                    <div className="flex justify-between items-center">
                      {user.user_id === response.user_id &&
                      user.role === "patient" ? (
                        <DeleteIcon
                          className="cursor-pointer dark:fill-white hover:fill-red-600 hover:hover:fill-red-600"
                          color="primary"
                          onClick={() => {
                            handleDeleteResponse(response.response_id);
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {deleteModal && (
                        <DeleteResponseModal
                          deleteModalData={deleteModalData}
                          setDeleteModal={setDeleteModal}
                          deleteModal={deleteModal}
                        />
                      )}
                      <p
                        className={`w-full text-secondary dark:text-white text-sm font-normal ${
                          response.role === "doctor"
                            ? "text-left"
                            : "text-right"
                        } `}
                      >
                        {formatDate(response.created_at)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )) || (
          <p className=" text-primary dark:text-white text-2xl font-semibold mb-5">
            No hay respuestas disponibles
          </p>
        )}
      </section>
    </>
  );
};
