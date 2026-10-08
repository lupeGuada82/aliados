@echo off
docker run --rm ^
  --volume "%~dp0src\main\resources:/liquibase/resources" ^
  liquibase/liquibase:latest ^
  --defaultsFile=/liquibase/resources/db/liquibase/liquibase.properties ^
  --classpath=/liquibase/resources/db/liquibase/lib/postgresql-42.7.7.jar ^
  --url=jdbc:postgresql://host.docker.internal:5432/aliados ^
  --username=postgres ^
  --password=postgres ^
  update
