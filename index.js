require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { request } = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/PersonMongoDB')


var curDate = new Date()


/*---------------------------------------MORGAN Section--------------------------------------*/


morgan.token('type', (request, response) => {
  if (request.method === "POST"){
    var vastaus = JSON.stringify(request.body)
    return vastaus
  } else {
    return console.log('Ei käytetty POSTia')
  }
})

 
//app.use(morgan('tiny'))
app.use( morgan(':method :url :status :res[content-length] - :response-time ms :type'))


/*----------------------------------------GET Section----------------------------------------*/


//Mitä index.js:n kautta näkyy
app.get('/', (request, response) => {
    res.send('<h1>Hello, this is a phonebook!</h1>')
  })


  //Antaa infon
  app.get('/info', (request, response) => {
    Person.find({}).then(result => {
      response.send(`<div>
      <h2>The phonebook has ${result.map(person => person.toJSON()).length} persons info</h2>
      <h3>${curDate}</h3>
      </div>`)})
  })
  

  //Antaa kaikki henkilöt
  app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
      response.json(persons.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})


  //Yksittäisen näyttö
  app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
        console.log("Löytyi!")
      } else {
        response.status(404).end()
        console.log("Ei löytynyt!")
      }
    })
    .catch(error => next(error))
  })


/*--------------------------------------DELETE Section-------------------------------------*/

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
      console.log('Poisto onnistui!')
    })
    .catch(error => next(error))
  })


/*----------------------------------------POST JA PUT Section---------------------------------------*/

app.post('/api/persons', (request, response, next) => {
    
  const body = request.body

  if(body.name === undefined) {
    return response.status(400).json({
        error:'Name is missing'
    })
   }
  if(!body.number) {
    return response.status(400).json({
        error:'Number is missing'
    })
  }
  
  const person = new Person({
      name: body.name,
      number: body.number,
  })

  person.save()
        .then(saved => saved.toJSON())
        .then(savedAndFormatted => {
          response.json(savedAndFormatted)
        })
  .catch(error => next(error))
})



app.put('/api/persons/:id', (request, response, next) => {

const body = request.body

const person = {
  name:body.name,
  number: body.number
}

Person.findByIdAndUpdate(request.params.id, person, {new : true })
.then(updated => {
  response.json(updated.toJSON())
  console.log("Päivitys onnistui!")
})
.catch(error => next(error))
})


/*----------------------------------------ERROR JA ENDPOINT Section---------------------------------------*/  

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
}

  next(error)
}

// virheellisten pyyntöjen käsittely
app.use(errorHandler)


/*----------------------------------------PORT Section---------------------------------------*/
  

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
