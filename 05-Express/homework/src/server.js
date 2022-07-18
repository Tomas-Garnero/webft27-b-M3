// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests

// IMPORTANTE!! Si vamos a trabajar con req.body, es decir vamos a recibir informacion por body, NO NOS PODEMOS OLVIDAR
// DE ACTIVAR EL MIDDLEWARE de express.json() !
server.use(express.json());

let id = 1;

// TODO: your code to handle requests
server.post("/posts", (req, res) => {
    const {author, title, contents} = req.body; // destructuring
    // Otra forma podria haber sido
    // let author = req.body.author;
    // let title = req.body.title;
    // let contents = req.body.contents;
    if (!author || !title || !contents) {
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {
        author, title, contents, id: id++
    };
    posts.push(post);
    res.status(200).json(post);
});

server.post("/posts/author/:author", (req, res) => {
    // req.params -> OBJETO!!
    // let author = req.params.author
    let {author} = req.params;
    // let title = req.body.title
    // let contents = req.body.contents 
    let {title, contents} = req.body;
    if (!author || !title || !contents) {
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {
        author, title, contents, id: id++
    };
    posts.push(post);
    res.status(200).json(post);
});

server.get("/posts", (req, res) => {
    let {term} = req.query;
    // si term no vino por query, term = undefined
    // si term vino por query, term = valor qye se le haya pasado
    if (term) {
        const term_posts = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
        return res.json(term_posts);
    }
    return res.json(posts); // por default esto manda un status 200
});

server.get("/posts/:author", (req, res) => {
    let {author} = req.params;
    const author_posts = posts.filter(p => p.author === author);
    if (author_posts.length > 0) {
        return res.json(author_posts);
    } else {
        return res // este return no es necesario ya que es el final de la funcion
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"});
    }
});

server.get("/posts/:author/:title", (req, res) => {
    let {author, title} = req.params;
    if(author && title) {
        const author_title_posts = posts.filter(p => p.author === author && p.title === title);
        if (author_title_posts.length > 0) {
            res.json(author_title_posts);
        } else {
            res 
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"});
        }
    } else {
        res 
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
});

server.put("/posts", (req, res) => {
    let {id, title, contents} = req.body;
    if (id && title && contents) {
        // find -> devuelve el primer elemento que coincida  y como el ID es unico, deberia encontrar un unico elemento
        // con el id pasado por el body. Por lo tanto puedo usar find ya que me va a devolver lo q espero
        let post = posts.find(p => p.id === parseInt(id));
        if (post) {
            post.title = title;
            post.contents = contents;
            res.json(post);
        } else {
            res 
            .status(STATUS_USER_ERROR)
            .json({error: "No se encuentra el ID necesario"});
        }
    } else {
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }
});

server.delete("/posts", (req, res) => {
    let {id} = req.body;
    let post = posts.find(p => p.id === parseInt(id));
    if (!id || !post) {
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para eliminar el Post"});
    }
    posts = posts.filter(p => p.id !== parseInt(id));
    res.json({success: true});
});

server.delete("/author", (req, res) => {
    let {author} = req.body;
    const author_found = posts.find(p => p.author === author);
    if (!author || !author_found) {
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe el autor indicado"});
    }
    let delete_author = [];
    // Opcion 1
    // delete_author = posts.filter(p => p.author === author);
    // posts = posts.filter(p => p.author !== author);

    // Opcion 2
    posts = posts.filter(p => {
        if (p.author !== author) {
            return true;
        } else {
            delete_author.push(p);
        }
    });
    return res.json(delete_author);
});

module.exports = { posts, server };
