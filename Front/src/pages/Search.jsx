import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import axios from "axios";
import { VITE_BASE_URL } from "../config/env";
import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";
import { SearchConsultation } from "../components/SearchConsultation.jsx";
import { RankingDoctor } from "../components/RankingDoctor.jsx";

const Search = () => {
  const { token, user } = useContext(UserTokenContext);
  const [consultations, setConsultations] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      const resp = await axios.get(`${VITE_BASE_URL}/consultations`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const consultation = Object.values(resp.data.data.consultations);

      //se separan por un filter en la opcion pendin
      //establecer el listado de consultas
      setConsultations(consultation);

      //establecer el segundo listado de consultas
      setResults(consultation);
    };

    fetchConsultations();
  }, []);

  return (
    user &&
    (user.role === "doctor" ? (
      <section className="mt-10">
        <div className="w-5/6 max-lg:max-w-lg m-auto grid grid-cols-1 lg:grid-cols-2 max-lg:gap-10 lg:gap-5">
          <section className="max-lg:w-full">
            <RankingDoctor />
          </section>
          <section className="max-lg:w-full">
            <FindPatient />
          </section>
          <SearchConsultation consultations={consultations} results={results} />
        </div>
      </section>
    ) : (
      <section className="w-5/6 max-lg:mt-10 max-lg:max-w-lg m-auto grid grid-cols-1 lg:grid-cols-2 max-lg:gap-10 lg:gap-5">
        <FindDoctor />
        <SearchConsultation consultations={consultations} results={results} />
      </section>
    ))
  );
};

export default Search;
