// Importa los hooks y las librerías necesarias
import { useParams } from "react-router-dom"; // Hook de React Router para acceder a los parámetros de la ruta
import axios from "axios"; // Librería para hacer solicitudes HTTP
import { useEffect } from "react"; // Hook de React para efectos secundarios
import { toast, ToastContainer } from "react-toastify"; // Componentes para mostrar notificaciones
import "react-toastify/dist/ReactToastify.css"; // Estilos para las notificaciones
import { VITE_BASE_URL } from "../config/env.js"; // Importa la URL base del servidor desde las variables de entorno

// Componente para la página de validación
const ValidationPage = () => {
  // Obtiene el código de validación de los parámetros de la ruta
  const { validationCode } = useParams();

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
  }, [validationCode]); // Dependencia del efecto: se ejecuta cuando validationCode cambia

  // Renderiza el componente
  return (
    <div>
      <ToastContainer /> {/* Contenedor para las notificaciones */}
      <h1>Página de validación</h1>
      {/* Aquí puedes agregar más contenido a tu página de validación */}
    </div>
  );
};

// Exporta el componente
export default ValidationPage;
