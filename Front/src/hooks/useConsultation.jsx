import { useState } from "react";
import { toast } from "react-toastify";
import { postNewConsultation } from "../api/postnewConsultation.js";
import { getDoctorsByDisciplineApi } from "../api/getDoctorsByDisciplineApi.js";
import { postNewFileApi } from "../api/postNewFileApi.js";
// import { getDisciplinesApi } from "../api/getDisciplinesApi.js";
import { getAllDisciplinesWithDoctorsApi } from "../api/getAllDisciplinesWithDoctorsApi.js";

export const useConsultation = (handleSubmit, reset) => {
  //lista de disciplinas
  const [disciplines, setDiscipline] = useState([]);

  const [isNew, setIsNew] = useState(true);

  //Valor a enviar de disciplinas
  const [especialidad, setespecialidadValue] = useState("");

  //lista de doctores
  const [doctors, setDoctors] = useState([]);

  //valor a enviar de doctores
  const [doctor, setDoctorValue] = useState("");

  //valor de severidad
  const [gravedad, setgravedadValue] = useState("");

  //desabilitar o habilitar select doctors y submit
  const [disable, setDisable] = useState([true]);

  //manejo de select de disciplinas
  const handelSeletDiscipline = async (event) => {
    //obtener el valor de el formulario
    const discipline_value = event.target.value;

    //si la especialidad selecionada no esta vacia
    if (discipline_value) {
      setespecialidadValue(discipline_value);

      //Si se selecciona disciplina habilitar submit
      setDisable(false);

      //Obtener lista de doctores
      const doctors_array = await getDoctorsByDisciplineApi(discipline_value);

      //Si no hay doctores
      if (!doctors_array) {
        //deshabilitar y restaurar los valores de doctors a null
        toast.error("No hay doctores disponibles");
        setDoctors([]);
        setDisable(true);
      } else {
        //establecer la lista de doctores en el select
        setDoctors(doctors_array);
      }
    } else {
      //Sino deshabilitar el select de doctores
      setespecialidadValue("");
      setDisable(true);
    }
    return discipline_value;
  };

  const OnSubmit = handleSubmit(async (data) => {
    //obtener valor de doctor
    const doctor_sub = data.doctor;

    //obtener el valor de el archivo
    const file = data.file[0];

    //Si no se selecciono doctor
    if (!doctor_sub) {
      //Seleccionar uno random de la lista de doctores
      const random = Math.floor(Math.random() * doctors.length);

      //Asignarlo a los valores a enviar
      data.doctor = doctors[random].doctor_id;
    }

    //creamos la consulta que retorna el id de la consulta
    const consultation_id = await postNewConsultation(data);

    //si no hay id de consulta retornar error y resetear el formulario
    if (!consultation_id) {
      toast.error("Error al enviar la consulta");
      reset();
      return;
    }
    if (data.file.length > 0) {
      //crear el archivo usando el id de la consulta
      const resp_file = await postNewFileApi(file, consultation_id);

      //si no hay respuesta es la validacion de back que no deja pasar si no es png o jpg
      if (!resp_file) {
        toast.error("La imagen debe ser un png o un jpg");
        reset();
        return;
      }
    }

    //Si todo esta buen devolvemos los valores a null y desabilitamos el submit y los labels
    reset();
    toast.success("Consulta enviada correctamente");
    setespecialidadValue("");
    setDoctorValue("");
    setgravedadValue("");
    setDisable(true);
    setIsNew(false);
  });

  const handelCancel = () => {
    setIsNew(false);
  };
  // funcion para obtener las disciplinas de forma asyn
  const getDiscipline = async () => {
    const disciplines_values = await getAllDisciplinesWithDoctorsApi();

    setDiscipline(disciplines_values);
  };
  //retornar todos los valores q va a usar el formulario
  return {
    isNew,
    disciplines,
    especialidad,
    doctor,
    setDoctorValue,
    setDiscipline,
    doctors,
    gravedad,
    setgravedadValue,
    OnSubmit,
    handelCancel,
    handelSeletDiscipline,
    getDiscipline,
    disable,
  };
};
