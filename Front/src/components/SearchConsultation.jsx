import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const SearchConsultation = ({ consultations }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const filteredResults = consultations.filter((consultation) => {
    const matchesSearchTerm = Object.values(consultation).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearchTerm;
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <p className=" mr-auto text-primary dark:text-white text-3xl font-semibold">
        Busca tu consulta
      </p>
      <div className="flex :border-none gap-2 items-center border dark:border-none p-4 bg-white dark:bg-sky-800 w-full  border-primary rounded-3xl">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="w-full dark:bg-sky-800 focus-visible:outline-none focus-visible:border-none dark:text-white dark:placeholder:text-white"
          type="text"
          placeholder="Busca una consulta..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <ul className="lg:w-full max-lg:h-full flex flex-col gap-5 h-[17.3rem] dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800  bg-white p-5 border-white rounded-3xl overflow-auto hide-scrollbar shadow-lg">
        {filteredResults.length === 0 && (
          <p className="dark:text-white">No existen consultas pendientes.</p>
        )}
        {filteredResults.length > 0 &&
          filteredResults.map((consultation) => {
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
                    className={`py-1 px-2 rounded-xl text-white ${
                      consultation.severity === "BAJA"
                        ? "bg-green-500"
                        : consultation.severity === "MEDIA"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {consultation.severity}
                  </p>
                  <p className=" text-right">
                    {consultation.created_at.slice(0, 10)}
                  </p>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

//proptypes

SearchConsultation.propTypes = { consultations: PropTypes.array };
