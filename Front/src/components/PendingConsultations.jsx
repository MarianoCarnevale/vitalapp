import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const PendingConsultations = (children) => {
  //poner clases distintas a cada gravedad
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
    <>
      <div className="  gap-2 items-left h-fit w-full  border-primary rounded-3xl">
        <p className="max-lg:mb-5 lg:mt-1 mb-5 w-5/6 text-left  text-primary dark:text-white font-semibold text-3xl ">
          Consultas Pendientes
        </p>
        <ul className="w-full max-h-[22.5rem] flex flex-col gap-5 dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800   bg-white p-5 border-white rounded-3xl overflow-auto hide-scrollbar shadow-lg">
          {children.results.filter((result) => result.is_pending === 1)
            .length === 0 && <p>No existen consultas pendientes.</p>}
          {children.consultations.filter(
            (consultation) => consultation.is_pending === 1
          ).length > 0 &&
            children.results
              .filter((consultation) => consultation.is_pending === 1)
              .map((consultation) => {
                return (
                  <Link
                    key={consultation.consultation_id}
                    to={`/consultations/${consultation.consultation_id}`}
                    className="text-white font-semibold list-none"
                  >
                    <li
                      className="flex justify-between items-center hover:shadow-md shadow-xl p-4 text-primary dark:text-white font-bold rounded-3xl"
                      key={consultation.consultation_id}
                    >
                      <p className="w-1/3">
                        {consultation.first_name} {consultation.surname}
                      </p>
                      <p
                        className={`grow-2 py-1 px-2  rounded-xl text-white ${getStatusClass(
                          consultation.severity
                        )}`}
                      >
                        {consultation.severity}
                      </p>
                      <p className="grow-1">
                        {consultation.created_at.slice(0, 10)}
                      </p>
                    </li>
                  </Link>
                );
              })}
        </ul>
      </div>
    </>
  );
};

PendingConsultations.propTypes = { children: PropTypes.array };
