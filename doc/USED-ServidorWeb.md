# Guía de Instalación y Configuración: Ubuntu Server (MDC-USED)
*(Servidor de desarrollo para aplicaciones web basadas en el uso de PHP)*

---

## Índice de Contenidos

- [Guía de Instalación y Configuración: Ubuntu Server (MDC-USED)](#guía-de-instalación-y-configuración-ubuntu-server-mdc-used)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Configuración Inicial](#1-configuración-inicial)
    - [1.1. Preparación e Instalación del SO](#11-preparación-e-instalación-del-so)
    - [1.2. Configuración de Red y Cambio de Nombre](#12-configuración-de-red-y-cambio-de-nombre)
    - [1.3. Actualización, Fecha y Antivirus](#13-actualización-fecha-y-antivirus)
    - [1.4. Comprobación del Sistema](#14-comprobación-del-sistema)
  - [2. Cuentas de Administración](#2-cuentas-de-administración)
    - [2.1. Cuentas Administradoras (`miadmin`, `miadmin2`)](#21-cuentas-administradoras-miadmin-miadmin2)
  - [3. SSH (OpenSSH)](#3-ssh-openssh)
    - [3.1. Comprobación del Servicio](#31-comprobación-del-servicio)
    - [3.2. Conexión desde el Cliente](#32-conexión-desde-el-cliente)
  - [4. UFW (Cortafuegos)](#4-ufw-cortafuegos)
    - [4.1. Activación y Regla de SSH](#41-activación-y-regla-de-ssh)
    - [4.2. Puertos de Escucha de los Servicios](#42-puertos-de-escucha-de-los-servicios)
    - [4.3. Comprobaciones](#43-comprobaciones)
  - [5. Apache2 (Servidor Web)](#5-apache2-servidor-web)
    - [5.1. Instalación y Configuración Básica](#51-instalación-y-configuración-básica)
    - [5.2. Redirección ErrorLog y ErrorDocument (404)](#52-redirección-errorlog-y-errordocument-404)
    - [5.3. Habilitar .htaccess (AllowOverride)](#53-habilitar-htaccess-allowoverride)
    - [5.4. Configuración HTTPS (Certificado SSL MDC)](#54-configuración-https-certificado-ssl-mdc)
    - [5.5. Redirección de HTTP a HTTPS](#55-redirección-de-http-a-https)
  - [6. Cuenta de Desarrollo (Operador Web)](#6-cuenta-de-desarrollo-operador-web)
    - [6.1. Creación del Usuario y Permisos Web](#61-creación-del-usuario-y-permisos-web)
  - [7. Ejecución PHP con PHP-FPM](#7-ejecución-php-con-php-fpm)
    - [7.1. Instalación de PHP-FPM](#71-instalación-de-php-fpm)
    - [7.2. Integración de PHP-FPM con Apache2](#72-integración-de-php-fpm-con-apache2)
    - [7.3. Configuración de php.ini para Desarrollo](#73-configuración-de-phpini-para-desarrollo)
    - [7.4. Módulo Xdebug](#74-módulo-xdebug)
      - [7.4.1. Instalación de Xdebug](#741-instalación-de-xdebug)
      - [7.4.2. Configuración del módulo (xdebug.ini)](#742-configuración-del-módulo-xdebugini)
      - [7.4.3. Activación en PHP-FPM y reinicio de servicios](#743-activación-en-php-fpm-y-reinicio-de-servicios)
      - [7.4.4. Comprobación](#744-comprobación)
      - [7.4.5. Cortafuegos y log de Xdebug](#745-cortafuegos-y-log-de-xdebug)
  - [8. MariaDB (Servidor de Base de Datos)](#8-mariadb-servidor-de-base-de-datos)
    - [8.1. Instalación y Acceso Remoto](#81-instalación-y-acceso-remoto)
    - [8.2. Creación de Usuario Administrador](#82-creación-de-usuario-administrador)
    - [8.3. Asistente de Seguridad](#83-asistente-de-seguridad)
  - [9. phpMyAdmin](#9-phpmyadmin)
  - [10. Sitios Virtuales y DirectoryIndex](#10-sitios-virtuales-y-directoryindex)
  - [11. SFTP (Usuarios Enjaulados)](#11-sftp-usuarios-enjaulados)
  - [12. Herramientas de Desarrollo (phpDocumentor)](#12-herramientas-de-desarrollo-phpdocumentor)

---

## 1. Configuración Inicial

### 1.1. Preparación e Instalación del SO

*   **Nombre de la máquina:** `MDC-USED`
*   **RAM:** `2048 MB` (2 GB)
*   **Particiones:** `150GB` (`/`), `350GB` (`/var`) y `4GB` de `swap`.

Para verificar tu sistema operativo, versión y particiones:

    uname -a
    lsb_release -a
    lsblk
    df -h
    lsblk -fm
    lsblk -a
    fdisk -l

### 1.2. Configuración de Red y Cambio de Nombre

Asegúrate de que el nombre del host sea correcto:

    sudo hostnamectl set-hostname MDC-USED
    sudo nano /etc/hosts

Para configurar la red estática editamos Netplan:

    cd /etc/netplan
    ls
    sudo cp 00-installer-config.yaml 00-installer-config.yaml.backup
    sudo nano 00-installer-config.yaml

**Opción A: Parámetros de Red en CLASE (IES Los Sauces)**:

    network:
      ethernets:
        enp0s3:
          addresses:
           - 10.199.9.184/22
          nameservers:
             addresses:
             - 10.151.123.21
             - 10.151.126.21
             search: [educa.jcyl.es]
          routes:
              - to: default
                via: 10.199.8.1
      version: 2

**Opción B: Parámetros de Red en CASA**:

    network:
      ethernets:
        enp0s3:
          addresses:
           - 192.168.1.100/24
          nameservers:
             addresses:
             - 8.8.8.8
             - 8.8.4.4
          routes:
              - to: default
                via: 192.168.1.1
      version: 2

Aplica los cambios de la red elegida:

    sudo netplan apply

Para comprobar la red y DNS:

    ip a
    ip r
    resolvectl status

### 1.3. Actualización, Fecha y Antivirus

Actualización del sistema y configuración de zona horaria:

    sudo apt update && sudo apt upgrade -y
    date
    sudo timedatectl set-timezone Europe/Madrid

Instalar y actualizar Antivirus ClamAV:

    sudo apt install clamav clamav-daemon -y
    sudo systemctl stop clamav-freshclam
    sudo freshclam
    sudo systemctl start clamav-freshclam
    sudo systemctl enable clamav-freshclam

### 1.4. Comprobación del Sistema

Desde el terminal (CMD) de tu máquina anfitriona, comprueba que el servidor responde:

    ping 10.199.9.184

*La conexión remota por SSH se explica en el apartado [3. SSH (OpenSSH)](#3-ssh-openssh).*

---

## 2. Cuentas de Administración

### 2.1. Cuentas Administradoras (`miadmin`, `miadmin2`)

Crear `miadmin2` y añadirlo a varios grupos administrativos:

    sudo useradd -m -G sudo,adm,cdrom,dip,plugdev,lxd -s /bin/bash miadmin2
    sudo passwd miadmin2

Comprobar pertenencia a grupos:

    cat /etc/group | grep miadmin
    cat /etc/passwd | grep miadmin

---

## 3. SSH (OpenSSH)

### 3.1. Comprobación del Servicio

Comprobamos que el servidor SSH está activo:

    sudo systemctl status ssh

*La regla del cortafuegos para el puerto `22` se añade en el apartado [4.1](#41-activación-y-regla-de-ssh).*

### 3.2. Conexión desde el Cliente

Desde el terminal (CMD) o MobaXterm de tu máquina anfitriona:

    ssh miadmin@10.199.9.184

---

## 4. UFW (Cortafuegos)

### 4.1. Activación y Regla de SSH

Permitimos primero el puerto de SSH y después habilitamos el cortafuegos (en este orden, para no perder la conexión si estamos trabajando por SSH):

    sudo ufw allow 22
    sudo ufw enable

El resto de reglas se añaden al instalar cada servicio (Apache2 en el apartado 5, MariaDB en el apartado 8). En la tabla del apartado 4.2 aparece el resumen completo.

### 4.2. Puertos de Escucha de los Servicios

Resumen de todos los puertos que utilizan los servicios instalados en `MDC-USED`:

| Servicio | Puerto | Protocolo | Sentido | Regla UFW | Observaciones |
|---|---|---|---|---|---|
| SSH (OpenSSH) | `22` | TCP | Entrada | `sudo ufw allow 22` | Administración remota (`miadmin`) desde CMD o MobaXterm. |
| SFTP | `22` | TCP | Entrada | (la misma de SSH) | Va sobre SSH. Lo usan NetBeans, VS Code y MobaXterm con `operadorweb`. |
| Apache2 HTTP | `80` | TCP | Entrada | `sudo ufw allow 80` | Redirige a HTTPS mediante el `.htaccess` (apartado 5.5). |
| Apache2 HTTPS | `443` | TCP | Entrada | `sudo ufw allow 443` | Sitio seguro `default-ssl.conf` con certificado autofirmado. |
| phpMyAdmin | `80` / `443` | TCP | Entrada | (las de Apache) | No tiene puerto propio, se sirve desde Apache en `/phpmyadmin`. |
| MariaDB | `3306` | TCP | Entrada | `sudo ufw allow 3306` | Escucha en todas las interfaces (`bind-address = 0.0.0.0`). |
| PHP-FPM 8.5 | — | Socket Unix | Local | No necesaria | No usa puerto TCP: Apache le pasa las peticiones por `/run/php/php8.5-fpm.sock`. |
| Xdebug 3 | `9003` | TCP | **Salida** (servidor → cliente) | No necesaria | El que escucha es **NetBeans en el cliente**. Se abre en el Firewall de Windows. |
| ClamAV (clamd) | — | Socket Unix | Local | No necesaria | Socket `/var/run/clamav/clamd.ctl`. |
| ClamAV (freshclam) | `443` | TCP | Salida | No necesaria | Descarga de firmas de virus desde Internet. |
| DNS (systemd-resolved) | `53` | UDP/TCP | Local / Salida | No necesaria | Escucha solo en `127.0.0.53`; consulta a los DNS del Netplan. |

### 4.3. Comprobaciones

Ver las reglas activas del cortafuegos:

    sudo ufw status numbered

Ver todos los puertos TCP/UDP en escucha y qué proceso los usa:

    sudo ss -tulpn

Ver el socket de PHP-FPM:

    sudo ss -xlp | grep php

Desde el cliente Windows (PowerShell) se puede comprobar si un puerto del servidor está accesible:

    Test-NetConnection 10.199.9.184 -Port 3306

---

## 5. Apache2 (Servidor Web)

### 5.1. Instalación y Configuración Básica

Instalación de Apache y apertura del puerto 80:

    sudo apt update
    sudo apt install apache2 -y
    sudo ufw allow 80
    sudo systemctl status apache2

### 5.2. Redirección ErrorLog y ErrorDocument (404)

Creamos un directorio para los errores en la raíz web:

    sudo mkdir /var/www/html/error
    sudo touch /var/www/html/error/error.log

Editamos el VirtualHost por defecto (`000-default.conf`):

    cd /etc/apache2/sites-available
    sudo cp 000-default.conf 000-default.conf.backup
    sudo nano 000-default.conf

Dentro de `<VirtualHost *:80>`, añade o modifica:

    ErrorLog /var/www/html/error/error.log
    ErrorDocument 404 /error/404.html

### 5.3. Habilitar .htaccess (AllowOverride)

Usar el comando `sudo a2enmod rewrite` para activar el modulo de rewrite

Entrar al archivo de configuracion usando `sudo nano /etc/apache2/apache2.conf`

**Modificar el valor de AllowOverride en el archivo:**
```bash
<Directory /var/www/>
  ...
  AllowOverride All
</Directory>

ServerName mdc-used
```

Comprobacion del archivo: `sudo apache2ctl configtest`

Recarga del servicio: `sudo systemctl reload apache2`

Reinicio del servicio: `sudo systemctl restart apache2`

### 5.4. Configuración HTTPS (Certificado SSL MDC)

Generar un certificado SSL almacena información básica sobre un sitio y lo acompaña de un archivo de claves para manejar datos cifrados de forma segura. Generaremos la clave privada y el CSR (Certificate Signing Request) que garantiza la integridad y autenticación.

Activamos el módulo SSL de Apache, que se basa en OpenSSL para proporcionar el modo de criptografía:

    sudo a2enmod ssl

Comando para crear los archivos del certificado:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt

Información solicitada por el sistema (CSR):
*   **Country Name:** `ES`
*   **State or Province Name:** `ZAMORA`
*   **Locality Name:** `BENAVENTE`
*   **Organization Name:** `IES LOS SAUCES` (Preferente en mayúsculas).
*   **Organizational Unit Name:** `INFORMATICA`
*   **Common Name:** `mdc-used` (Nombre del dominio/servidor sin espacios).
*   **Email Address:** (Dejar en blanco).

Configuración del sitio virtual seguro:

    cd /etc/apache2/sites-available/
    sudo cp default-ssl.conf default-ssl.conf.backup
    sudo nano default-ssl.conf

Configuración dentro de `<VirtualHost *:443>`:

    ServerAdmin webmaster@localhost
    ServerName 10.199.9.184
    DocumentRoot /var/www/html
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
    ErrorLog ${APACHE_LOG_DIR}/mdc-ssl-error.log
    CustomLog ${APACHE_LOG_DIR}/mdc-ssl-access.log combined

Activación del sitio virtual seguro:

    sudo a2ensite default-ssl.conf
    sudo ufw allow 443
    sudo systemctl restart apache2

Comprobación desde el navegador estableciendo una conexión segura: `https://10.199.9.184`.

### 5.5. Redirección de HTTP a HTTPS

Para activar este servicio se tiene que hacer con el operadorweb desde el CMD o MobaXterm.

Activamos el módulo rewrite, necesario para redirigir de un sitio a otro:

    sudo a2enmod rewrite

En el archivo `.htaccess` (previamente activado), añadimos las directivas de redirección:

    sudo nano /var/www/html/.htaccess

Añade lo siguiente:

    RewriteEngine On
    RewriteCond %{SERVER_PORT} 80
    RewriteRule ^(.*)$ https://10.199.9.184/$1 [R,L]

*Explicación de directivas:* `RewriteEngine On` habilita el módulo. `RewriteCond %{SERVER_PORT} 80` indica que todas las peticiones al puerto 80 pasen por la regla especificada. `[R,L]` realiza la redirección y deshabilita que reglas de reescritura posteriores afecten a la URL.

Reinicia y testea:

    sudo apache2ctl configtest
    sudo systemctl reload apache2

---

## 6. Cuenta de Desarrollo (Operador Web)

### 6.1. Creación del Usuario y Permisos Web

Creamos el usuario `operadorweb` forzando que su home sea la raíz web y asignándolo al grupo `www-data`:

    sudo useradd -M -d /var/www/html -N -g www-data -s /bin/bash operadorweb
    sudo passwd operadorweb

Le asignamos la propiedad del directorio y permisos:

    sudo chown -R operadorweb:www-data /var/www/html
    sudo chmod -R 775 /var/www/html

---

## 7. Ejecución PHP con PHP-FPM

### 7.1. Instalación de PHP-FPM

Instalación del servicio:

    sudo apt install php8.5-fpm -y

### 7.2. Integración de PHP-FPM con Apache2

Configurar Apache2 con php8.5-fpm:

    sudo a2enmod proxy_fcgi setenvif

Activar la configuración de php8.5-fpm:

    sudo a2enconf php8.5-fpm

Reiniciar ambos servicios para aplicar los cambios:

    sudo systemctl restart php8.5-fpm
    sudo systemctl restart apache2

### 7.3. Configuración de php.ini para Desarrollo

Hacer copia de seguridad y editar:

    cd /etc/php/8.5/fpm/
    sudo cp php.ini php.ini.bk2026
    sudo nano php.ini

Modifica las siguientes directivas para tu entorno de desarrollo:

    memory_limit = 256M
    upload_max_filesize = 100M
    max_execution_time = 360
    date.timezone = Europe/Madrid
    display_errors = On
    error_reporting = E_ALL
    display_startup_errors = On
    log_errors = On
    error_log = /var/log/php_errors.log

Aplica los cambios:

    sudo systemctl restart php8.5-fpm.service

### 7.4. Módulo Xdebug

Xdebug 3 es una extensión de PHP que permite depurar el código paso a paso (breakpoints, inspección de variables, pila de llamadas) desde el IDE del cliente de desarrollo (NetBeans).

La conexión de depuración funciona **al revés** de lo habitual: el navegador hace la petición HTTP al servidor y es el **servidor (Xdebug)** quien abre la conexión DBGP hacia el **cliente (NetBeans)**, que está escuchando en el puerto `9003`.

    ┌──────────────────────────────┐     1. Petición HTTP/HTTPS     ┌──────────────────────────────┐
    │   W11ED (Cliente Windows)    │ ─────────────────────────────> │       MDC-USED (Ubuntu)      │
    │  Firefox + NetBeans (9003)   │                                │  Apache2 + PHP-FPM 8.5       │
    │                              │ <───────────────────────────── │  Xdebug 3                    │
    └──────────────────────────────┘   2. Conexión Xdebug (DBGP)    └──────────────────────────────┘
                                          al puerto 9003 del cliente

*La configuración de la parte del cliente (NetBeans, firewall de Windows y mapeo de rutas) está en la documentación del Cliente de Desarrollo, apartado **5.5 Depuración**.*

#### 7.4.1. Instalación de Xdebug

Instalamos el paquete de Xdebug para nuestra versión de PHP:

    sudo apt update
    sudo apt install php8.5-xdebug -y

*Si el paquete `php8.5-xdebug` no estuviera disponible en los repositorios, se puede compilar con PECL:*

    sudo apt install php8.5-dev php-pear -y
    sudo pecl install xdebug

#### 7.4.2. Configuración del módulo (xdebug.ini)

En Ubuntu con PHP-FPM, la configuración del módulo está en la carpeta `mods-available`. Hacemos copia de seguridad y editamos:

    cd /etc/php/8.5/mods-available/
    sudo cp xdebug.ini xdebug.ini.bk2026
    sudo nano xdebug.ini

Dejamos el contenido del fichero así:

    [xdebug]
    zend_extension=xdebug.so
    xdebug.mode=debug
    xdebug.start_with_request=yes
    xdebug.discover_client_host=true
    xdebug.client_port=9003
    xdebug.idekey=NetBeans
    xdebug.log=/var/log/xdebug.log

**Explicación de las directivas:**
*   `zend_extension=xdebug.so`: Carga la extensión Xdebug en PHP.
*   `xdebug.mode=debug`: Activa el modo de depuración paso a paso (breakpoints, trazado).
*   `xdebug.start_with_request=yes`: Inicia la depuración en todas las peticiones, sin tener que añadir nada a la URL.
*   `xdebug.discover_client_host=true`: Xdebug detecta automáticamente la IP del cliente que ha hecho la petición HTTP y le devuelve la conexión de depuración. Así funciona igual en clase y en casa sin cambiar la IP.
*   `xdebug.client_port=9003`: Puerto del cliente donde escucha NetBeans (es el puerto por defecto de Xdebug 3; Xdebug 2 usaba el `9000`).
*   `xdebug.idekey=NetBeans`: Identificador de la sesión. **Debe coincidir** con el *Session ID* configurado en NetBeans.
*   `xdebug.log=/var/log/xdebug.log`: Fichero de log, muy útil cuando la conexión no funciona.

*Nota: no usamos `/tmp/xdebug.log` porque el servicio `php8.5-fpm` tiene su propia carpeta `/tmp` privada (`PrivateTmp`) y el log no aparecería en el `/tmp` normal.*

Creamos el fichero de log y se lo damos al usuario con el que se ejecuta PHP-FPM (`www-data`):

    sudo touch /var/log/xdebug.log
    sudo chown www-data:www-data /var/log/xdebug.log

#### 7.4.3. Activación en PHP-FPM y reinicio de servicios

Habilitamos el módulo para la SAPI de FPM y reiniciamos los servicios:

    sudo phpenmod -v 8.5 -s fpm xdebug
    sudo systemctl restart php8.5-fpm
    sudo systemctl restart apache2

#### 7.4.4. Comprobación

Comprobamos que PHP-FPM ha cargado la extensión:

    php-fpm8.5 -m | grep -i xdebug

Para verlo también desde el navegador, creamos (con el `operadorweb`) un fichero de prueba:

    nano /var/www/html/xdebuginfo.php

Con el siguiente contenido:

    <?php
    xdebug_info();

Accedemos a `https://10.199.9.184/xdebuginfo.php` y comprobamos que aparece **Step Debugger: ✔ enabled** y los valores configurados (`client_port 9003`, `idekey NetBeans`...). **Borramos el fichero después** para no dejar información del servidor a la vista:

    rm /var/www/html/xdebuginfo.php

#### 7.4.5. Cortafuegos y log de Xdebug

**Cortafuegos:** En el servidor **no hace falta abrir ningún puerto en UFW**, ya que la conexión de Xdebug es de **salida** (del servidor hacia el puerto `9003` del cliente) y UFW permite las conexiones salientes por defecto (ver tabla del apartado 4.2). La regla que sí es necesaria es la de **entrada** en el Firewall de Windows del cliente (ver Cliente de Desarrollo, apartado 5.5).

**Log:** Si NetBeans se queda en *"Waiting For Connection"*, revisamos en tiempo real el log mientras recargamos la página en el navegador:

    sudo tail -f /var/log/xdebug.log

*   `Connecting to configured address/port: ...` seguido de `Could not connect`: el Firewall de Windows está bloqueando el puerto `9003` o NetBeans no está escuchando.
*   No aparece nada: la extensión no se ha cargado (revisar el apartado 7.4.4).

---

## 8. MariaDB (Servidor de Base de Datos)

### 8.1. Instalación y Acceso Remoto

Instalación:

    sudo apt install mariadb-server -y

Para permitir conexiones remotas:

    sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

Cambia `bind-address = 127.0.0.1` a `bind-address = 0.0.0.0` y reinicia:

    sudo systemctl restart mariadb
    sudo ufw allow 3306

### 8.2. Creación de Usuario Administrador

Crearemos tu usuario `adminsql` ya que root funciona por *unix_socket*:

    sudo mariadb

Dentro de SQL ejecuta:

    CREATE USER 'adminsql'@'%' IDENTIFIED BY 'paso';
    GRANT ALL PRIVILEGES ON *.* TO 'adminsql'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    EXIT;

### 8.3. Asistente de Seguridad

Asegura el servidor ejecutando este script y siguiendo las instrucciones en pantalla:

    sudo mariadb-secure-installation

---

## 9. phpMyAdmin

Antes de instalar, vemos qué módulos tenemos para compararlos después:

    php -m > /home/miadmin/listadomodulos.txt

Instalamos, seleccionamos *Apache* y confirmamos la base de datos `dbconfig-common`:

    sudo apt install phpmyadmin -y
    php -m > /home/miadmin/listadomodulos2.txt
    diff /home/miadmin/listadomodulos.txt /home/miadmin/listadomodulos2.txt

Configuramos el acceso en Apache creando un enlace simbólico:

    sudo ln -sf /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
    sudo a2enconf phpmyadmin
    sudo systemctl restart apache2

---

## 10. Sitios Virtuales y DirectoryIndex

## 11. SFTP (Usuarios Enjaulados)

## 12. Herramientas de Desarrollo (phpDocumentor)

---

Autor: Moises Dominguez Cruz
