# Trabajo Práctico Clase 2 – Firebase SQL Connect

**Materia:** Programación Avanzada – 2026  
**Carrera:** Licenciatura en Sistemas de Información  
**Tema:** Modelo relacional, autorización y seguridad de APIs

## Descripción

Aplicación web de catálogo de cursos desarrollada con Next.js 16, Firebase Authentication, Firebase SQL Connect y PostgreSQL.

Permite consultar cursos, registrar usuarios, inscribirse, visualizar inscripciones y darse de baja.

## Aplicación publicada

https://tp-firebase-clase2.web.app

## Funcionalidades implementadas

- **L1 – Matricula:** relación muchos a muchos entre alumnos y cursos, con clave primaria compuesta y fecha generada por el servidor.
- **L2 – Inscribirme:** inscripción idempotente mediante `upsert`, utilizando `auth.uid`.
- **L3 – MisInscripciones:** consulta exclusiva de las inscripciones del usuario autenticado.
- **L4 – ListAlumnos:** protección de información personal mediante `@auth(level: NO_ACCESS)`.
- **L5 – DarmeDeBaja:** eliminación de inscripciones propias.
- **L6 – CSP:** política de seguridad con orígenes específicos y hashes SHA-256 para scripts inline.
- **L7 – Producción:** SQL Connect y Firebase Hosting desplegados correctamente.

## Tecnologías utilizadas

- Next.js 16 y TypeScript
- Firebase Authentication
- Firebase SQL Connect
- PostgreSQL mediante Cloud SQL
- Firebase Hosting
- Git y GitHub

## Estructura del proyecto

| Carpeta o archivo | Descripción |
|---|---|
| `app/` | Páginas y componentes de la aplicación |
| `dataconnect/schema/schema.gql` | Modelo relacional |
| `dataconnect/cursos/` | Consultas y mutaciones |
| `lib/sqlconnect.ts` | Acceso a SQL Connect |
| `scripts/atacar.mjs` | Auditoría de seguridad |
| `scripts/check-headers.mjs` | Verificación de encabezados HTTP |
| `scripts/csp-hashes.mjs` | Generación de hashes CSP |
| `REFLEXION.md` | Respuestas de reflexión y descripción de la auditoría |

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar los emuladores:

```bash
npm run emulators
```

En otra terminal, cargar los datos:

```bash
npm run seed
```

Iniciar la aplicación:

```bash
npm run dev
```

Abrir http://localhost:3000/cursos.

## Pruebas

Auditoría de seguridad:

```bash
npm run atacar
```

Verificación de TypeScript:

```bash
npm run typecheck
```

Compilación:

```bash
npm run build
```

Verificación de encabezados en producción:

```bash
node scripts/check-headers.mjs https://tp-firebase-clase2.web.app
```

Las auditorías realizadas después de corregir las reglas de autorización finalizaron satisfactoriamente.

## Seguridad

La aplicación utiliza Firebase Authentication para identificar usuarios y SQL Connect para autorizar operaciones mediante `PUBLIC`, `USER` y `NO_ACCESS`.

Las operaciones sobre matrículas utilizan `auth.uid` para evitar que un usuario pueda actuar en nombre de otro.

La configuración CSP restringe los orígenes de conexión y evita utilizar comodines amplios.

## Enlaces

**Repositorio:** https://github.com/bran7-git/TP-PROG-AVANZADA-firebase-clase2

**Aplicación:** https://tp-firebase-clase2.web.app

**Reflexión:** [REFLEXION.md](REFLEXION.md)
