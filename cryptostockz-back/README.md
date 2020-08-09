# CryptoStockZ - BACKEND NODE + EXPRESS

## TABLA DE CONTENIDO
<!--ts-->
   * [Ejecución](#ejecución)
      * [Desarrollo](#desarrollo)
      * [Producción](#producción)
   * [Conexion con la base de datos](#conexion-con-la-base-de-datos)
      * [Base de datos](#base-de-datos)
      * [Usuario](#usuario)
      * [Configruación postgresql](#configuración-postgresql)
      * [Entornos](#entornos)
   * [Cookies y Tokens](#cookies-y-tokens)
      * [Token](#token)
      * [Cookie](#cookie)
<!--te-->

## EJECUCIÓN
### DESARROLLO

``` bash
npm start
```

### PRODUCCIÓN

``` bash
NODE_ENV='production' npm start
```

## CONEXION BASE DE DATOS

Instalar servidor postgresql 12 (googlear)

### BASE DE DATOS
Crear una base de datos con nombre -> "cryptostockz"

### USUARIO
Crear un usuario -> "cryptostockz"
Darle una contraseña -> "cryptostockz"
Darle permisos -> ALL


Ejemplo:
``` sql
CREATE DATABASE cryptostockz
    WITH 
    OWNER = cryptostockz
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE cryptostockz TO cryptostockz;
```

### CONFIGURACIÓN POSTGRESQL

En el archivo `posgresql.conf`

``` bash
sudo nano /etc/postgresql/12/main/postgresql.conf 
```

Asegurarnos que el puerto es `5434` y que escucha en `localhost`


### ENTORNOS 
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


## COOKIES Y TOKENS

Para dar seguridad al sistema he incluido en el servidor la gestión de sesiones mediante cookie y una gestión de roles mediante token.

Cuando un usuario se logea se le dá automáticamente una cookie y un token. 

### TOKEN
Con el token comprobamos el rol que tiene el usuario, nunca podrá hacer peticiones al sisitema que no sean publicas sin uno de estos.

Habrá peticiones "seguras" como la creación de producto que únicamente las podrán generar aquellas cuentas de manufacturers.

En esta ocasión es indiferente el usuario en sí que las genere. Las cuentas de manufacturer siempre pueden generar productos asociados a su cuenta.

### COOKIE
Habrá transacciones que a diferencia de las anteriores "seguras" implican que sólo puedan ser realizadas por un usuario. Por ejemplo la transacción de la propiedad de un artículo.

Para ello tendremos que comprobar siempre que el owner es el mismo que el que se encuentra en la cookie.

Ej:
``` js
const { session } = require("../middleware")

let user_id = session.getUserId(req, res) //Devuelve el user_id logeado
```

Metiendo este trozo de código en las transacciones "no seguras" podremos comprobar que el ejecutor es el correcto. (Ej: Propietario del producto es user_id)

