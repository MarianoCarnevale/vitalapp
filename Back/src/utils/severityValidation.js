
// import { generateError } from "../../utils/errors/generateError.js";

export const severityValidation = async (severity) => {
  try {
    const value = severity.toLowerCase();
    //revisar que severity este dentro de los valores del enum
    if(value === 'ALTA' || value === 'MEDIA' || value === 'BAJA'){
      return severity
    }
  } catch (error) {
    next(error);
  }
}