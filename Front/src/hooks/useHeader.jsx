import { useContext, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import UseOutsideClick from "./useOutsideClick.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BASE_URL } from "../config/env.js";

export const useHeader = () => {
  const { token, setToken } = useContext(UserTokenContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  UseOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleImageClick = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleAvatar = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = useCallback(async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/users/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Imagen subida correctamente");
        setTimeout(() => {
          setIsModalOpen(false);
          navigate(window.location.pathname);
        }, 1000);
      } else {
        toast.error("Error al subir la imagen");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [selectedFile, token, navigate]);

  return {
    dropdownOpen,
    dropdownRef,
    isModalOpen,
    selectedFile,
    handleImageClick,
    handleLogout,
    handleAvatar,
    handleFileChange,
    handleUpload,
  };
};
