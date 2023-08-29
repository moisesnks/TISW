# Proyecto: Agencia de Viajes

Un proyecto de Taller de Ingeniería de Software desarrollado durante el segundo semestre de 2023 por el curso bajo el mando del profesor Diego Hernández.

## Autores

- Líder Técnico: [@moisesnks](https://www.github.com/moisesnks)

## Descripción

Este proyecto de Agencia de Viajes es una aplicación web completa que permite a los usuarios explorar diferentes destinos turísticos y paquetes de viaje disponibles. Los usuarios pueden ver detalles de los destinos, paquetes turísticos, y también subir sus propias imágenes y modificar paquetes existentes. El proyecto se compone de un backend y un frontend que trabajan juntos para proporcionar una experiencia de usuario agradable.

## Funcionalidades Clave

- Explorar y ver destinos turísticos disponibles.
- Ver detalles de los paquetes turísticos, incluyendo nombre, destino, y precio.
- Subir imágenes para paquetes turísticos.
- Modificar paquetes turísticos existentes.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, PostgreSQL.
- **Frontend**: React, HTML, CSS.
- **Herramientas Adicionales**: Multer (para la carga de imágenes), Axios (para la comunicación entre frontend y backend).

## Referencia de la API

#### Obtener todos los paquetes turísticos

```http
  GET /api/paquetes
```

Esta ruta devuelve una lista de todos los paquetes turísticos disponibles.

#### Obtener detalles de un paquete turístico

```http
  GET /api/paquetes/${id}
```

Esta ruta devuelve los detalles de un paquete turístico específico basado en su ID.

#### Subir una imagen para un paquete turístico

```http
  POST /api/paquetes/${id}/image
```

Esta ruta permite subir una imagen para un paquete turístico específico.

#### Modificar un paquete turístico

```http
  PUT /api/paquetes/${id}
```

Esta ruta permite modificar los detalles de un paquete turístico existente.

## Demostración

Aquí nos hace falta un enlace a la DEMO.
## Instrucciones de Instalación

1. Clona este repositorio en tu máquina local.
2. Ve a la carpeta `backend` y ejecuta `npm install` para instalar las dependencias del backend.
3. Comúnicate con el `owner` para obtener una `DB_URL` para conectarte a la BD definiendo los valores correctos en `.env`.
4. Ejecuta `npm start` en la carpeta `backend` para iniciar el servidor backend.
5. Ve a la carpeta `frontend` y ejecuta `npm install` para instalar las dependencias del frontend.
6. Ejecuta `npm run dev` en la carpeta `frontend` para iniciar la aplicación frontend en tu navegador.

## Contribución

Si deseas contribuir a este proyecto, por favor crea un *pull request* con tus cambios. Estaré encantado de revisar y fusionar contribuciones útiles.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
