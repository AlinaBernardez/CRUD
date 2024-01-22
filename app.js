const express = require('express');
const app = express();
const usuarios = require('./users')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
    <h1>Personajes Street Fighter:</h1>
    <ul>
        ${usuarios.map(usuario => `<li>Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | País: ${usuario.lugarProcedencia}</li>`)
    .join('')}
    </ul>
    <h3>Añadir jugador</h3>
    <form action='/usuarios' method='post'>
        <label for='nombre' />
        <input type='text' id='nombre' name='nombre' required placeholder='Nombre' />
        <label for='edad' />
        <input type='text' id='edad' name='edad' required placeholder='Edad' />
        <label for='pais' />
        <input type='text' id='pais' name='pais' required placeholder='Lugar procedencia' />
        <button type='submit'>Crear</button>
    </form>
    <h3>Buscar jugador</h3>
    <form action='/usuarios/' method='get'>
        <label />
        <input type='text' id='nombre' name='nombre' required />
        <button type='submit'>Buscar</button>
    </form>
    <a href='/usuarios'>Usuarios json<a>
    `)
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.post('/usuarios', (req, res) => {
    const nuevo = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.pais
    };
    usuarios.push(nuevo);
    res.redirect('/');
})

app.get('/usuarios/:nombre', (req, res) => {
    const {nombre} = req.params
    let resultados = usuarios.filter(user => user.nombre == nombre)
    console.log(resultados)
    if(resultados) {
        res.send(`
        <div>
            ${resultados.map(result => {
            `<p>${result.nombre}</p>
            <p>${result.edad}</p>
            <p>${result.lugarProcedencia}</p>`
            })}
        </div>
    `)
    }
    else {
        res.send(`
        <p>Ese jugador no existe</p>
        `)
    }

})

app.listen(3000, () => {
    console.log('Express listening http://localhost:3000')
})