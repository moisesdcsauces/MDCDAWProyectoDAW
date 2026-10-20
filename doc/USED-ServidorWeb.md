# Guía de Instalación y Configuración: Ubuntu Server (MDC-USLimpia)
*(Servidor de desarrollo para aplicaciones web basadas en el uso de PHP)*

---

## Índice de Contenidos

- [Guía de Instalación y Configuración: Ubuntu Server (MDC-USLimpia)](#guía-de-instalación-y-configuración-ubuntu-server-mdc-uslimpia)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Configuración Inicial](#1-configuración-inicial)
    - [1.1. Preparación e Instalación del SO](#11-preparación-e-instalación-del-so)
    - [1.2. Configuración de Red (Netplan: Clase y Casa)](#12-configuración-de-red-netplan-clase-y-casa)
    - [1.3. Actualización, Fecha, SSH, Firewall y Antivirus](#13-actualización-fecha-ssh-firewall-y-antivirus)
    - [1.4. Comprobación del Sistema y Conexión](#14-comprobación-del-sistema-y-conexión)
  - [2. Cuentas de Administración](#2-cuentas-de-administración)
    - [2.1. Cuentas Administradoras (`miadmin`, `miadmin2`)](#21-cuentas-administradoras-miadmin-miadmin2)
  - [3. Apache2 (Servidor Web)](#3-apache2-servidor-web)
    - [3.1. Instalación y Configuración Básica](#31-instalación-y-configuración-básica)
    - [3.2. Redirección ErrorLog y ErrorDocument (404)](#32-redirección-errorlog-y-errordocument-404)
    - [3.3. Habilitar .htaccess (AllowOverride)](#33-habilitar-htaccess-allowoverride)
    - [3.4. Configuración HTTPS (Certificado SSL MDC)](#34-configuración-https-certificado-ssl-mdc)
    - [3.5. Redirección de HTTP a HTTPS](#35-redirección-de-http-a-https)
  - [4. Cuenta de Desarrollo (Operador Web)](#4-cuenta-de-desarrollo-operador-web)
    - [4.1. Creación del Usuario y Permisos Web](#41-creación-del-usuario-y-permisos-web)
  - [5. Ejecución PHP con PHP-FPM](#5-ejecución-php-con-php-fpm)
    - [5.1. Instalación de PHP-FPM](#51-instalación-de-php-fpm)
    - [5.2. Integración de PHP-FPM con Apache2](#52-integración-de-php-fpm-con-apache2)
    - [5.3. Configuración de php.ini para Desarrollo](#53-configuración-de-phpini-para-desarrollo)
  - [6. MariaDB (Servidor de Base de Datos)](#6-mariadb-servidor-de-base-de-datos)
    - [6.1. Instalación y Acceso Remoto](#61-instalación-y-acceso-remoto)
    - [6.2. Creación de Usuario Administrador](#62-creación-de-usuario-administrador)
    - [6.3. Asistente de Seguridad](#63-asistente-de-seguridad)
  - [7. phpMyAdmin](#7-phpmyadmin)
  - [8. Módulos PHP](#8-módulos-php)
  - [9. XDebug](#9-xdebug)
  - [10. Sitios Virtuales y DirectoryIndex](#10-sitios-virtuales-y-directoryindex)
  - [11. SFTP (Usuarios Enjaulados)](#11-sftp-usuarios-enjaulados)
  - [12. Herramientas de Desarrollo (phpDocumentor)](#12-herramientas-de-desarrollo-phpdocumentor)

---

## 1. Configuración Inicial

### 1.1. Preparación e Instalación del SO

*   **Nombre de la máquina:** `MDC-USLimpia`
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

### 1.2. Configuración de Red (Netplan: Clase y Casa)

Asegúrate de que el nombre del host sea correcto:

    sudo hostnamectl set-hostname MDC-USLimpia
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

### 1.3. Actualización, Fecha, SSH, Firewall y Antivirus

Actualización del sistema y configuración de zona horaria:

    sudo apt update && sudo apt upgrade -y
    date
    sudo timedatectl set-timezone Europe/Madrid

Habilitar Cortafuegos y puertos básicos (SSH):

    sudo ufw enable
    sudo ufw allow 22

Instalar y actualizar Antivirus ClamAV:

    sudo apt install clamav clamav-daemon -y
    sudo systemctl stop clamav-freshclam
    sudo freshclam
    sudo systemctl start clamav-freshclam
    sudo systemctl enable clamav-freshclam

### 1.4. Comprobación del Sistema y Conexión

Desde el terminal (CMD) de tu máquina anfitriona, haz ping y conéctate:

    ping 10.199.9.184
    ssh miadmin@10.199.9.184

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

## 3. Apache2 (Servidor Web)

### 3.1. Instalación y Configuración Básica

Instalación de Apache y apertura del puerto 80:

    sudo apt update
    sudo apt install apache2 -y
    sudo ufw allow 80
    sudo systemctl status apache2

### 3.2. Redirección ErrorLog y ErrorDocument (404)

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

### 3.3. Habilitar .htaccess (AllowOverride)

El archivo `.htaccess` se activa su uso con la directiva AllowOverride[cite: 22]. Lo configuraremos directamente en nuestro VirtualHost:

    sudo nano /etc/apache2/sites-available/000-default.conf

Añade el bloque `<Directory>` dentro de tu `<VirtualHost *:80>` asegurándote de que quede configurado así:

    <VirtualHost *:80>
        # ... otras configuraciones que ya tengas (ServerAdmin, ErrorLog, etc) ...
        DocumentRoot /var/www/html

        <Directory /var/www/html>
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>

Crea el archivo y reinicia:

    sudo touch /var/www/html/.htaccess
    sudo systemctl restart apache2

### 3.4. Configuración HTTPS (Certificado SSL MDC)

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

### 3.5. Redirección de HTTP a HTTPS

Activamos el módulo rewrite, necesario para redirigir de un sitio a otro:

    sudo a2enmod rewrite

En el archivo `.htaccess` (previamente activado), añadimos las directivas de redirección:

    sudo nano /var/www/html/.htaccess

Añade lo siguiente:

    RewriteEngine On
    RewriteCond %{SERVER_PORT} 80
    RewriteRule ^(.*)$ https://10.199.9.184/$1 [R,L]

*Explicación de directivas:* `RewriteEngine On` habilita el módulo[cite: 24]. `RewriteCond %{SERVER_PORT} 80` indica que todas las peticiones al puerto 80 pasen por la regla especificada[cite: 24]. `[R,L]` realiza la redirección y deshabilita que reglas de reescritura posteriores afecten a la URL.

Reinicia y testea:

    sudo apache2ctl configtest
    sudo systemctl reload apache2

---

## 4. Cuenta de Desarrollo (Operador Web)

### 4.1. Creación del Usuario y Permisos Web

Creamos el usuario `operadorweb` forzando que su home sea la raíz web y asignándolo al grupo `www-data`:

    sudo useradd -M -d /var/www/html -N -g www-data -s /bin/bash operadorweb
    sudo passwd operadorweb

Le asignamos la propiedad del directorio y permisos:

    sudo chown -R operadorweb:www-data /var/www/html
    sudo chmod -R 775 /var/www/html

---

## 5. Ejecución PHP con PHP-FPM

### 5.1. Instalación de PHP-FPM

Instalación del servicio:

    sudo apt install php8.5-fpm -y

### 5.2. Integración de PHP-FPM con Apache2

Configurar Apache2 con php8.5-fpm:

    sudo a2enmod proxy_fcgi setenvif

Activar la configuración de php8.5-fpm:

    sudo a2enconf php8.5-fpm

Reiniciar ambos servicios para aplicar los cambios:

    sudo systemctl restart php8.5-fpm
    sudo systemctl restart apache2

### 5.3. Configuración de php.ini para Desarrollo

Hacer copia de seguridad y editar:

    cd /etc/php/8.5/fpm/
    sudo cp php.ini php.ini.bk2025
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

---

## 6. MariaDB (Servidor de Base de Datos)

### 6.1. Instalación y Acceso Remoto

Instalación:

    sudo apt install mariadb-server -y

Para permitir conexiones remotas:

    sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

Cambia `bind-address = 127.0.0.1` a `bind-address = 0.0.0.0` y reinicia:

    sudo systemctl restart mariadb
    sudo ufw allow 3306

### 6.2. Creación de Usuario Administrador

Crearemos tu usuario `adminsql` ya que root funciona por *unix_socket*:

    sudo mariadb

Dentro de SQL ejecuta:

    CREATE USER 'adminsql'@'%' IDENTIFIED BY 'paso';
    GRANT ALL PRIVILEGES ON *.* TO 'adminsql'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    EXIT;

### 6.3. Asistente de Seguridad

Asegura el servidor ejecutando este script y siguiendo las instrucciones en pantalla:

    sudo mysql_secure_installation

---

## 7. phpMyAdmin

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

## 8. Módulos PHP

Instala extensiones clave para que PHP se comunique con MariaDB:

    sudo apt install php8.5-mysql php8.5-intl
    sudo systemctl restart php8.5-fpm

---

## 9. XDebug

## 10. Sitios Virtuales y DirectoryIndex

## 11. SFTP (Usuarios Enjaulados)

## 12. Herramientas de Desarrollo (phpDocumentor)


Autor: Moises Dominguez Cruz