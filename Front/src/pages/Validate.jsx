// Importa los hooks y las librerías necesarias
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BASE_URL } from "../config/env.js";
import { useState } from "react";
import { Navigate } from "react-router-dom";
// Componente para la página de validación
const ValidationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // Obtiene el código de validación de los parámetros de la ruta
  const { validationCode } = useParams();

  const onboardingSteps = [
    {
      title: "Bienvenido a VitalApp",
      image: "/images/onboarding-1.svg",
      text: "Descubre médicos disponibles para atender tus necesidades de salud.",
    },
    {
      title: "Gestiona tus consultas",
      image: "/images/onboarding-2.svg",
      text: "Los pacientes pueden ver detalles y respuestas de consultas, gestionar su perfil, crear nuevas consultas, revisar historial y controlar consultas, eliminando o evaluando respuestas para mejorar el servicio.",
    },
    {
      title: "Administra tu información",
      image: "/images/onboarding-2.svg",
      text: "Administra consultas asignadas, actualiza perfil médico y gestiona historial. Responde consultas especializadas, controla respuestas no valoradas y mejora mediante evaluaciones de calidad para mantener alta valoración del perfil.",
    },
  ];

  // Cuando el componente se monta o el código de validación cambia, valida el usuario
  useEffect(() => {
    const validateUser = async () => {
      try {
        // Intenta validar el usuario
        await axios.put(`${VITE_BASE_URL}/users/validate/${validationCode}`);
        // Si la validación es exitosa, muestra una notificación de éxito
        toast.success("Usuario validado correctamente");
      } catch (error) {
        // Si la validación falla, muestra una notificación de error
        toast.error(error.response.data.message);
      }
    };

    // Llama a la función para validar el usuario
    validateUser();
  }, [validationCode]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSkip = () => {
    setCurrentStep(onboardingSteps.length);
  };

  if (currentStep < onboardingSteps.length) {
    const step = onboardingSteps[currentStep];
    // Renderiza el componente
    return (
      <>
        <ToastContainer />
        <div
          key={currentStep}
          className="w-5/6 m-auto shadow-lg rounded-xl p-4 max-w-lg items-center bg-white flex flex-col gap-8 py-16 px-10 animate-fadein "
        >
          <h2 className="text-primary font-bold text-center text-3xl">
            {step.title}
          </h2>
          <img
            className="max-h-48"
            src={step.image}
            alt={`Imagen ${currentStep + 1}`}
          />
          <p className="text-md w-5/6 text-center">{step.text}</p>
          <div className="flex justify-center space-x-2 mb-4">
            {onboardingSteps.map((step, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full cursor-pointer ${
                  index === currentStep ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <div className="flex gap-5 w-full">
            <button
              onClick={handleNext}
              className="border p-2 bg-primary rounded-md text-white font-semibold flex-grow"
            >
              Next
            </button>
            <button
              onClick={handleSkip}
              className="border p-2 bg-primary rounded-md text-white font-semibold flex-grow"
            >
              Skip
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

// Exporta el componente
export default ValidationPage;
