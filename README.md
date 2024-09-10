# Descripción del Proyecto

Este proyecto se centra en la creación de una API REST escalable para registrar y gestionar los casos de la Viruela del Mono en México. La API está diseñada para ser fácilmente mantenible y extensible, permitiendo la adición de nuevas funcionalidades sin cambios drásticos en la arquitectura. Los datos se almacenarán en MongoDB, aprovechando su flexibilidad y escalabilidad.

La solución se implementará utilizando Node.js con TypeScript, lo que asegura un tipado fuerte y minimiza los errores comunes. El proyecto incluirá una implementación completa de CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar los casos de la Viruela del Mono, así como funcionalidades adicionales.

## Requisitos del Proyecto

### Campos para Cada Caso de Viruela del Mono

- **lat**: Coordenada de latitud donde se detectó el caso.
- **lng**: Coordenada de longitud donde se detectó el caso.
- **isSent**: Booleano que indica si se envió un correo electrónico.
- **genre**: Género de la persona contagiada.
- **age**: Edad de la persona contagiada.
- **creationDate**: Fecha y hora en que se registró el caso (se almacenará automáticamente en MongoDB al crear un nuevo caso).

### Funcionalidades Requeridas

#### CRUD Completo para la Gestión de Casos

- **Crear un nuevo caso**: Endpoint para registrar un nuevo caso con la información mencionada.
- **Obtener todos los casos registrados**: Endpoint para recuperar todos los casos almacenados en la base de datos.
- **Obtener los casos registrados en la última semana**: Endpoint que filtre y devuelva los casos registrados durante los últimos 7 días, utilizando el campo `creationDate`.
- **Actualizar un caso**: Endpoint para actualizar los detalles de un caso existente.
- **Eliminar un caso**: Endpoint para eliminar un caso registrado.

#### Envío de Correos Electrónicos al Registrar un Nuevo Caso

- Utilizando Mapbox, la API debe enviar un correo electrónico que incluya una fotografía del mapa donde ocurrió el caso y la descripción de la persona enferma (género y edad) cuando se registre un nuevo caso.

#### Cron Job para el Envío de Correos Electrónicos

- Implementa un cron job que verifique cada 10 segundos si hay casos nuevos registrados y, en caso afirmativo, envíe un correo electrónico con los detalles del caso.

## Requisitos Técnicos

- **Contenedor Docker**: La aplicación debe estar contenida en un contenedor Docker. Proporciona un archivo `docker-compose.yml` para ejecutar la aplicación desde Docker.
- **GitHub Actions**: Configura un GitHub Action en el repositorio para construir la imagen Docker y subirla a Docker Hub automáticamente.
- **Commits**: Todos los commits en el repositorio deben ser legibles y tener mensajes coherentes.
- **Repositorio de GitHub**: Comparte el enlace del repositorio al finalizar.

## Evaluación

- **Funcionalidad de la API (50 puntos)**
  - Registro de casos (10 puntos)
  - Recuperación de todos los casos (10 puntos)
  - Recuperación de casos de la última semana (10 puntos)
  - Actualización de casos (10 puntos)
  - Eliminación de casos (10 puntos)

- **Configuración de Docker y Docker Compose (20 puntos)**
  - Dockerfile correctamente configurado (10 puntos)
  - Archivo `docker-compose.yml` correctamente configurado (10 puntos)

- **GitHub Actions (20 puntos)**
  - Configuración adecuada del workflow para construir y subir la imagen a Docker Hub (20 puntos)

- **Cron Job y Envío de Correos Electrónicos (10 puntos)**
  - Implementación correcta del cron job y su integración con el envío de correos electrónicos (10 puntos)
