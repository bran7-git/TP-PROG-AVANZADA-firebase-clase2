# REFLEXIÓN – Trabajo Práctico Clase 2

**Materia:** Programación Avanzada  
**Tema:** Firebase SQL Connect – Modelo relacional y autorización  
**Proyecto:** Catálogo de Cursos

## 1. ¿Por qué ninguna operación recibe el ID del alumno como variable? ¿Qué es IDOR y cómo lo evita auth.uid?

Las operaciones no reciben el ID del alumno porque ese dato podría ser manipulado desde el navegador para acceder a información de otro usuario.

IDOR (Insecure Direct Object Reference) es una vulnerabilidad que ocurre cuando una aplicación permite acceder o modificar recursos de otros usuarios mediante identificadores que no se validan correctamente.

Para evitarlo, utilizamos `auth.uid`, que obtiene la identidad del usuario autenticado directamente desde Firebase Authentication. De esta manera, cada alumno solamente puede consultar, crear o eliminar sus propias inscripciones.

## 2. ¿Por qué ListCursos es PUBLIC y ListAlumnos es NO_ACCESS? ¿Cómo funcionaría el panel de administración?

`ListCursos` utiliza `PUBLIC` porque el catálogo de cursos debe poder consultarse sin iniciar sesión.

En cambio, `ListAlumnos` utiliza `NO_ACCESS` porque contiene información personal que no debe estar disponible públicamente ni para cualquier usuario autenticado.

Para implementar un panel de administración, utilizaría un backend seguro que verifique permisos de administrador mediante roles o claims personalizados antes de consultar los datos. No habilitaría `ListAlumnos` directamente para todos los usuarios.

## 3. ¿Qué ventaja tiene una clave primaria compuesta en Matricula frente a validar duplicados en el cliente?

La tabla `Matricula` utiliza una clave primaria compuesta por `alumno` y `curso`.

Esto garantiza desde la base de datos que un mismo alumno no pueda inscribirse dos veces en el mismo curso.

Es más seguro que validar duplicados solamente desde el cliente, porque las validaciones del navegador pueden omitirse y dos solicitudes simultáneas podrían intentar crear la misma inscripción.

Además, utilizamos `upsert` en lugar de `insert` para que repetir una inscripción no produzca duplicados ni errores por una clave existente.

## 4. ¿Por qué la configuración pública de Firebase no compromete la base de datos? ¿Qué aporta App Check?

La configuración de Firebase, incluyendo `apiKey` y `projectId`, permite identificar el proyecto y conectarse con sus servicios, pero no otorga automáticamente permisos para consultar o modificar información protegida.

La seguridad depende de Firebase Authentication y de las reglas de autorización `@auth` definidas en las operaciones de SQL Connect.

Como protección adicional, Firebase App Check permite verificar que las solicitudes provengan de una aplicación legítima, dificultando el abuso mediante scripts o clientes no autorizados. App Check complementa la autenticación y autorización, pero no las reemplaza.

## 5. ¿Qué ventajas y desventajas tiene SQL Connect frente a una API REST propia con Express y PostgreSQL?

SQL Connect permite trabajar con PostgreSQL sin desarrollar y mantener un servidor Express propio.

Las operaciones se definen previamente mediante archivos `.gql`, se ejecutan desde Firebase y permiten declarar autorización con `@auth`.

Esto reduce el código necesario para implementar consultas, mutaciones y controles de acceso.

Como desventaja, ofrece menos flexibilidad que una API REST propia para implementar lógica de negocio compleja, integraciones especiales o comportamientos personalizados del servidor. También genera mayor dependencia de los servicios de Firebase.

## 6. ¿Por qué no alcanzó con la CSP de la clase 1 y por qué conviene listar dominios exactos en connect-src?

La CSP de la clase 1 permitía conexiones principalmente al mismo origen mediante `connect-src 'self'`.

En esta práctica incorporamos Firebase Authentication y SQL Connect, que necesitan comunicarse con servicios externos de Google.

Por eso agregamos los orígenes necesarios:

- `https://identitytoolkit.googleapis.com`
- `https://securetoken.googleapis.com`
- `https://firebasedataconnect.googleapis.com`

Es preferible declarar dominios exactos en lugar de utilizar comodines como `https://*.googleapis.com`, porque así limitamos las conexiones permitidas y reducimos la superficie de ataque.

## Evidencias de auditoría de seguridad

**Antes de la corrección:** La operación `ListAlumnos` tenía acceso `PUBLIC`, lo que permitía consultar información personal sin autenticación. Se identificó como una vulnerabilidad de exposición de datos.

**Corrección aplicada:** Se modificó la operación para utilizar `@auth(level: NO_ACCESS)`.

**Después de la corrección:** Se ejecutó `npm run atacar` y la auditoría terminó con el mensaje:

`Todos los controles pasaron.`

Las pruebas incluyen acceso al catálogo público, protección de datos personales, rechazo de inscripciones anónimas, idempotencia y aislamiento de operaciones entre usuarios.

**Nota sobre evidencias:** La descripción anterior resume las pruebas realizadas. Las salidas originales de terminal o capturas del antes y después deben adjuntarse para cumplir completamente el entregable solicitado.

## Enlaces del proyecto

**Repositorio GitHub:**  
https://github.com/bran7-git/TP-PROG-AVANZADA-firebase-clase2

**Aplicación publicada:**  
https://tp-firebase-clase2.web.app

**Catálogo de cursos:**  
https://tp-firebase-clase2.web.app/cursos

**Mis inscripciones:**  
https://tp-firebase-clase2.web.app/mis-inscripciones
