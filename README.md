# U09-P01: Comics y personajes de Marvel

![imagen_previa.PNG](https://github.com/Ayoamaro/api_marvel.github.io/blob/master/img/imagen_previa.PNG?raw=true)

## Requisitos mínimos
El sistema muestra inicialmente:
* una lista con los comics con información como:
    * portada: thumbnail proporcionado por la API
    * título
    * descripción: inicialmente abreviada, se mostrarán los primeros 20 caracteres y un
enlace "ver más" que mostrará el resto de la descripción. Si se ve la descripción
completa, se mostrará un enlace "ver menos" que mostrará la descripción de forma
abreviada.
* una lista con los personajes con:
    * imagen del personaje
    * nombre del personaje

La información se ha de obtener de manera asíncrona de la [API de Marvel](https://developer.marvel.com).

Se debe tener un filtro para poder buscar por comic o por personaje. A medida que el usuario
escriba un caracter se irán mostrando los comics o personajes que cumplan el criterio.

Para mostrar los resultados, se dispondrá de una paginación de forma que aparecerán como
mucho 10 comics o personajes en cada página. Se tendrá al menos las opciones para ir a: la
primera página, la página anterior, la página siguiente y la última página. Para ello te puede servir
de ayuda el siguiente plugin: [simplePagination.js](http://flaviusmatis.github.io/simplePagination.js/)

Cuando el usuario selecciona un comic o un personaje, el sistema le muestra la información de
ese comic o personaje.

El proyecto de estar publicado en github pages o firebase.

Debe disponer de un spinner funcional que se muestre cuando se realizan peticiones asíncronas.

Se implementa alguna funcionalidad extra que implique transferencia de datos asíncrona. Dicha
funcionalidad debe ser descrita en un documento de texto para que pueda ser evaluada

## Ejecución
1. Descargar el [Proyecto](https://bit.ly/2TA514Q) y descomprimir.
2. Abrir con [Visual Studio Code](https://code.visualstudio.com) o algún editor de código.
3. Descargar el [Live Server](https://bit.ly/3elOzNx).
3. Abrir el **index.html** y ejecutarlo con la opción "Go Live".

## Hecho con
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) - **55,99%**
* [CSS3](https://developer.mozilla.org/es/docs/Archive/CSS3) - **22,18%**
* [HTML5](https://developer.mozilla.org/es/docs/HTML/HTML5) - **21,83%**
