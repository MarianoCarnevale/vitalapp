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
    <div className="max-w-lg lg:w-full m-auto">
      <div className="flex border gap-2 items-center p-4 bg-white w-full  border-primary rounded-3xl">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="w-full"
          type="text"
          placeholder="Busca una consulta..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <ul className="w-full flex flex-col gap-5 max-h-72 dark:bg-slate-700 bg-white p-5 my-5 border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
        {filteredResults.length === 0 && (
          <p>No existen consultas pendientes.</p>
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
                  className="flex justify-between items-center hover:shadow-md shadow-xl p-4 text-primary font-bold rounded-3xl"
                  key={consultation.consultation_id}
                >
                  <p className="w-1/3">
                    {consultation.first_name} {consultation.last_name}
                  </p>
                  <p
                    className={`py-1 px-2 rounded-xl text-white ${
                      consultation.severity === "low"
                        ? "bg-green-500"
                        : consultation.severity === "medium"
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
