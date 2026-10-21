# Guía Completa de Comandos y Flujos de Trabajo en Git

Esta guía abarca los procesos diarios de desarrollo, gestión de ramas, sincronización con el servidor remoto y trabajo colaborativo.

---

## 1. El Flujo de Trabajo Diario (Commit y Push)

El ciclo habitual cuando estás programando y quieres guardar y subir tus cambios.

*   **`git add <archivo>` o `git add .`**
    Prepara los archivos modificados para ser guardados. El punto (`.`) añade todos los cambios en la carpeta actual.
*   **`git commit -m "Mensaje descriptivo"`**
    Crea una "captura" o punto de guardado en tu historial local con los archivos preparados.
*   **`git push origin <nombre-rama>`**
    Sube tus *commits* locales al repositorio remoto (GitHub).
    *   *Variante:* `git push -u origin <nombre-rama>` (El `-u` establece la conexión por defecto para que la próxima vez solo tengas que escribir `git push`).
    *   *Variante:* `git push -f origin <nombre-rama>` (Fuerza la subida, sobrescribiendo el historial remoto. ¡Úsalo con precaución!).

---

## 2. Actualizar tu Código Local (Fetch y Pull)

Cuando trabajas en equipo o desde varios ordenadores, necesitas descargar los cambios que están en GitHub.

*   **`git fetch`**
    Descarga la información más reciente de GitHub (nuevas ramas, commits), pero **no modifica tus archivos locales**. Es útil para ver qué ha cambiado antes de aplicarlo.
*   **`git pull origin <nombre-rama>`**
    Es el equivalente a hacer un `git fetch` seguido de un `git merge`. Descarga los cambios de GitHub y **los fusiona automáticamente** con el código que tienes abierto en tu editor.

---

## 3. Unir Cambios (Merge)

Se utiliza para integrar los cambios de una rama secundaria (ej. `developer`) en una rama principal (ej. `master`).

1.  Sitúate en la rama que va a *recibir* los cambios:
    `git checkout master`
2.  Fusiona la rama deseada hacia tu rama actual:
    `git merge developer`
    *   *Nota:* Si hay modificaciones en las mismas líneas de código, Git te avisará de un "conflicto de fusión" (*merge conflict*) que deberás resolver manualmente en tu editor antes de poder terminar el merge.

---

## 4. Reescribir el Historial (Rebase)

El *rebase* es una alternativa avanzada al *merge*. En lugar de crear un commit de fusión uniendo dos ramas, mueve tu rama actual y la coloca "por encima" de la rama de destino. Deja un historial lineal y mucho más limpio.

1.  Asegúrate de estar en tu rama secundaria (ej. `mi-nueva-funcion`):
    `git checkout mi-nueva-funcion`
2.  Aplica el rebase sobre la rama principal actualizada:
    `git rebase master`
    *   *Ventaja:* El historial queda en una sola línea recta, sin las bifurcaciones visuales del *merge*.
    *   *Regla de oro:* **Nunca hagas rebase de commits que ya has subido a GitHub (públicos)**, úsalo solo para tu trabajo local antes de compartirlo.

---

## 5. El Pull Request (PR)

Un *Pull Request* no es un comando de la terminal, sino una función de plataformas como GitHub para proponer que tus cambios sean revisados antes de unirse a la rama principal.

**Flujo para crear un Pull Request:**
1.  Crea una rama nueva para tu tarea: `git checkout -b mi-tarea`
2.  Haz tus cambios, *commits* y súbelos: `git push -u origin mi-tarea`
3.  Ve a la página de tu repositorio en **GitHub**.
4.  Aparecerá un botón verde que dice **"Compare & pull request"**. Haz clic en él.
5.  Añade un título y una descripción de lo que has programado.
6.  Haz clic en **"Create pull request"**.
7.  Ahora, tú o tu equipo podéis revisar el código, hacer comentarios y, finalmente, pulsar el botón "Merge pull request" en la web para integrar el código en la rama principal (`master` o `main`).