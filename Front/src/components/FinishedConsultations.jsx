import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FinishedConsultations = (children) => {

  return (
    <>
    
          <p className=" w-5/6 text-left text-primary font-semibold text-3xl ">
            Consultas Finalizadas
          </p>
          <div className="  gap-2 items-left  w-full  border-primary rounded-3xl">
            <ul className="w-full flex flex-col gap-5 dark:bg-slate-700  bg-white p-5 my-5  border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
            {(children.results.filter((result) => result.is_pending === 0 && result.is_active === 0).length === 0) && <p>No existen consultas finalizadas.</p>}
            {(children.consultations.filter(
              (consultation) => consultation.is_pending === 0 && consultation.is_active === 0
            ).length > 0 &&
            children.results
            .filter((consultation) => consultation.is_pending === 0 && consultation.is_active === 0)
            .map((consultation) => {
              return (
                      <Link
                        key={consultation.consultation_id}
                        to={`/consultations/${consultation.consultation_id}`}
                        className="text-white font-semibold list-none"
                      >
                        <li
                          className="flex justify-between items-center  gap-2 hover:shadow-md shadow-xl p-4 text-primary font-bold rounded-3xl"
                          key={consultation.consultation_id}
                        >
                          <p>
                            {consultation.first_name} {consultation.last_name}
                          </p>
                          <p className="grow-1">
                            {consultation.created_at.slice(0, 10)}
                          </p>
                        </li>
                      </Link>
                    );
                  }))}
            </ul>
          </div>
    </>
  );
};

FinishedConsultations.propTypes={children: PropTypes.array}