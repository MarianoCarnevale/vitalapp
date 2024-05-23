import { useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export const Testimonials = () => {
  const [count, setCount] = useState(0);

  const dataTestimonials = [
    {
      content:
        "“¡A nuestro equipo le encanta usar VitalApp para sus consultasvirtuales fluidas! Ha revolucionado la forma en que nos conectamos con los pacientes.”",
      username: "Martín Castro",
      avatar: "/images/martinLinkedin.jpeg",
      company: "CEO of HealthConnectHub",
    },
    {
      content:
        "“VitalApp ha transformado la atención al paciente con suinterfaz fácil de usar. ¡Es un punto de inflexión en el campo médico!”",
      username: "Adrián Acuña",
      avatar: "/images/adriAcuñaLinkedin.jpeg",
      company: "CEO of VirtualWellnessCare",
    },
    {
      content:
        "“VitalApp es un salvavidas para nuestra ajetreada práctica.Agiliza las citas y mejora la comunicación con los pacientes. ¡Muy recomendable!”",
      username: "Mariano Carnevale",
      avatar: "/images/marianoLinkedin.webp",
      company: "CEO of HealthLinkMD",
    },
    {
      content:
        "“VitalApp ha mejorado nuestra eficiencia y satisfacción delpaciente. Es una herramienta imprescindible para cualquier proveedor de atención médica”",
      username: "Yogesh Samtani",
      avatar: "/images/yagoLinkedIn.webp",
      company: "CEO of MedConsultPro",
    },
    {
      content:
        "“El uso de VitalApp ha hecho que las consultas remotas sean muy sencillas. Nuestros pacientes la aprecian y a nuestro equipo le encanta la funcionalidad.”",
      username: "Adrián López",
      avatar: "/images/adriLinkedin.webp",
      company: "CEO of CareConnectOnline",
    },
  ];

  const handleBack = () => {
    setCount(count - 1);
  };

  const handleForward = () => {
    setCount(count + 1);
  };

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-12" src="/images/logo-vitalapp.svg" alt="" />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>{dataTestimonials[count]?.content}</p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src={dataTestimonials[count]?.avatar}
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">
                {dataTestimonials[count]?.username}
              </div>
              <svg
                viewBox="0 0 2 2"
                width="3"
                height="3"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              <div className="text-gray-600">
                {dataTestimonials[count]?.company}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="flex justify-around m-auto">
        <button
          onClick={handleBack}
          className="p-3 font-bold rounded-full bg-primary"
          disabled={count === 0}
        >
          <KeyboardArrowLeftRoundedIcon color="white" />
        </button>
        <button
          onClick={handleForward}
          className="p-3 font-bold rounded-full bg-primary"
          disabled={count === 4}
        >
          <KeyboardArrowRightRoundedIcon color="white" />
        </button>
      </div>
    </section>
  );
};
