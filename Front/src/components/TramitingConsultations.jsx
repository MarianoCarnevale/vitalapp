import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const TramitingConsultations = ({ consultations, results }) => {
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
  console.log(results.filter((result) => result.is_pending === 0));
  return (
    <section className="w-full m-auto   gap-6 items-center">
      <p className=" text-left text-primary font-semibold text-3xl ">
        Consultas en Trámite
      </p>
      <div className="  gap-2 items-left  w-full  border-primary rounded-3xl">
        <ul className="w-full flex flex-col gap-5 dark:bg-slate-700  bg-white p-5 my-5  border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
          {results.filter(
            (result) => result.is_pending === 0 && result.is_active === 1
          ).length === 0 && <p>No existen consultas en trámite.</p>}
          {consultations.filter(
            (consultation) =>
              consultation.is_pending === 0 && consultation.is_active === 1
          ).length > 0 &&
            results
              .filter(
                (result) => result.is_pending === 0 && result.is_active === 1
              )
              .map((result) => {
                return (
                  <Link
                    key={result.consultation_id}
                    to={`/consultations/${result.consultation_id}`}
                  >
                    <li
                      className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                      key={result.consultation_id}
                    >
                      <p>
                        {result.first_name} {result.doctor_surname}
                      </p>
                      <p
                        className={`grow-2 py-1 px-2  rounded-xl text-white ${getStatusClass(
                          result.severity
                        )}`}
                      >
                        {result.severity}
                      </p>
                      <p>{result.created_at.slice(0, 10)}</p>
                    </li>
                  </Link>
                );
              })}
        </ul>
      </div>
    </section>
  );
};

TramitingConsultations.propTypes = {
  consultations: PropTypes.array,
  results: PropTypes.array,
};
