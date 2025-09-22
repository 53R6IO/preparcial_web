1. Arquitectura de Solución
    En el preparcial se crearon 2 rutas: authors y crear (autores). Tambien existian los componentes AuthorForms, Footer y Header. Estos 2 ultimos, son elementos que van a ser recurrentes en el layout root. En la parte de lib se incluyen todo lo relacionado con el uso de estados y contexto en el archivo store, mientras que el archivo api solo contiene la conexion a la api de la cual va a consumir.

    Para agregar la funcionalidad de favoritos se creó un nuevo estado en store.tsx donde se inicializaba una lista de id de los autores que serían marcados como favoritos, además de las funciones que permitian el manejo de este estado. Por otra parte se añadió el botón favorito a la lista de autores y se hacia el llamado al estado al hacer click. Adicionalmente, se añadió un botón de direccionamiento a la ruta /favoritos en el header. Por último, se creó la ruta favoritos, que es una copia casi identica del listado de autores, pero haciendo un filtrado de auteres al buscar el id en la lista de favoritos del contexto.

2. Opción de Accesibilidad
    Se desarrolló la parte A, relaxionada a la accesibilidad. Para esto se añadieron distintos aria-label y aria-pressed a los botones de la lista de autores. Ademas de aria-invalid a los campos del formulario de creacion de autores.

3. Instrucciones de Ejecución

    Correr el back de la misma forma que se realiza en el preparcial.
    Instalar zustand y zod
