import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import axios from "axios";
import https from "https";
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import ValidacionesHelper from './models/validacionesHelper.js'

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

//Modulo matematica.js

app.get("/matematica/sumar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = sumar(parseFloat(n1), parseFloat(n2));
  res.status(200).send(`El resultado de la suma es: ${resultado}`);
});

app.get("/matematica/restar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = restar(parseFloat(n1), parseFloat(n2));
  res.status(200).send(`El resultado de la resta es: ${resultado}`);
});

app.get("/matematica/multiplicar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = multiplicar(parseFloat(n1), parseFloat(n2));
  res.status(200).send(`El resultado de la multiplicacion es: ${resultado}`);
});

app.get("/matematica/dividir", (req, res) => {
  const { n1, n2 } = req.query;
  if(n2 != 0){
    const resultado = dividir(n1, n2);
    res.status(200).send(`El resultado de la resta es: ${resultado}`)
  }
  else{
    res.status(200).send(`El divisor no puede ser 0!`)
  }
});

//Modulos omdb

app.get("/omdb/searchbypage", async (req, res) => {
  const { search, p } = req.query;
  try {
    const result = await OMDBSearchByPage(search, p);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/omdb/searchcomplete", async (req, res) => {
  const { search } = req.query;
  try {
    const result = await OMDBSearchComplete(search);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/omdb/getbyomdbid", async (req, res) => {
  const { imdbID } = req.query;
  try {
    const result = await OMDBGetByImdbID(imdbID);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

//Modulos alumno

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

app.get('/alumno', (req, res) => {
  res.status(200).json(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
  const alumno = alumnosArray.find(alumno => alumno.DNI === req.params.dni);
  if (alumno) {
    res.status(200).json(alumno);
  } else {
    res.status(404).json({ message: 'Alumno no encontrado' });
  }
});

app.post('/alumnos', (req, res) => {
  const { nombre, dni, edad } = req.body;
  const nuevoAlumno = new Alumno(nombre, dni, edad);
  alumnosArray.push(nuevoAlumno);
  res.status(201).json({ message: 'Alumno creado', alumno: nuevoAlumno });
});

app.delete('/alumnos', (req, res) => {
  const { dni } = req.body;
  const alumnoIndex = alumnosArray.findIndex(alumno => alumno.DNI === dni);
  if (alumnoIndex !== -1) {
    alumnosArray.splice(alumnoIndex, 1);
    res.status(200).json({ message: 'Alumno eliminado' });
  } else {
    res.status(404).json({ message: 'Alumno no encontrado' });
  }
});

//
// Inicio el Server y lo pongo a escuchar.
//

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get('/omdb/searchbypage', async (req, res) => {
let search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
let p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);

let returnObject = await OMDBSearchComplete(p);
res.status(200).send(returnObject);

})
