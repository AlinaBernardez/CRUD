const express = require('express');
const app = express();
const usuarios = require('./users')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
    // res.send(`
    // <h1>Personajes Street Fighter:</h1>
    // <ul>
    //     ${usuarios.map(usuario => `<li>Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | País: ${usuario.lugarProcedencia}</li>`)
    // .join('')}
    // </ul>
    // <h3>Añadir jugador</h3>
    // <form action='/usuarios' method='post'>
    //     <label for='nombre' />
    //     <input type='text' id='nombre' name='nombre' required placeholder='Nombre' />
    //     <label for='edad' />
    //     <input type='text' id='edad' name='edad' required placeholder='Edad' />
    //     <label for='pais' />
    //     <input type='text' id='pais' name='pais' required placeholder='Lugar procedencia' />
    //     <button type='submit'>Crear</button>
    // </form>
    // <h3>Buscar jugador</h3>
    // <form action='/usuarios/' method='get'>
    //     <label />
    //     <input type='text' id='nombre' name='nombre' required />
    //     <button type='submit'>Buscar</button>
    // </form>
    // <a href='/usuarios'>Usuarios json<a>
    // `)
});

app.post('/usuarios', (req, res) => {
    const nuevo = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.pais
    };
    usuarios.push(nuevo);
    res.json(usuarios);
});

app.get('/usuarios/:nombre', (req, res) => {
    const {nombre} = req.params
    let resultados = usuarios.filter(user => user.nombre == nombre)
    if(resultados.length > 0) {
        res.status(200).json(resultados)
    }
    else {
        res.status(404).json({message: 'Jugador no encontrado!!'})
    }
});

app.put('/usuarios/:nombre', (req, res) => {
    const {nombre} = req.params
    const toChange = usuarios.find(usuario => usuario.nombre == nombre)
    if(!toChange) {
        res.status(404).json({message: 'Jugador no encontrado!!'})
    }
    toChange.edad = req.body.edad
    toChange.lugarProcedencia = req.body.pais
    res.json(usuarios)
});

app.delete('/usuarios/:nombre', (req, res) => {
    const {nombre} = req.params
    const nameIndex = usuarios.findIndex(user =>  user.nombre == nombre)
    if(nameIndex != -1) {
        usuarios.splice(nameIndex, 1)
        res.json(usuarios)
    }
    else {
        res.status(404).json({message: 'Jugador no encontrado!!'})
    }
});

app.listen(5000, () => {
    console.log('Express listening http://localhost:5000')
});