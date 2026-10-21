# Guía: Cómo subir un proyecto a GitHub desde cero

Esta guía detalla los pasos fundamentales para tomar una carpeta de tu ordenador que aún no tiene control de versiones y subirla como un repositorio nuevo a GitHub.

## Paso 1: Preparación en GitHub
Antes de tocar la consola, necesitas el "espacio" donde vivirá tu código en la nube.
1. Entra a tu cuenta de [GitHub](https://github.com/).
2. Haz clic en el botón **"New"** (Nuevo repositorio).
3. Ponle un nombre a tu repositorio.
4. **IMPORTANTE:** No marques las opciones de añadir `README`, `.gitignore` o licencia todavía (es mejor hacerlo desde tu ordenador para evitar conflictos).
5. Haz clic en **"Create repository"** y copia la URL que te proporciona GitHub (ej. `https://github.com/tu-usuario/tu-proyecto.git`).

## Paso 2: Inicializar el repositorio local
Abre tu terminal y navega hasta la carpeta de tu proyecto en tu ordenador.

1. Entra a la carpeta de tu proyecto:
   ```bash
   cd ruta/hacia/tu/proyecto
   ```

2. Inicializa Git en esa carpeta (esto crea la carpeta oculta `.git`):
   ```bash
   git init
   ```

## Paso 3: Ignorar archivos innecesarios (Recomendado)
Antes de añadir los archivos, es una buena práctica crear un archivo `.gitignore` para excluir carpetas de configuración (como `/nbproject/`, `/node_modules/`, etc.).
1. Crea un archivo llamado `.gitignore` en la raíz de tu proyecto.
2. Escribe dentro las carpetas o archivos que no quieres subir.

## Paso 4: Preparar y guardar los cambios locales
Ahora le diremos a Git qué archivos queremos incluir en esta primera subida.

1. Añade todos los archivos de la carpeta al "área de preparación" (staging):
   ```bash
   git add .
   ```

2. Crea tu primer "punto de guardado" (commit) con un mensaje descriptivo:
   ```bash
   git commit -m "Commit inicial: Subida del proyecto base"
   ```

## Paso 5: Renombrar la rama principal
Actualmente, el estándar en GitHub es usar `main` como nombre de la rama principal (antiguamente era `master`). Es recomendable asegurarte de que tu rama se llame así:

```bash
git branch -M main
```
*(Nota: Si prefieres seguir usando `master` o `developer`, simplemente cambia `main` por ese nombre en este y los siguientes comandos).*

## Paso 6: Conectar con GitHub y subir el código
Finalmente, vinculamos la carpeta local con el repositorio en la nube y enviamos los archivos.

1. Conecta tu repositorio local con el de GitHub (pega la URL del Paso 1):
   ```bash
   git remote add origin https://github.com/tu-usuario/tu-proyecto.git
   ```

2. Sube tus archivos a GitHub y establece la conexión por defecto (`-u`):
   ```bash
   git push -u origin main
   ```

---

## Resumen rápido (Para copiar y pegar)
Una vez tengas la URL de tu repositorio en GitHub creado, estos son los comandos seguidos:

```bash
git init
git add .
git commit -m "Commit inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-proyecto.git
git push -u origin main
```