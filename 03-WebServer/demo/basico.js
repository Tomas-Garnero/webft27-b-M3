var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require("fs");

http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
	//Para crear un response empezamos escribiendo el header
	console.log(req.url);

	if (req.url === "/") {
		res.writeHead(200, { 'Content-Type':'text/plain' }) //Le ponemos el status code y algunos pair-values en el header
		res.end('Hola, Mundo!\n');

	} else if (req.url === "/home") {
		
		res.writeHead(200, { 'Content-Type':'application/json' })
		let obj = {
			nombre: "Tomas",
			apellido: "Garnero"
		}
		res.end(JSON.stringify(obj));

	} else if (req.url === "/api") {
		res.writeHead(200, { 'Content-Type':'text/plain' }) 
		res.end('ESTAMOS TRABAJANDO CON NUESTRO SERVER!\n');

	} else if (req.url === "/html") {
		res.writeHead(200, { 'Content-Type':'text/html' }) 
		let html = fs.readFileSync(__dirname +'/html/index.html');
		res.end(html);

	} else if (req.url === "/template") {
		res.writeHead(200, { 'Content-Type':'text/html' }) 
		var html = fs.readFileSync(__dirname +'/html/template.html', "utf8");
		let nombre = "Henry";
		html = html.replace("{nombre}", nombre);
		res.end(html);

	} else {
		res.writeHead(404, { 'Content-Type':'text/html' }) 
		var html = fs.readFileSync(__dirname +'/html/404.html', "utf8");
		let code = "404";
		html = html.replace("{code}", code);
		res.end(html);
	}



}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

// CLIENTE: GET -> localhost:1337

// NUMEROS:
// Los 200 son EXITO
// Los 300 son CONTENIDO MOVIDO A OTRO SITIO
// Los 400 son ERRORES DEL CLIENTE
// Los 500 son ERRORES DEL SERVIDOR