import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
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
        toast.success(response.data.message);
        setTimeout(async () => {
          setDeleteModal(false);
        }, 1000);
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
      <ToastContainer autoClose={1500} />
      {deleteModal && (
        <div className=" fixed inset-0 transition-opacity z-20">
          <div className="absolute  inset-0 bg-gray-500 opacity-75 "></div>
          <div
            className="flex flex-col gap-7
            overflow-hidden transform transition-all bg-white dark:bg-slate-400 p-8 m-auto rounded-lg"
          >
            <p>Estas seguro que quieres borrar la respuesta?</p>

            <button onClick={handleClickBorrar}>Borrar</button>
            <button onClick={handleClickCancelar}>Cancelar</button>
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
