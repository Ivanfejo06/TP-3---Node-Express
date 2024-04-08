import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import axios from "axios";
import https from "https";
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors

const app = express();
const port = 3000;
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

app.get("/", (req, res) => {
    res.status(200).send('¡Ya estoy respondiendo!');
});

app.get("/saludar/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).send(`¡Hola, ${nombre}!`);
});

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
    const { ano, mes, dia } = req.params;
    const fecha = new Date(`${ano}-${mes}-${dia}`);
    if(Date.parse(fecha)){
        res.status(200).send(`la fecha es ${fecha}`);
    }
    else{
        res.status(400).send(`Fecha incorrecta`);
    }
});

//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})