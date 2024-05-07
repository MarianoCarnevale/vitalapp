import { useForm } from 'react-hook-form';

const Consultation = () => {

  //registramos todos los inputs usando register

  const { register, handleSubmit, formState } = useForm(

    //Validar con zod Schemas el cuerpo
    //---terminar tuto de ivan --6 --marz
  )
  //Manejo de errores

  const { errors } = formState

  console.log(errors);

  //Pasamos OnSubmit como parametro a HandleSubmit

  const OnSubmit = (data) => {

    //Todos los inputs del formulario
    console.log(data);

    
  }

  return <div className="  bg-white rounded-md mx-12 md:mx-72 justify-center text-center p-2 md:p-4 h-80">

    {/* Ejemplo de input responsive */}
    <h1>Consultation_form</h1>
    <div className="md:px-12 flex flex-col py-2 gap-20 h-full">

      {/* Esta funcion handleSubmit es propia del form-hook */}
      <form onSubmit={handleSubmit(OnSubmit)}>
          
        <h2 className="ml-6 sm:ml-10 p-1 mr-20 bg-white absolute">
          Title
        </h2>
        
        <input className="border-2 mt-5 mx-3 border-primary rounded-sm w-11/12 p-2 md:p-2"
          
          type="text"
          placeholder="Title"

          // pasamos el valor a register
          {...register('titel')}
          />        
    </form>
  </div>
  </div>;
};

export default Consultation;
