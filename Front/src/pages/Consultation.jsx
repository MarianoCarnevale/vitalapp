import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VITE_BASE_URL } from '../config/env.js';

const Consultation = () => {
  const [disciplines, setDiscipline ] = useState([]);
  const [disciplinesValue, setDisciplineValue] = useState([]);

  const [doctors, setDoctors ] = useState([]);
  const [doctor_Value, setDoctorValue] = useState([]);
  
  const [disable, setDisabel] = useState([true]);

  //registramos todos los inputs usando register

  const { register, handleSubmit} = useForm({
    mode: 'onTouched',
  })

  //peticion de todas las disciplinas

  useEffect(() => {
    const getDisciplines = async () => {
      try {
        const resp = await axios.get(`${VITE_BASE_URL}/disciplines`)
        const disciplines_values = Object.values(resp.data.data.disciplines) 
        console.log(disciplines_values);

        setDiscipline(disciplines_values)
      } catch (error) {
        console.log(error);
      }
    }
    getDisciplines();
  }, [])


  const handelSeletDiscipline = (event) => { 
    const discipline_value = event.target.value;
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/doctors/${disciplinesValue}`);
        const doctors_array = Object.values(response.data.data);
        //
        console.log(doctors_array);
        setDoctors(doctors_array[0]);
        
        console.log(doctors);
      } catch (error) {
        console.error(error);
      }
    };
    

    console.log(discipline_value);

    if (discipline_value) { 
      setDisabel(false)
      setDisciplineValue(discipline_value)
      fetchDoctors();
    } else {
      setDisciplineValue('')
      setDiscipline([])
      setDisabel(true)
    }
  }

  const handelSeletDoctor = (event) => { 
    const doctor_value = event.target.value
    setDoctorValue(doctor_value)
  }

  //Pasamos OnSubmit como parametro a HandleSubmit

  const OnSubmit = (data) => {

    //Todos los inputs del formulario
    console.log(data);

    
  }

  return <div className="flex flex-wrap flex-col gap-3 bg-white rounded-md mx-12 p-2 pt-5 md:p-4 h-fit">

    {/* Ejemplo de input responsive */}
    <h1 className='text-primary text-lg sm:text-xl pl-2 sm:pl-9'>Create Consultation</h1>

      <form onSubmit={handleSubmit(OnSubmit)}>   
      <div>
        <h2 className="ml-6 text-sm sm:text-base sm:ml-10 p-1 mr-20 bg-white absolute text-primary rounded-sm">Speciality</h2>
        <select className="input" value={disciplinesValue} {...register('disciplinesValue')}  onChange={handelSeletDiscipline}>
          {disciplines.map(discipline => ( 
            <option key={discipline.id} value={discipline.discipline_id}>{discipline.discipline_name}</option>
          ))}
        </select>
         <p className='text-red-500 text-sm sm:text-base pl-5'>Error Message</p>
      </div>
      <div>
        <h2 className="ml-6 text-sm sm:text-base sm:ml-10 p-1 mr-20 bg-white z-10 absolute text-primary rounded-sm">Doctor</h2>
        <select className="input" value={doctor_Value} {...register('doctor_Value')} disabled={disable} onChange={handelSeletDoctor} placeholder="Doctor...">
         {doctors.map(doctor => ( 
            <option key={doctor.id} value={doctor.doctor_registration_number}>Doctor: {doctor.first_name}</option>
          ))}
        </select>
         <p className='text-red-500 text-sm sm:text-base pl-5'>Error Message</p>
      </div>
      <div>
          <h2 className="ml-6 text-sm sm:text-base sm:ml-10 p-1 mr-20 bg-white absolute text-primary">Titel</h2>
          <input className="input"
            type="text"
            placeholder="titel..."
            {...register('titel')}
        />
        <p className='text-red-500 text-sm sm:text-base pl-5'>Error Message</p>
      </div>
      <div>
          <h2 className="ml-6 text-sm sm:text-base sm:ml-10 p-1 mr-20 bg-white absolute text-primary">Description</h2>
          <input className="input"
            type="text"
            placeholder="description..."
            {...register('description')}
        />
        <p className='text-red-500 text-sm sm:text-base pl-5'>Error Message</p>
      </div>
      <div>
          <h2 className="ml-6 text-sm sm:text-base sm:ml-10 p-1 mr-20 bg-white absolute text-primary">severity</h2>
          <input className="input"
            type="text"
            placeholder="severity..."
            {...register('severity')}
                />
        </div>
      <p className='text-red-500 text-sm sm:text-base pl-5'>Error Message</p>
      <div className='felx justify-center'>
        <label htmlFor='file' className='input bg-primary rounded-lg flex w-2/3 sm:w- h-fit p-2 active:bg-white'>
          <div className='flex felx-col flex-wrap justify-center gap-2 w-full text-white active:text-black'>
          <p className=' text-center w-full text-lg'>Upload File</p>
          <p className='text-xs '>png or jpg</p>
          </div>
      <input 
        className="hidden"
          type="file"
        id='file'
        {...register('file')}
        />
      </label>

      </div>
      <button className='bg-primary p-2 m-3 mt-5 w-11/12 rounded-md text-white active:bg-white active:text-black border-2 border-primary'>Submit</button>
    </form>

  </div>;
};

export default Consultation;
