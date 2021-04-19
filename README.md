# Minesweeper Challenge - Uri Lukacher

Aplicación del clásico juego del Buscaminas desarrollada en Node.js

## Cómo utilizar la aplicación?

En el repositorio encontrarán una colección de [Postman](https://www.postman.com/), con un ejemplo de requests para invocar a los métodos de la API, junto a los environments correspondientes.

La API consta de dos métodos:
- **/games/create:** este método POST permite crear una nueva partida personalizada de buscaminas, especificando los siguientes párametros:
	- *height*: cantidad de filas que tendrá el tablero.
	- *width*: cantidad de columnas que tendrá el tablero.
	- *mines*: cantidad de minas.


- **/games/play**: este método POST permite realizar acciones sobre las celdas del tablero creado. Para esto, se debe ingresar los parámetros ***fila*** y ***columna***  indicando las coordenadas la celda en cuestión.
Además, se debe especificar el parámetro ***accion***  en base a las distintas funcionalidades del clásico juego:
	- "T" para clickear y destapar una celda.
	- "F" para marcar/desmarcar una celda con una bandera (flag).
	- "?" para marcar/desmarcar una celda con un signo de interrogación.

**Nota:** Las coordenadas del tablero comienzan desde el número 1 (uno).


### Levantar el server de forma local

1. Clonar el proyecto o descargarlo mediante .zip
2. Instalar [Node.js](https://nodejs.org/es/)
3. Navegar hacia la raíz del proyecto y ejecutar `npm i` para instalar las dependencias necesarias.
4. Ejecutar `node app` o bien `npm start` para levantar la aplicación en localhost (por defecto en el puerto 8080, se puede modificar mediante el archivo de configuración).
5. En Postman, seleccionar el *environment*"Desarrollo"


### Utilizar la aplicación desplegada en Cloud.
Para esto, en Postman se debe seleccionar el *environment* "Produccion". 
La aplicación está desplegada en  [https://minesweeper-challenge-uluka.herokuapp.com/](https://minesweeper-challenge-uluka.herokuapp.com/).
