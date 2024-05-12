import { useState } from "react";
import { toast } from "react-toastify";
import { postNewConsultation } from "../api/postnewConsultation.js";
import { getDoctorsByDisciplineApi } from "../api/getDoctorsByDisciplineApi.js";
import { postNewFileApi } from "../api/postNewFileApi.js";
import { getDisciplinesApi } from "../api/getDisciplinesApi.js";

export const useConsultation = ( handleSubmit, reset ) => { 
  //lista de disciplinas
  const [disciplines, setDiscipline] = useState([]);

  //Valor a enviar de disciplinas
  const [especialidad, setespecialidadValue] = useState("");

  //lista de doctores
  const [doctors, setDoctors] = useState([]);

  //valor a enviar de doctores
  const [doctor, setDoctorValue] = useState("");

  //valor de severidad
  const [gravedad, setgravedadValue] = useState("");

  //desabilitar o habilitar select doctors y submit
  const [disable, setDisabel] = useState([true]);


  //manejo de select de disciplinas
  const handelSeletDiscipline = async (event) => {
    
    
    //obtener el valor de el formulario
    const discipline_value = event.target.value;
    
    //si la especialidad selecionada no esta vacia
    if (discipline_value) {
      setespecialidadValue(discipline_value);    

      //Si se selecciona disciplina habilitar submit
      setDisabel(false);
      
      //Obtener lista de doctores
      const doctors_array = await getDoctorsByDisciplineApi(discipline_value);
      
      //Si no hay doctores
      if (!doctors_array) {

        //deshabilitar y restaurar los valores de doctors a null
        toast.error('No hay doctores disponibles');
        setDoctors([])
        setDisabel(true)
      } else { 

        //establecer la lista de doctores en el select
        setDoctors(doctors_array);
      }

    } else {
      //Sino deshabilitar el select de doctores
      setespecialidadValue("");
      setDisabel(true);

    }
  };


  const OnSubmit = handleSubmit(async (data) => {
    //obtener valor de doctor
    const doctor_sub = data.doctor;
    const file = data.file[0];

    //Si no se selecciono doctor
    if (!doctor_sub) {
      //Seleccionar uno random de la lista de doctores
      const random = Math.floor(Math.random() * doctors.length);

      //Asignarlo a los valores a enviar
      data.doctor = doctors[random].doctor_id;
    }
    
    if (data.file.length > 0) {
      
      const consultation_id = await postNewConsultation(data);

      if (!consultation_id) {
        toast.error("Error al enviar la consulta");
        return;
      }
      
      const resp_file = await postNewFileApi(file, consultation_id)

      if (!resp_file) {
        toast.error('La imagen debe ser un png o un jpg');
        return;
      }
    } 
    reset();
    toast.success("Consulta enviada correctamente");
    
  });
  const getDiscipline = async () => {
      const disciplines_values = await getDisciplinesApi();
      
      setDiscipline(disciplines_values);
      }

  return {
    disciplines,
    especialidad,
    doctor,
    setDoctorValue,
    doctors,
    gravedad,
    setgravedadValue,
    OnSubmit,
    handelSeletDiscipline,
    getDiscipline,
    disable
  }
}