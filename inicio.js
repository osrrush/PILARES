const fs = require(fs);
const archivo = 'prueba.txt';

var contenido = "Primera linea";
fs.writeFile(archivo,contenido);
console.log("Contenido escrito");

fs.appendFile(archivo,"Segunda linea");
console.log("Contenido escrito");
