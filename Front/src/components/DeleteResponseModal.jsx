import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { VITE_BASE_URL } from "../config/env";
import PropTypes from "prop-types";

export const DeleteResponseModal = ({
  deleteModalData,
  setDeleteModal,
  deleteModal,
}) => {
  const { token } = useContext(UserTokenContext);
  const { response_id, consultation } = deleteModalData;

  const handleClickBorrar = async () => {
    try {
      const response = await axios.delete(
        `${VITE_BASE_URL}/consultations/${consultation.consultation_id}/responses/${response_id} `,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.data.status === "ok") {
        setDeleteModal(false);
        toast.success("Respuesta borrada con éxito");
        // setTimeout(() => {
        // }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleClickCancelar = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {/* <ToastContainer autoClose={1500} /> */}
      {deleteModal && (
        <div className=" fixed inset-0 transition-opacity z-20">
          <div
            onClick={() => setDeleteModal(false)}
            className="absolute  inset-0 bg-gray-500 opacity-75 "
          ></div>
          <div className="w-5/6 flex flex-col lg:w-fit max-lg:m-auto max-lg:mt-[25rem] justify-center items-center gap-3 overflow-hidden transform transition-all bg-white dark:bg-gradient-to-b dar dark:from-slate-900 dark:to-sky-800  mt-72 ml-[40%]  p-8 rounded-lg">
            <p className="font-bold text-2xl text-primary dark:text-white">
              Estas seguro que quieres borrar la respuesta?
            </p>
            <div className="gap-5 flex">
              <button
                className="inline bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 text-white  shadow-md hover:shadow-sm  flex-grow  dark:text-white py-2 px-6  font-semibold rounded-full"
                onClick={handleClickBorrar}
              >
                Borrar
              </button>
              <button
                className="inline bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 text-white  shadow-md hover:shadow-sm  flex-grow  dark:text-white py-2 px-6  font-semibold rounded-full"
                onClick={handleClickCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
DeleteResponseModal.propTypes = {
  deleteModalData: PropTypes.object,
  setDeleteModal: PropTypes.bool,
  deleteModal: PropTypes.bool,
};
