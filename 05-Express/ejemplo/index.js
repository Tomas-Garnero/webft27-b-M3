var express = require("express");
var logger = require("morgan");
var app = express();

var routes = require("./routes.js");

// lo vamos a usar para definir y establecer middlewares
// request -> middleware -> next() -> ahora va a buscar la ruta que le corresponde
app.use("/", function (req, res, next){
    console.log("Hicieron una Request a " + req.url);
    next(); // continue, avanza hacia el proximo paso
});

app.use(logger("dev"));
app.use(express.json());
// -> request -> middleware -> ohh tengo "/about" -> lo va a buscar al archivo pasado por parametro
app.use("/about", routes); 

app.get("/", function(req, res){
    res.send("Hello!")
});

app.get("/home", function(req, res){
    res.send("Home")
});

app.get("/api", function(req, res){
    var obj = {
        nombre: "prueba",
        framework: "express",
        ventaja: "serializó por nosotros"
    };
    res.json(obj);
});

// significa que el elemento que antecede al signo de pregunta, puede o no pertenecer a la ruta. Por lo tanto si en este 
// caso, accedo a /abcd o /acd en ambos casos voy a estar devolviendo /ab?cd
app.get("/ab?cd", function(req, res){
    res.send("ab?cd")
});

// /abcd /abbcd /abbbbcd
// significa que el elemento que antecende al signo de pregunta, debe aparecer como minimo una vez, y puede aparecer
// tantas veces como quiera
app.get("/ab*cd", function (req, res) {
    res.send("ab*cd");
});

// Se puede usar funcion flecha
app.get("/welcome/:name/:lastname", (req, res) => {
    console.log(req.params.name); // {name: "Tomas", lastname: "Garnero"}
    // let name = req.params.name;
    let {name, lastname} = req.params;
    res.send(`Hola ${name} ${lastname}`);
});

// para pasar info por url con query en este caso seria: /nombre?name=Tomas&lastname=Garnero&age=27
app.get("/nombre", (req, res) => {
    let {name, lastname, age} = req.query;
    if (name && lastname && age){
        res.send(`${name} ${lastname} is ${age}`)
    } else {
        res.send("Info missing");
    }
});

app.post("/", function(req, res){
    console.log(req.body);
    let {name, lastname} = req.body;
    res.send("Done");
});

app.put("/:id", function(req, res){
    res.send(req.params.id);
});



app.listen(3000);