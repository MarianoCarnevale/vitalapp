import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { VITE_BASE_URL } from "../config/env.js";

const Profile = () => {
  const { token, user } = useContext(UserTokenContext);
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const patientData = response.data.data.patients[0];
        setPatient(patientData);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatient();
  }, [id, token]);

  useEffect(() => {
    if (patient?.avatar) {
      const url = `${VITE_BASE_URL}/users/${patient.user_id}/${patient.avatar}`;
      setAvatarUrl(url);
    }
  }, [patient]);

  return (
    user &&
    user.role === "doctor" && (
      <section className="w-5/6 py-10 m-auto flex flex-col gap-4 items-center max-w-md">
        <h1 className="text-3xl font-bold text-primary  ">
          Perfil del paciente
          {/* {patient && `Perfil del paciente ${patient.first_surname}`} */}
        </h1>

        <div className="my-6 rounded-full overflow-hidden h-40 w-40 z-10">
          <img className="h-40 w-40" src={avatarUrl} alt="Avatar" />
        </div>
        <div className="flex flex-col max-w-md items-center gap-3 absolute mt-48 py-16 bg-white w-5/6 rounded-lg shadow-2xl z-0">
          {patient && (
            <>
              <h2 className=" font-semibold text-right text-primary text-xl">
                {patient.first_name}, {patient.first_surname}
              </h2>
              <h3 className=" font-semibold text-right text-primary text-md">
                Email
              </h3>
              <p className="text-secondary">{patient.email}</p>
              {patient?.phone && (
                <>
                  <h3 className=" font-semibold text-right text-primary text-md">
                    Teléfono
                  </h3>
                  <p className="text-secondary">{patient.phone}</p>
                </>
              )}
              {patient?.address && (
                <>
                  <h3 className=" font-semibold text-right text-primary text-md">
                    Dirección
                  </h3>
                  <p className="text-secondary">{patient.address}</p>
                </>
              )}
              {patient?.bio && (
                <>
                  <h3 className=" font-semibold text-right text-primary text-md">
                    Biografía
                  </h3>
                  <p className="text-secondary">{patient.bio}</p>
                </>
              )}
              {patient?.birth_date && (
                <>
                  <h3 className=" font-semibold text-right text-primary text-md">
                    Fecha de nacimiento
                  </h3>
                  <p className="text-secondary">{patient.birth_date}</p>
                </>
              )}
            </>
          )}
        </div>
      </section>
    )
  );
};

export default Profile;
