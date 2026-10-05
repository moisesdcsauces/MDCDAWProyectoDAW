# USED – Ubuntu Server
*(Servidor de desarrollo para aplicaciones web basadas en el uso de PHP)*

**Guía de Instalación y Configuración: Ubuntu Server (`MDC-USLimpia`)**

---

## Índice de Contenidos

- [USED – Ubuntu Server](#used--ubuntu-server)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Configuración Inicial](#1-configuración-inicial)
    - [1.1. Preparación de la Máquina Virtual (VirtualBox)](#11-preparación-de-la-máquina-virtual-virtualbox)
    - [1.2. Instalación del Sistema Operativo (Ubuntu Server)](#12-instalación-del-sistema-operativo-ubuntu-server)
    - [1.3. Configuración de Red Definitiva (Netplan: Clase y Casa)](#13-configuración-de-red-definitiva-netplan-clase-y-casa)
    - [1.4. Actualización del Sistema, Zona Horaria, SSH, Firewall y Antivirus](#14-actualización-del-sistema-zona-horaria-ssh-firewall-y-antivirus)
    - [1.5. Comprobación de la Configuración Inicial](#15-comprobación-de-la-configuración-inicial)
  - [2. Cuentas de Administración](#2-cuentas-de-administración)
    - [2.1. Cuentas Administradoras (`miadmin` y `miadmin2`)](#21-cuentas-administradoras-miadmin-y-miadmin2)
    - [2.2. Cuentas de Desarrolladores (`operadorweb`)](#22-cuentas-de-desarrolladores-operadorweb)
    - [2.3. Comprobación de Cuentas y Permisos](#23-comprobación-de-cuentas-y-permisos)
  - [3. Apache](#3-apache)
    - [3.1. Instalación de Apache2](#31-instalación-de-apache2)
    - [3.2. Configuración de HTTP, HTTPS (SSL) y Cortafuegos](#32-configuración-de-http-https-ssl-y-cortafuegos)
    - [3.3. Comprobación del Servicio Apache](#33-comprobación-del-servicio-apache)
  - [4. PHP](#4-php)
    - [4.1. Instalación de PHP 8.5-FPM](#41-instalación-de-php-85-fpm)
    - [4.2. Integración de PHP-FPM con Apache2](#42-integración-de-php-fpm-con-apache2)
    - [4.3. Comprobación del Servicio PHP-FPM](#43-comprobación-del-servicio-php-fpm)

---

## 1. Configuración Inicial

### 1.1. Preparación de la Máquina Virtual (VirtualBox)

1. Abre **VirtualBox** y haz clic en **Nueva**.
2. **Nombre y Sistema Operativo:**
   - Nombre: `MDC-USLimpia`
   - Carpeta de máquina: *(Tu preferencia)*
   - Tipo: `Linux`
   - Versión: `Ubuntu (64-bit)`
3. **Hardware:**
   - Memoria RAM: `2048 MB` (2 GB)
   - Procesadores (CPU): `2`
4. **Disco Duro:**
   - Selecciona "Crear un disco duro virtual ahora".
   - Formato: `VDI (VirtualBox Disk Image)`.
   - Tamaño: `150GB` (`/`), `350GB` (`/var`) y `4GB` de `swap`.
5. **Configuración de Red (Antes de iniciar):**
   - **En Clase (IES Los Sauces - Dominio de la Junta):** Ve a las **Preferencias** de la máquina creada > **Red** y **deshabilita la tarjeta de red** (desmarcando la casilla "Habilitar adaptador de red") antes de iniciar la máquina. Esto evitará que el instalador intente conectarse a repositorios de internet bloqueados por el DNS de la Junta y provoque fallos en la instalación.
   - **En Casa:** Asegúrate de que la casilla "Habilitar adaptador de red" está marcada y selecciona **Adaptador Puente (Bridged)** para que tome IP de la red de tu casa.

---

### 1.2. Instalación del Sistema Operativo (Ubuntu Server)

Inicia la máquina virtual seleccionando la ISO de **Ubuntu Server** (versión recomendada 26.04 LTS según Heraclio).

1. **Idioma y Teclado:** Selecciona español.
2. **Conexión de Red (Clase):** Como hemos deshabilitado la tarjeta en el paso anterior, omite la configuración de red durante la instalación. Lo configuraremos manualmente luego.
3. **Configuración de Almacenamiento (Particionamiento Manual):**
   - Selecciona **Custom storage layout** (Personalizado).
   - Crea las siguientes particiones en tu disco libre:
     - **Partición 1 (Sistema):** Tamaño `150G`, Formato `ext4`, Punto de montaje `/`.
     - **Partición 2 (Swap):** Tamaño `4G` (RAM $\times 2$), Formato `swap`.
     - **Partición 3 (Datos):** Tamaño `350G`, Formato `ext4`, Punto de montaje `/var`.
4. **Configuración del Perfil (Usuario principal):**
   - Nombre: `Moisés`
   - Nombre del servidor: `MDC-USLimpia`
   - Nombre de usuario: `miadmin`
   - Contraseña: `paso`
5. **SSH Setup:** Marca la casilla **"Install OpenSSH server"**.
6. Finaliza la instalación, **apaga la máquina virtual** y retira la ISO.

---

### 1.3. Configuración de Red Definitiva (Netplan: Clase y Casa)

> **¡ATENCIÓN!** Antes de volver a encender la máquina en clase, ve a la configuración de VirtualBox > **Red** y **vuelve a habilitar el adaptador de red** (como **Adaptador Puente**) para poder tener conexión.

Inicia sesión con tu usuario `miadmin` y contraseña `paso`.

```bash
# Cambiar nombre de la máquina en el sistema (si fuera necesario)
sudo hostnamectl set-hostname nuevo-nombre
sudo nano /etc/hosts

# Acceder al directorio para cambiar la configuración de red
cd /etc/netplan

# Visualizar el directorio
ls 00-installer-config.yaml

# Hacer copia de seguridad de la configuración
sudo cp 00-installer-config.yaml 00-installer-config.yaml.backup

# Editar la configuración de red
sudo nano 00-installer-config.yaml
```

- **Parámetros para CLASE (IES Los Sauces):**
  - **Address (IP):** `10.199.9.184/22`
  - **Gateway (Puerta de enlace):** `10.199.8.1`
  - **Name servers (DNS):** `10.151.123.21, 10.151.126.21`

- **Parámetros para CASA:**
  - **Subnet:** `192.168.1.0/24`
  - **Address (IP):** `192.168.1.100/24`
  - **Gateway (Puerta de enlace):** `192.168.1.1`
  - **Name servers (DNS):** `8.8.8.8, 8.8.4.4`

```bash
# Aplicar configuración de red
sudo netplan apply
```

---

### 1.4. Actualización del Sistema, Zona Horaria, SSH, Firewall y Antivirus

```bash
# 1. Actualizar el Sistema Operativo
sudo apt update && sudo apt upgrade -y

# 2. Instalar SSH (si no se instaló en el paso previo)
sudo apt install openssh-server -y

# 3. Activar el SSH en el cortafuegos UFW
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status

# Borrar regla IPv6 en UFW
sudo ufw status numbered
sudo ufw delete 2

# 4. Comprobar y configurar Fecha y Hora
timedatectl status
sudo timedatectl set-timezone Europe/Madrid

# 5. Instalar y actualizar el Antivirus ClamAV
sudo apt update
sudo apt install clamav clamav-daemon -y

# Parar el demonio de actualización para actualizar manualmente
sudo systemctl stop clamav-freshclam
sudo freshclam

# Iniciar y habilitar el servicio de actualización del antivirus
sudo systemctl start clamav-freshclam
sudo systemctl enable clamav-freshclam
```

---

### 1.5. Comprobación de la Configuración Inicial

*(Usa `q` para salir de la vista de estado de cada servicio).*

```bash
# Verificar el nombre del host (hostname) y sistema
hostnamectl
uname -a

# Verificar la configuración de red y la IP asignada
ip a

# Ver la configuración aplicada en Netplan
cat /etc/netplan/00-installer-config.yaml

# Verificar los discos, particiones y tamaños (/, /var, swap)
lsblk
df -h

# Mostrar procesos que se están ejecutando y ruta actual
ps
pwd

# Comprobar el estado del servicio SSH
sudo systemctl status ssh

# Comprobar el estado del cortafuegos UFW
sudo systemctl status ufw
sudo ufw status

# Comprobar el estado del Antivirus ClamAV
sudo systemctl status clamav-daemon
sudo systemctl status clamav-freshclam
```
*(Opcional: Conectarse desde el SSH remoto a la IP asignada: `ssh miadmin@10.199.9.184`).*

---

## 2. Cuentas de Administración

### 2.1. Cuentas Administradoras (`miadmin` y `miadmin2`)

Además de `miadmin` (creada en la instalación), creamos la cuenta administradora secundaria `miadmin2`:

```bash
# Crear miadmin2 (te pedirá introducir la contraseña, escribe: paso)
sudo adduser miadmin2

# Darle permisos de administrador a miadmin2
sudo usermod -aG sudo miadmin2
sudo usermod -aG sudo,adm,cdrom,dip,plugdev,lxd miadmin2
```

---

### 2.2. Cuentas de Desarrolladores (`operadorweb`)

El usuario operador web gestiona el contenido del servidor web con permisos limitados a `/var/www/html`.

> - [X] **operadorweb/paso** - Gestión de contenido web

**Características:**
- **Directorio home:** `/var/www/html`
- **Grupo primario:** `www-data`
- **Shell:** `/bin/bash`
- **Permisos:** `rwx` en `/var/www/html`

**Creación del Usuario Operador Web:**
```bash
# Crear usuario operador web
sudo useradd -M -d /var/www/html -g www-data -s /bin/bash operadorweb

# Establecer contraseña (paso)
sudo passwd operadorweb
```
**Explicación de parámetros:**
- `-M`: No crear directorio home automáticamente
- `-d /var/www/html`: Directorio home existente
- `-g www-data`: Grupo primario
- `-s /bin/bash`: Shell bash

**Configurar Propiedad y Permisos:**
```bash
# Cambiar propietario y grupo
sudo chown -R operadorweb:www-data /var/www/html

# Establecer permisos
sudo chmod -R 775 /var/www/html
```
**Explicación y justificación de permisos 775:**
- **7** (Propietario `operadorweb`): `rwx` $\rightarrow$ puede crear, modificar y eliminar archivos.
- **7** (Grupo `www-data` / Apache): `rwx` $\rightarrow$ puede leer, ejecutar y escribir si es necesario.
- **5** (Otros): `r-x` $\rightarrow$ solo lectura y ejecución.

*(Opcional) Crear cuentas adicionales estándar si es necesario:*
```bash
# Crear operadorweb2 (Contraseña: paso)
sudo adduser operadorweb2

# Crear operadorweb3 (Contraseña: paso)
sudo adduser operadorweb3
```

---

### 2.3. Comprobación de Cuentas y Permisos

```bash
# Comprobar los usuarios (miadmin y miadmin2) y a qué grupos pertenecen (deben estar en 'sudo')
id miadmin
cat /etc/passwd | grep miadmin
cat /etc/group | grep miadmin

id miadmin2
cat /etc/passwd | grep miadmin2
cat /etc/group | grep miadmin2

# Ver información de operadorweb
id operadorweb

# Verificar propiedad y permisos del directorio web
ls -la /var/www/
ls -ld /var/www/html
```
**Salida esperada:**
```text
drwxrwxr-x 2 operadorweb www-data 4096 Sep 21 21:34 /var/www/html
```

---

## 3. Apache

### 3.1. Instalación de Apache2

```bash
sudo apt install apache2 -y
```

---

### 3.2. Configuración de HTTP, HTTPS (SSL) y Cortafuegos

```bash
# Activar el módulo SSL
sudo a2enmod ssl

# Activar el sitio por defecto con HTTPS
sudo a2ensite default-ssl

# Reiniciar Apache para aplicar los cambios
sudo systemctl restart apache2

# Permitir tráfico HTTP y HTTPS en el cortafuegos
sudo ufw allow 'Apache Full'
```

---

### 3.3. Comprobación del Servicio Apache

```bash
# Comprobar el estado del servicio Apache (HTTP/HTTPS)
sudo systemctl status apache2

# Comprobar que la regla 'Apache Full' está activa en el cortafuegos
sudo ufw status

# Comprobar que Apache escucha en los puertos 80 y 443
sudo ss -tlpn | grep apache2
```
- **Comprobación web:** Entra desde el navegador del equipo anfitrión a `http://<IP_SERVIDOR>` y `https://<IP_SERVIDOR>` para verificar que carga la página por defecto de Apache2.

---

## 4. PHP

### 4.1. Instalación de PHP 8.5-FPM

```bash
# Instalar php8.5-fpm
sudo apt install php8.5-fpm -y

# Reiniciar php8.5-fpm
sudo systemctl restart php8.5-fpm
```

---

### 4.2. Integración de PHP-FPM con Apache2

```bash
# Configurar Apache2 con php8.5-fpm
sudo a2enmod proxy_fcgi setenvif

# Activar la configuración de php8.5-fpm
sudo a2enconf php8.5-fpm

# Reiniciar ambos servicios para aplicar los cambios
sudo systemctl restart php8.5-fpm
sudo systemctl restart apache2
```

---

### 4.3. Comprobación del Servicio PHP-FPM

```bash
# Comprobar el estado del servicio PHP-FPM
sudo systemctl status php8.5-fpm
sudo systemctl status php*-fpm

# Comprobar la versión instalada de PHP
php -v
```