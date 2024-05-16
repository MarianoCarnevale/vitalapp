import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { ConsultationForm } from "../components/consultations/ConsultationForm.jsx";
import { ConsultationList } from "../components/ConsultationsList.jsx";

const Consultation = () => {
  return (
    <section className="w-5/6 m-auto">
      <ToastContainer />
      <ConsultationList />
    </section>
  );
};

export default Consultation;
