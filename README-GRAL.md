# vitalApp

## Descripción de la aplicación

vitalApp es una aplicación web creada para generar un sistema de consultas médicas, donde un paciente puede generar consultas a doctores o especialdades, y los doctores responder a estas consultas, y poder comunicarse a través de estas con los pacientes que realizan esa consulta.

### Instalación de la aplicación

Para un correcto funcionamiento de la aplicación, una vez descargados los archivos, y siempre que tengamos en nuestra computadora Node.js, debemos abrir la terminal y aplicar los siguientes comandos, iniciando siempre desde la carpeta raíz, en este caso VITALAPP:

-cd back
-npm i

Antes de irnos de la carpeta Back, creamos manualmente un archivo llamado .env, copiando las variables del archivo .env.example y rellenándolos con nuestro propio contexto local.

Por último y antes de seguir adelante con la instalación, aplicamos el siguiente comando desde la carpeta back, en nuestra terminal:

-npm run initDb

Siguiendo con ello, una vez se han descargado los paquetes necesarios para Backend, volvemos a la carpeta raíz(VITALAPP):

-cd ..

Entramos a la carpeta Front desde la terminal e instalamos una última vez:

-cd front
-npm i

Hecho esto, aplicamos el siguiente comando para iniciar la aplicación:

-npm run dev

Si todo ha ido bien, en nuestra terminal tendremos un enlace, en el que haciendo Ctrl+Click, se nos abrirá en nuestro navegador predeterminado la aplicación.

### Backend

Para la implementación del Backend para nuestra aplicación, utilizamos Node.js a través de su librería Express y una serie de dependencias extras para su funcionamiento. Una vez el server está completamente equipado, procedemos a crear una serie de controladores y middlewares que pueden encontrar en el README del directorio Back.

### Frontend

En la implementación del Frontend para nuestra aplicación, utilizamos React+Vite para generar una serie de componentes que conformarán en su composición la interfaz de la misma. Una vez creados los formularios, procedemos a darle estilos mediante Tailwind. Los diversos formularios, componentes, así como la configuración de Tailwind utilizados pueden encontrarlos descritos en el README del directorio Front.