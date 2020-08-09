# cryptostockz-back


## EJECUTAR EN MODO PRODUCCIÓN

``` bash
NODE_ENV='production' npm star
```

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


### CONFIGURACIÓN
Podemos establecer otros parámetros en el archivo `config.js`

``` js
    development: {
        username: "cryptostockz", // your sql username
        password: "cryptostockz", // your sql password (may be null)
        database: "cryptostockz", // db name
        host: "127.0.0.1", // local host
        port: "5434",
        dialect: "postgres"
        },
    production: {
        username: "UNDEFINED", // your sql username
        password: "UNDEFINED", // your sql password (may be null)
        database: "UNDEFINED", // db name
        host: "127.0.0.1", // local host
        port: "5434", // local host
        dialect: "postgres"
        }
```



