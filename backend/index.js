const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())//Convierte los datos del objeto 'request' a javascript y los inserta en el body, para que se puedan leer dentro de un controlador
app.use(cors())//Middleware que permite que el servidor acepte solicitudes de cualquier origen
app.use(express.static('dist'))//Middleware que permite al backend cargar archivos estáticos (HTML, CSS, JS), en este caso el contenido de la carpeta dist


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

//MIDDLEWARE
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)//Middleware que muestra en console el método, la ruta y el body de la petición

//RUTAS (ENDPOINTS)
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if(note){
    response.json(note)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'Falta contenido, error en la ruta POST "/api/notes"' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)//Middleware que se ejecuta cuando no se encuentra la ruta solicitada



//FUNCIONES
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})