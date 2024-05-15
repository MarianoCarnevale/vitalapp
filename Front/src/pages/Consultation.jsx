import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { ConsultationForm } from "../components/consultations/ConsultationForm.jsx";
import { ConsultationList } from "../components/ConsultationsList.jsx";

const Consultation = () => {
  return (
    <section className="w-5/6 max-w-md m-auto flex flex-col bg-white rounded-md ">
      <ToastContainer />
      
      <ConsultationList />
    </section>
  );
};

export default Consultation;
