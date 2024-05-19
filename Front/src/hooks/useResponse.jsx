import { useContext, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { useForm } from "react-hook-form";
import { VITE_BASE_URL } from "../config/env.js";
import axios from "axios";
import { toast } from "react-toastify";

export const useResponses = (consultation) => { 
  const [responses, setResponses] = useState([]);
    const { user, token } = useContext(UserTokenContext);
  
  
    const { register, handleSubmit, reset } = useForm()
  
    const OnSubmit = handleSubmit( async (data) => { 
  
  
      const resp = await axios.post(`${VITE_BASE_URL}/responses/${consultation.consultation_id}`, {
        content: `${data.content}`,
      }, {
        headers: {
         Authorization: `${token}`, 
        }
      })
  
      if (resp.data.status === "ok") {
        toast.success("Respuesat creada");
      } else { 
        toast.error("Error al crear respuesta");
      }
  
      fetchResponses();
      reset();
    })
    const fetchResponses = async () => { 
      
      try {
        ///responses/:consultation_id
      const resp = await axios.get(`${VITE_BASE_URL}/responses/${consultation.consultation_id}`,{
          headers: {
            Authorization: `${token}`,
          },
      });
  
      const responses_array = resp.data.data.responses
        setResponses(responses_array)
        
      } catch (error) {
        console.error(error);
      }

    }
    return {
    responses,
    user,
    register,
    OnSubmit,
    fetchResponses,
    }

}

