# W11ED - Cliente de Desarrollo
**MOISÉS ALBERTO DOMÍNGUEZ CRUZ**
**IES LOS SAUCES - DAW2** (2026/2027)

## Índice
- [W11ED - Cliente de Desarrollo](#w11ed---cliente-de-desarrollo)
  - [Índice](#índice)
  - [1. Configuración de la máquina](#1-configuración-de-la-máquina)
  - [2. Cuentas administradoras y cuenta de desarrollador](#2-cuentas-administradoras-y-cuenta-de-desarrollador)
  - [3. Navegadores](#3-navegadores)
  - [4. MobaXterm](#4-mobaxterm)
      - [Instalación](#instalación)
      - [4.1 Crear una sessión SSH](#41-crear-una-sessión-ssh)
      - [4.2 Crear una sessión SFTP](#42-crear-una-sessión-sftp)
  - [5. NetBeans](#5-netbeans)
    - [5.1 Instalación y configuración inicial. Plugings.](#51-instalación-y-configuración-inicial-plugings)
    - [5.2 Creación de proyectos, modificación, borrado, prueba.](#52-creación-de-proyectos-modificación-borrado-prueba)
    - [5.3 Administración de la base de datos](#53-administración-de-la-base-de-datos)
    - [5.4 Conexión al repositorio y versionado (Git)](#54-conexión-al-repositorio-y-versionado-git)
    - [5.5 Depuración (Configuración de la ejecución para la depuración)](#55-depuración-configuración-de-la-ejecución-para-la-depuración)
  - [6. Visual Studio Code](#6-visual-studio-code)
    - [6.1 Instalación y Extensiones.](#61-instalación-y-extensiones)
    - [6.2 Cómo crear un Workspace.](#62-cómo-crear-un-workspace)
    - [6.3 Conexión SFTP con máquina de desarrollo.](#63-conexión-sftp-con-máquina-de-desarrollo)
    - [6.4 Administración de la base de datos.](#64-administración-de-la-base-de-datos)
    - [6.5 Control de versiones (Git).](#65-control-de-versiones-git)
  - [Configuraciones Adicionales y Herramientas del IDE pendientes](#configuraciones-adicionales-y-herramientas-del-ide-pendientes)
---

## 1. Configuración de la máquina

El sistema operativo utilizado es Windows 10 Pro.

**Especificaciones de Windows:**
* **Edición**: Windows 10 Pro
* **Versión**: 22H2
* **Instalado el**: 08/09/2025
* **Experiencia**: Windows Feature Experience Pack 1000.19062.1000.0

**Especificaciones del dispositivo (supervisado por un dominio):**
* **Nombre del dispositivo**: ED49000391P391
* **Nombre completo del dispositivo**: ED49000391P391.educa.jcyl.es
* **Procesador**: Intel(R) Core(TM) i5-7400 CPU @ 3.00GHz 3.00 GHz
* **RAM instalada**: 16,0 GB (15,9 GB usable)
* **Tipo de sistema**: Sistema operativo de 64 bits, procesador basado en x64

## 2. Cuentas administradoras y cuenta de desarrollador
* **Cuentas administradoras**: El dominio está gestionado por la Junta de Castilla y León (educa.jcyl).
* **Cuenta de desarrollador**: Se utiliza la cuenta personal del portal (moisesa.domcru@educa.jcyl.es).

## 3. Navegadores
* El navegador principal utilizado es Mozilla Firefox.

## 4. MobaXterm
#### Instalación 
Descargar MobaXterm en este enlace : https://mobaxterm.mobatek.net/download.html

#### 4.1 Crear una sessión SSH
1. Abre MobaXterm y haz clic en el botón **"Session"** (situado en la esquina superior izquierda).
2. Selecciona el tipo de sesión **"SSH"**.
3. En el campo **"Remote host"**, introduce la dirección IP del servidor (por ejemplo, `10.199.9.184`).
4. Marca la casilla **"Specify username"** e introduce tu usuario administrador (ej. `miadmin`).
5. Haz clic en **"OK"**.
6. Al abrirse la terminal, introduce la contraseña correspondiente.

![alt text](../images/image-6.png)

#### 4.2 Crear una sessión SFTP
1. Haz clic nuevamente en **"Session"** y selecciona la pestaña **"SFTP"**.
2. En el campo **"Remote host"**, introduce la IP del servidor.
3. En el campo **"Username"**, introduce el usuario con permisos web (ej. `operadorweb`).
4. Haz clic en **"OK"** e introduce la contraseña cuando el programa lo solicite.
5. Se abrirá una interfaz gráfica con tus carpetas locales a la izquierda y las del servidor a la derecha (directorio inicial `/var/www/html`).

![alt text](../images/image-7.png)

## 5. NetBeans

### 5.1 Instalación y configuración inicial. Plugings.
* El sitio web oficial de descarga es `https://netbeans.apache.org/front/main/index.html`.
* Durante el asistente de instalación, se deben seleccionar las herramientas y tecnologías a utilizar (como Java SE, Java EE, PHP, etc.) y aceptar los términos de la licencia.
* En la configuración inicial, se debe ejecutar Apache NetBeans por primera vez; puede tardar unos segundos mientras carga los módulos internos.
* Si se necesita soporte para otros lenguajes o herramientas, se debe acceder a **Tools > Plugins**.
* En esta configuración específica, se activaron los módulos de **HTML5** y **PHP**.

![alt text](../images/image.png)

### 5.2 Creación de proyectos, modificación, borrado, prueba.
* **Creación**: Los proyectos se guardarán en el disco de datos, en una carpeta llamada `PROYECTOS-NETBEANS` con la ruta `D:\PROYECTOS-NETBEANS`. Para crear un proyecto nuevo, se hace clic en **File > New Project**, eligiendo la categoría PHP y el tipo "PHP Application". Se le asigna un nombre (ej. `DWESProyectoTema4`) y se indica el directorio local. La configuración base utiliza PHP 8.3 y codificación por defecto UTF-8.

![alt text](../images/image-8.png)

![alt text](../images/image-9.png)

![alt text](../images/image-10.png)


* **Configuración Remota**: En la configuración de ejecución (*Run Configuration*), se elige la opción "Remote Web Site (FTP, SFTP)". Se introduce la URL del proyecto del servidor web (ej. `http://10.199.9.184`), el usuario (`operadorweb`) y el directorio (`/DWESProyectoTema4`).

![alt text](../images/image-12.png)

* **Modificación**: En las opciones de subida de archivos (*Upload Files*), se marca **"On Save"**. De esta manera, cada vez que crees o modifiques el código de un archivo y pulses Guardar (`Ctrl + S`), NetBeans se conectará por SFTP y actualizará automáticamente el archivo en el servidor remoto, sin necesidad de subirlos manualmente.

![alt text](../images/image-13.png)

* **Borrado**: Para borrar un archivo o proyecto, basta con hacer clic derecho sobre él en la pestaña *Projects* y seleccionar **Delete**. Al borrar un proyecto completo, NetBeans te preguntará si deseas eliminar únicamente la configuración del IDE o si también quieres eliminar las fuentes locales (*sources*). Al confirmar, y gracias a la sincronización remota, el cambio se reflejará también en el servidor web.

![alt text](../images/image-14.png)

* **Prueba (Testing)**: Para probar tu desarrollo, haz clic derecho sobre el proyecto y selecciona **Run**, o pulsa el icono de reproducción (Play) en la barra superior. Al estar configurado el *Run Configuration* con tu IP, NetBeans abrirá automáticamente Firefox cargando la URL pública de tu servidor (ej. `http://10.199.9.184/MDCDWESProyectoTema4`).

![alt text](../images/image-15.png)

![alt text](../images/image-16.png)

### 5.3 Administración de la base de datos
NetBeans permite administrar de forma remota bases de datos MySQL/MariaDB directamente desde el IDE, facilitando la ejecución de scripts SQL y la visualización de tablas sin necesidad de cambiar a phpMyAdmin o a la consola.

**Pasos para configurar la conexión:**
1. Ve a la pestaña **Services** (Servicios) ubicada en el panel lateral izquierdo junto a la de *Projects*.
2. Despliega el nodo **Databases** (Bases de datos).
3. Haz clic derecho sobre **Databases** y selecciona **New Connection...** (Nueva conexión).

![alt text](../images/image-18.png)

4. En el desplegable de drivers, selecciona **MySQL** o **MariaDB** y haz clic en *Next*. (Previamente descargar el plugin correspondiente a la base de datos).

![alt text](../images/image-17.png)

5. Rellena los datos de tu servidor:
   * **Host:** Introduce la IP de tu servidor Ubuntu (ej. `10.199.9.184`).
   * **Port:** `3306` (el puerto por defecto de MariaDB).
   * **Database:** Puedes dejarlo en blanco o poner el nombre de una base específica si ya está creada.
   * **User Name:** El usuario administrador de la base de datos que creaste (ej. `adminsql`).
   * **Password:** La contraseña de ese usuario (ej. `paso`). Marca la casilla "Remember password".

![alt text](../images/image-19.png)

6. Haz clic en el botón **Test Connection**. Si la configuración remota (bind-address en Ubuntu y puertos de UFW) es correcta, aparecerá el mensaje de éxito.
7. Haz clic en **Finish**. A partir de ahora podrás desplegar tu conexión para visualizar las tablas, insertar registros o abrir la ventana del editor SQL haciendo clic derecho > **Execute Command**.

![alt text](../images/image-20.png)

### 5.4 Conexión al repositorio y versionado (Git)
Para llevar un control de versiones adecuado y conectar tu código con repositorios remotos (como GitHub o GitLab), NetBeans incorpora soporte nativo para Git.

#### Escenario A: Inicializar un proyecto local y subirlo a GitHub
*Cuando has creado tu proyecto desde cero en NetBeans (localmente) y quieres subirlo por primera vez a un repositorio vacío en GitHub.*
1. **Inicializar:** Haz clic derecho sobre tu proyecto en la pestaña *Projects* > **Versioning** > **Initialize Git Repository...** y confirma la ruta. Tus archivos se pondrán verdes (sin trackear).
2. **Primer Commit:** Haz clic derecho en el proyecto > **Git** > **Commit...** Escribe un mensaje (ej. "Commit inicial") y haz clic en *Commit*.
3. **Vincular y Subir (Push):** Haz clic derecho en el proyecto > **Git** > **Remote** > **Push...**
   * Marca "Specify Git Repository Location".
   * Introduce la URL de tu repositorio vacío de GitHub y tu Token de acceso personal en el campo de contraseña.
   * Selecciona tu rama local (normalmente `master` o `main`) y finaliza el asistente para subir el código.

#### Escenario B: Clonar un repositorio existente desde GitHub
*Cuando el proyecto ya existe en GitHub y quieres descargarlo a tu equipo para empezar a trabajar.*
1. En el menú superior de NetBeans, ve a **Team** > **Git** > **Clone...**
2. Introduce la URL del repositorio remoto (ej. `https://github.com/usuario/repositorio.git`).
3. Rellena tu usuario y tu Token de acceso personal (en "Password").
4. Selecciona la rama que quieres clonar y elige tu carpeta local de destino (ej. `D:\PROYECTOS-NETBEANS`).
5. NetBeans te preguntará si quieres abrir el proyecto recién clonado. Haz clic en sí.

#### Uso diario
Una vez conectado el repositorio, existen estas opciones que al hacer clic derecho en tu proyecto > **Git**:
* **Commit:** Guarda los cambios de forma local en tu equipo. Escribe siempre un mensaje descriptivo para indicar qué has modificado.
* **Remote > Fetch:** Descarga la información y el historial de cambios más recientes del repositorio remoto, pero *no* los fusiona con tu código local. Es muy útil para revisar qué han subido tus compañeros antes de integrarlo.
* **Remote > Pull:** Descarga y fusiona directamente las actualizaciones del repositorio remoto con tu código local.
* **Remote > Push:** Envía tus *commits* locales al repositorio de GitHub para que queden respaldados en la nube.
* **Branch (Ramas):** Ve a **Git > Branch > Create Branch...** para crear una nueva línea de trabajo paralela (muy útil para desarrollar nuevas funcionalidades sin romper el código principal). Para cambiarte de una rama a otra, usa **Git > Branch > Checkout...**
* **Merge (Fusionar):** Seleccionando **Git > Branch > Merge Revision...** combinas los cambios de otra rama hacia la rama en la que te encuentras trabajando actualmente.
* **Resolver Conflictos (Resolve Conflicts):** Si al hacer Pull o Merge existen líneas de código contradictorias, NetBeans te ofrecerá una herramienta visual (Diff) para decidir qué cambios mantener y cuáles descartar.
* **Pull Requests (PR):** Aunque los PR se revisan y aprueban desde la plataforma web (GitHub/GitLab), el flujo de trabajo inicia en NetBeans: creas una rama, haces tus cambios, haces *Push* de esa rama, y luego vas a tu navegador para abrir el PR y solicitar que tu código se integre en la rama `main` / `master`.
* **Show History:** Te muestra una línea de tiempo interactiva en la pestaña inferior del IDE con todos los cambios, fechas, autores y *commits* del proyecto.

### 5.5 Depuración (Configuración de la ejecución para la depuración)

## 6. Visual Studio Code

### 6.1 Instalación y Extensiones

**Instalación paso a paso de VS Code:**
1. Accede al sitio web oficial: `https://code.visualstudio.com/` y descarga el instalador para Windows.
2. Ejecuta el archivo descargado.
3. Acepta los términos de la licencia y selecciona la ruta de instalación por defecto.
4. En la pantalla de tareas adicionales, es **muy recomendable marcar las opciones**:
   * *Añadir la acción "Abrir con Code" al menú contextual de archivos.*
   * *Añadir la acción "Abrir con Code" al menú contextual de directorios.*
   * *Agregar a PATH (requiere reiniciar).*
5. Haz clic en Instalar y, al finalizar, ejecuta la aplicación.

**Instalación de Extensiones:**
Primero, instalamos estas extensiones buscando en la pestaña Extensions (icono de cuadros en el menú lateral izquierdo o presionando `Ctrl+Shift+X`):

**Extensiones obligatorias:**
* **SFTP:** Para subir/bajar archivos al servidor automáticamente.
* **PHP Extension Pack:** Incluye Xdebug y utilidades base.
* **PHP Intelephense:** Herramienta esencial de autocompletado avanzado y sintaxis para PHP.
* **SQLTools:** Para administrar bases de datos.
* **MySQL/MariaDB Support for SQLTools:** Driver necesario para conectar SQLTools con tu servidor Ubuntu.

**Extensiones opcionales pero bastante útiles:**
* Live Server, VirtualBox, Prettier, HTML CSS Intellisense.

![alt text](../images/image-21.png)

### 6.2 Creación y Configuración del Workspace

Un *workspace* es una colección de una o más carpetas abiertas en una sola ventana del editor. Sirve para organizar proyectos y aplicar configuraciones específicas a cada uno. Puedes guardar estas colecciones como un archivo `.code-workspace` con formato JSON para editar y compartir fácilmente la configuración.

Para crearlo:
1. Abre una ventana vacía sin ninguna carpeta abierta (`Ctrl + Shift + N`).
2. Arriba del todo a la izquierda, ve a **File > Add Folder to Workspace...**

![alt text](../images/image-22.png)

3. Nos abrirá un explorador. Yo recomiendo que, en el directorio que prefieras, crees una carpeta raíz para el workspace, y dentro se cree una carpeta para cada proyecto. Algo así:
   ```
   D:\
   └── PROYECTOS-VISUAL-STUDIO -> (Carpeta Workspace general)
       ├── MDCDWESProyectoPEPE
       ├── MDCDWECProyectoDWEC -> (Carpetas de proyectos)
       ├── MDCDWESProyectoTema5
       └── ...
   ```
   *Si vas a reutilizar proyectos o crear nuevos, asegúrate de que estén ubicados dentro de la carpeta del workspace `D:\PROYECTOS-VISUAL-STUDIO`.*
4. Selecciona las carpetas **DENTRO** de `PROYECTOS-VISUAL-STUDIO`, no la carpeta en sí (se pueden seleccionar todas a la vez).
5. Una vez hecho, en el explorador del editor aparecerán los diferentes proyectos.

![alt text](../images/image-23.png)

6. **IMPORTANTE:** Ve a **File > Save Workspace As...** y guárdalo (preferiblemente en la carpeta del workspace). Es necesario para algunas configuraciones más tarde.

![alt text](../images/image-24.png)

> **⚠️ IMPORTANTE:** A partir de aquí, las siguientes configuraciones (SFTP, Git, Base de Datos y Debug) se aplican de forma independiente **DENTRO de cada uno de los proyectos** de tu Workspace.

### 6.3 Conexión SFTP con máquina de desarrollo

En cada proyecto creamos una carpeta llamada `.vscode/` y dentro un archivo `sftp.json`. *(O se hace una vez y copiamos y pegamos la carpeta más rápido).*

El archivo tiene que tener este formato (modificar `name`, `host` y `remotePath`, y borrar los comentarios para que funcione):
```json
{
  "name": "MDC-ConexionSFTP", # Nombre identificativo para la conexión
  "context": ".", # Carpeta donde se suben/descargan los archivos en local ('.' = carpeta proyecto)
  "host": "10.199.9.184", # Dirección IP o dominio del servidor remoto
  "username": "operadorweb", # Nombre de usuario de acceso al servidor.
  "password": "paso", # Si no se pone te pregunta cada vez que cierres y abres el editor
  "remotePath": "/var/www/html/MDCDWESProyectoTema4", # Ruta del directorio destino en el servidor remoto
  "uploadOnSave": true, # Sube archivos automaticamente al modificar
  "ignore": [ # Lista de archivos o carpetas que la extensión debe omitir al sincronizar
      ".git",
      ".DS_Store"
  ],
  "remoteExplorer": { # Sirve para ocultar archivos y carpetas en la vista del árbol del explorador remoto
    "filesExclude": [
      ".git",
      ".DS_Store",
      ".cache",
      ".local",
      ".cache",
      ".bash_history",
      ".bashrc"
    ]
  }
}
```
*(Nota: `"context": "."` = carpeta del proyecto; Si no pones `"password"`, te preguntará cada vez que cierres y abras el editor; `"uploadOnSave": true` sube archivos automáticamente al modificar).*

**Sincronización Manual:**
Para subir/descargar archivos manualmente (obligatorio para imágenes o documentos externos que no saltan al guardar), podemos seleccionar el archivo en cuestión, la carpeta o el proyecto entero en el explorador de archivos, hacer clic derecho y darle a:
* **Sync Local -> Remote:** Para pasarlo del local a remoto.
* **Sync Remote -> Local:** Para pasarlo del remoto a local.
* **Sync Both Directions:** Para hacer ambos a la vez.

### 6.4 Administración de la base de datos

Usando la extensión **SQLTools**:
1. En la barra lateral izquierda, haz clic en el icono de base de datos de SQLTools (tiene forma de un pequeño cilindro o servidor).
2. Haz clic en **Add New Connection** y selecciona el driver **MySQL/MariaDB**.
   
![alt text](../images/image-25.png)

3. Rellena los datos de tu servidor:
   * **Connection Name:** (ej. `MDC-BaseDatos`)
   * **Server Address:** `10.199.9.184`
   * **Port:** `3306`
    * **Database:** `mysql`
   * **Username:** `adminsql`
   * **Password:** Solicitar en cada conexión o guardar (contraseña: `paso`).
4. Haz clic en **Save Connection** y luego en **Connect Now**. Podrás ejecutar sentencias SQL y ver tablas desplegando la conexión directamente desde VS Code.

![alt text](../images/image-26.png)

### 6.5 Control de versiones (Git)

Para abrir el panel para el control de versiones, en la barra lateral buscamos un icono con un círculo dividido con ramas (tercer icono normalmente); o hacemos `Ctrl + Shift + G`.

Desde ahí podemos controlar todo el git de cada proyecto (Hacer commits, cambiar ramas, crear y añadir tags, gestionar stashes...). Estaría bien incluir esto en el archivo `.gitignore` en la raíz de cada proyecto para no subir archivos residuales del sistema o de la configuración del editor:
```text
.bash_history
.bashrc
.wget-hsts
.cache/
.dotnet/
.local/
.ssh/
.vscode-server/
.vscode/

*.code-workspace
nbproject/
```

**Escenario A: Inicializar un proyecto nuevo**
Si el proyecto no tiene Git configurado todavía:
1. Ve al panel de control de versiones y haz clic en el botón **Initialize Repository** (Inicializar repositorio).
2. Te aparecerán todos tus archivos listados bajo la sección "Cambios" (*Changes*).
3. Para decirle a Git qué archivos quieres incluir en la versión, haz clic en el icono **`+`** (Stage Changes) junto a los archivos o junto a la palabra "Changes" para agregarlos todos.
4. Escribe un mensaje descriptivo en el cuadro de texto y haz clic en el botón **Commit** (o en el *check* `✓`).
5. Para conectarlo a GitHub, haz clic en **Publish Branch**, selecciona "Add remote" y pega la URL de tu repositorio vacío de GitHub.

**Escenario B: Clonar un proyecto de GitHub**
Si quieres traer un proyecto existente:
1. Presiona `Ctrl + Shift + P` para abrir la paleta de comandos.
2. Escribe `Git: Clone` y presiona Enter.
3. Pega la URL de tu repositorio en GitHub y presiona Enter.
4. Selecciona la carpeta de destino (ej. `D:\PROYECTOS-VISUAL-STUDIO`).
5. VS Code te preguntará si deseas abrir el repositorio clonado.

**Uso diario:**
* **Stage y Commit:** Cada vez que modifiques archivos, aparecerán en el panel. Púlsales al **`+`** para pasarlos al área de preparación (*Staged Changes*), escribe qué has hecho en la caja superior y dale a **Commit**.
* **Sync Changes (Sincronizar):** Una vez hecho el commit, el gran botón azul cambiará a **Sync Changes**. Pulsarlo hará un *Push* y un *Pull* simultáneamente (subirá tus cambios y descargará los de otros).
* **Pull / Push específicos:** Puedes acceder a las opciones de Push, Pull y Fetch haciendo clic en el menú de los tres puntitos `...` en la parte superior derecha del panel de Git.
* **Gestión de Ramas (Branches):** En la esquina inferior izquierda de la ventana de VS Code verás el nombre de tu rama actual (ej. `main` o `master`). Si haces clic en él, podrás crear nuevas ramas o cambiarte a otra existente fácilmente.

## Configuraciones Adicionales y Herramientas del IDE pendientes
* Depuración (Tanto en Netbeans como en Visual Studio).
* Prueba (Configuración de la ejecución para probar el desarrollo).
* PHP Doc.