# TeacherApp-frontend

## API

Estas son las interfaces de conexion entre el back y el front.

### Profesor

- Retorna listado de profesores:

      GET http://localhost:3000/api/profesores/ 

-  Retorna un profesor:

       GET http://localhost:3000/api/profesores/:id

- Actualiza la información de un profesor:

      PUT http://localhost:3000/api/profesores/:id
      Content-Type: application/json
      {
        "Nombre" : "Jose Garcia",
        "Materias" : ["Musica", "Mate"],
        "Experiencia" : "bachillerato",
        "Precio": 12,
        "Ubicacion": "coordenadas",
        "Sobre_mi": "soy profesor",
        "Foto": "url",
        "email": "jose.garcia@gmail.com",
        "Password": "12345"
      }
  
- Registro de profesor

      POST http://localhost:3000/api/profesores/ 
      Content-Type: application/json
      {
        "Nombre" : "Jose Garcia",
        "Materias" : ["Musica", "Mate"],
        "Experiencia" : "bachillerato",
        "Precio": 12,
        "Ubicacion": "coordenadas",
        "Sobre_mi": "soy profesor",
        "Foto": "url",
        "email": "jose.garcia@gmail.com",
        "Password": "12345"
      }

### Alumnos

- Retorna listado de alumnos:

      GET http://localhost:3000/api/alumnos/ 

-  Retorna un alumno:

       GET http://localhost:3000/api/alumnos/:id

- Actualiza la información de un alumno:

      PUT http://localhost:3000/api/alumnos/:id
      Content-Type: application/json
      {
        "Nombre" : "Mairi",
        "Ubicacion" : "coordenada",
        "Experiencia": "primaria", 
        "Username" : "mairi12",
        "Password" : "1234",
        "email" : "mairi.tikk@gmail.com"
      }
  
- Registro de alumno

      POST http://localhost:3000/api/alumnos/ 
      Content-Type: application/json
      {
        "Nombre" : "Mairi",
        "Ubicacion" : "coordenada",
        "Experiencia": "primaria", 
        "Username" : "mairi12",
        "Password" : "1234",
        "email" : "mairi.tikk@gmail.com"
      }
