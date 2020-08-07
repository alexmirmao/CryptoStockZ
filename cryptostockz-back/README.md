# cryptostockz-back


## CONEXION BASE DE DATOS


Instalar servidor postgresql 12

### BASE DE DATOS
Crear una base de datos con nombre -> "cryptostockz"

### USUARIO
Crear un usuario -> "root"
Darle una contraseña -> "password"
Darle permisos -> ALL


Ejemplo:
``` sql
CREATE DATABASE cryptostockz
    WITH 
    OWNER = root
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE cryptostockz TO sergio;
```

### CONFIGURACIÓN POSTGRESQL

En el archivo `posgresql.conf`

``` bash
sudo nano /etc/postgresql/12/main/postgresql.conf 
```

Asegurarnos que el puerto es `5434` y que escucha en `localhost`


### CONFIGURACIÓN DEL ARCHIVO .ENV
Podemos establecer otros parámetros en el archivo `.env`

Hay un apartado donde podemos dejar configurado el .env

```
# sequelize orm
DB_DATABASE="DB_DATABASE"
DB_USERNAME="cryptostockz"
DB_PASSWORD="DB_PASSWORD"
DB_HOST="localhost"
DB_PORT="5434"
```