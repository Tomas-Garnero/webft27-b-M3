var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.send("Hola, estoy en /About/ ");
});

router.get("/martina", (req, res) => {
    res.send("Martina");
});

router.get("/:id", (req, res) => {
    res.send(req.params.id);
});

module.exports = router;

// /About
// /About/martina
// /About/5