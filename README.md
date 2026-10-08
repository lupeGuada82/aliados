# Aliados

## Requisitos

- Java 17 o superior
- Node.js 22 (o usar el Node provisto por Gradle)
- Docker Desktop, o bien PostgreSQL 16 instalado localmente
- Git

## 1. Clonar el proyecto

```powershell
git clone https://github.com/lupeGuada82/aliados.git
cd aliados
```

Si el repositorio es privado y GitHub pide credenciales, usar el usuario y token de GitHub.

## 2. Levantar PostgreSQL con Docker

Asegurarse de que Docker Desktop esté iniciado.

Desde la carpeta raíz del proyecto ejecutar:

```powershell
docker compose up -d
```

Verificar que el contenedor esté corriendo:

```powershell
docker ps
```

Debería aparecer algo como:

```text
aliados-postgres
```

Datos de conexión locales:

```text
Base de datos: aliados
Usuario: postgres
Contraseña: postgres
Host: localhost
Puerto: 5432
```

### Alternativa: PostgreSQL instalado localmente

Otra persona puede crear la misma base sin Docker instalando PostgreSQL nativamente.

1. Instalar PostgreSQL 16.
2. Crear la base de datos:

```sql
CREATE DATABASE aliados;
```

3. Configurar el usuario/contrasena.

La aplicación se conecta a `localhost:5432`, ya sea que PostgreSQL corra en Docker o de forma nativa.

Si Docker y PostgreSQL nativo se ejecutan al mismo tiempo, los dos pueden pelear por el puerto `5432`. Para evitarlo hay dos opciones:

- Detener el contenedor:

```powershell
docker compose down
```

- O mapear Docker a otro puerto, por ejemplo `5433`, y usar:

```text
jdbc:postgresql://localhost:5433/aliados
```

## 3. Ejecutar el backend

El backend está en Spring Boot.

### Backend desde Eclipse

1. Abrir Eclipse.
2. Ir a `File > Import > Existing Gradle Project`.
3. Seleccionar la carpeta `aliados`.
4. Elegir `Use Gradle wrapper` si aparece.
5. Abrir:

```text
src/main/java/com/demo/aliados/AliadosApplication.java
```

6. Clic derecho sobre el archivo.
7. Ejecutar con `Run As > Spring Boot App` si tenés Spring Tools instalado.

Si no aparece esa opción:

1. Clic derecho en `AliadosApplication.java`.
2. `Run As > Java Application`.

Para usar PostgreSQL desde Eclipse, en la configuración de ejecución agregar en **Arguments**:

```text
--spring.profiles.active=dev
```

Para usar H2:

```text
--spring.profiles.active=mem
```

### Backend desde consola

Con PostgreSQL:

```powershell
.\gradlew.bat bootRun --args="--spring.profiles.active=dev"
```

Con H2 en memoria:

```powershell
.\gradlew.bat bootRun --args="--spring.profiles.active=mem"
```

Por defecto la aplicación usa la configuración de `application.yml`, orientada a producción y a PostgreSQL.

## 4. Ejecutar el frontend

El frontend está en Angular y puede trabajarse desde VS Code o el IDE que prefieras.

Abrir otra terminal:

```powershell
cd frontend
npm install
npm run start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

Presupuestos:

```text
http://localhost:4200/presupuestos
```

## 5. Comandos útiles de Docker

Ver logs:

```powershell
docker logs -f aliados-postgres
```

Detener la base de datos:

```powershell
docker compose down
```

Volver a levantar:

```powershell
docker compose up -d
```

Eliminar también los datos de la base y empezar de cero:

```powershell
docker compose down -v
docker compose up -d
```

## 6. Perfiles disponibles

### `application.yml`
Configuración principal/producción.

### `application-dev.yml`
Configuración local para desarrollo con PostgreSQL.

### `application-mem.yaml`
Configuración H2 para pruebas rápidas o desarrollo sin PostgreSQL.

## 7. Decisiones de infraestructura

- Usamos **Docker Compose** para levantar PostgreSQL de forma reproducible.
- El archivo `docker-compose.yml` normalmente solo define PostgreSQL; el backend y frontend se ejecutan por separado.
- En Docker Desktop, la fila del proyecto `aliados` no es otro PostgreSQL; es el grupo de Compose. El proceso real es el contenedor `aliados-postgres`.
- `docker-compose.yml` es necesario si queremos que cualquier persona pueda crear la misma base de datos sin configurarla manualmente.

### Liquibase

- Los esquemas de la base se manejan con Liquibase.
- Si el backend ya crea las tablas automáticamente con Hibernate, no duplicar el esquema con Liquibase.
- Para desarrollo, generalmente conviene `ddl-auto: update` o `validate`, junto a Liquibase según la estrategia elegida.
- Para producción, preferir `ddl-auto: validate` y crear/actualizar el esquema exclusivamente con Liquibase.
- Los comandos para aplicar las migraciones dependen del plugin de Gradle configurado. Si el proyecto adoptó el plugin, el comando será similar a:

```powershell
.\gradlew.bat update
```

- Los datos de prueba deben separarse del esquema principal donde sea posible.

### H2 y PostgreSQL

- PostgreSQL es la base principal de desarrollo local, controlada por `application-dev.yml`.
- H2 queda como alternativa rápida y liviana, controlada por `application-mem.yaml`.
- No confundir los datos: en H2 se pierden al reiniciar; en PostgreSQL persisten en el volumen Docker.
