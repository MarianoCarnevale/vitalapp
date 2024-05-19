export const dateFormat = (dateGiven) => {
    const date = new Date(dateGiven);
  
    // Extraer el día, el mes y el año
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
  
    // Paso 3: Crear una lista con los nombres de los meses en español
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
  
    // Obtener el nombre del mes en español
    const monthName = months[monthIndex];
  
    // Formatear la fecha en el formato deseado
    const formattedDate = `${day} de ${monthName} del ${year}`;
  
    return formattedDate;
  };