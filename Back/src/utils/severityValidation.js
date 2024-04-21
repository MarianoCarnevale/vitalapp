
// import { generateError } from "../../utils/errors/generateError.js";

export const severityValidation = async (severity) => {
  try {
    const value = severity.toLowerCase();
    //revisar que severity este dentro de los valores del enum
    if(value === 'high' || value === 'medium' || value === 'low'){
      return severity
    }else{
      // throw generateError(`incorrect parameter ${severity} use high medium or low`,400)
    }
  } catch (error) {
    next(error);
  }
}