import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ConsultationForm } from "../components/consultations/ConsultationForm.jsx";

export const TramitingConsultations = ({
  results,
  isCreated,
  setIsCreated,
}) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
    }
  };

  return (
    <section className="w-full m-auto   gap-6 items-center">
      <div className="flex max-md:flex-col justify-between items-center ">
        <p className="max-lg:mb-5 self-start max-lg:flex-grow text-primary dark:text-white font-semibold text-3xl ">
          Consultas en Trámite
        </p>
        <div>
          <ConsultationForm isCreated={isCreated} setIsCreated={setIsCreated} />
        </div>
      </div>
      <div className="  gap-2 items-left  w-full  border-primary rounded-3xl">
        <ul className="w-full flex h-[22rem] flex-col gap-5 dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800   bg-white p-5 lg:my-5  border-white rounded-3xl overflow-auto hide-scrollbar shadow-lg">
          {results.filter(
            (result) => result.is_pending === 0 && result.is_active === 1
          ).length === 0 && (
            <p className="dark:text-white">No existen consultas en trámite.</p>
          )}
          {results.map((result) => {
          
            return (
              result.is_active === 1 &&
              result.is_pending === 0 && (
                <Link
                  key={result.consultation_id}
                  to={`/consultations/${result.consultation_id}`}
                >
                  <li
                    className="flex justify-between items-center hover:shadow-md shadow-xl p-4 text-primary dark:text-white font-bold rounded-3xl"
                    key={result.consultation_id}
                  >
                    <p className="w-1/3">
                      {result.first_name} {result.surname}
                    </p>
                    <p
                      className={`py-1 px-2 rounded-xl text-white ${getStatusClass(
                        result.severity
                      )}`}
                    >
                      {result.severity}
                    </p>
                    <p>{result.created_at.slice(0, 10)}</p>
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      </div>
    </section>
  );
};

TramitingConsultations.propTypes = {
  results: PropTypes.array.isRequired,
  isCreated: PropTypes.bool.isRequired,
  setIsCreated: PropTypes.func.isRequired,
};
