# Guía: Cómo añadir un nuevo subproyecto sin mezclar repositorios

Este flujo de trabajo garantiza que el repositorio principal (servidor web) ignore los subproyectos y que cada subproyecto tenga su propio historial de Git independiente.

## Paso 1: Crear el proyecto
1. Crea tu nuevo proyecto en NetBeans como lo haces normalmente (ej. dentro de la carpeta `MDCProyectoDAW`).
2. Supongamos que la carpeta se llama `MDC_NuevoProyecto`.

## Paso 2: Ignorar la carpeta en el proyecto principal
Para evitar que el repositorio padre absorba los archivos del nuevo proyecto:
1. Abre el archivo `.gitignore` situado en la raíz del proyecto principal (`MDCProyectoDAW`).
2. Añade el nombre de la nueva carpeta al final del archivo:
   ```text
   /MDC_NuevoProyecto/
   ```
3. Guarda, haz commit y sube los cambios del repositorio principal:
   ```bash
   git add .gitignore
   git commit -m "Excluir MDC_NuevoProyecto del repo principal"
   git push origin developer
   ```
*(En NetBeans, la carpeta del nuevo proyecto debería aparecer ahora en color gris).*

## Paso 3: Inicializar el repositorio del nuevo proyecto
Ahora configuraremos el nuevo proyecto de forma independiente:
1. Abre la terminal y entra en la nueva carpeta:
   ```bash
   cd MDC_NuevoProyecto
   ```
2. Inicializa Git localmente:
   ```bash
   git init
   ```

## Paso 4: Ignorar archivos locales (NetBeans)
Evita subir configuraciones locales de tu IDE a GitHub:
1. Crea un archivo `.gitignore` dentro de `MDC_NuevoProyecto`.
2. Añade la siguiente línea y guarda:
   ```text
   /nbproject/
   ```

## Paso 5: Subir a GitHub
Sube tu código limpio a su propio repositorio remoto:
1. Crea la rama de trabajo (ej. `developer`):
   ```bash
   git checkout -b developer
   ```
2. Añade los archivos y haz el primer commit:
   ```bash
   git add .
   git commit -m "Commit inicial de MDC_NuevoProyecto"
   ```
3. Vincula tu repositorio en GitHub y sube los cambios:
   ```bash
   git remote add origin https://github.com/tu-usuario/MDC_NuevoProyecto.git
   git push -u origin developer
   ```
4. (Opcional) Crea y sincroniza la rama `master`:
   ```bash
   git checkout -b master
   git push -u origin master
   git checkout developer
   ```

¡Listo! Ya tienes tu proyecto anidado físicamente en tu servidor local, pero totalmente independiente en GitHub.