require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { request } = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/personMongoDB')

/*
let persons = [
    {
        "name": "Arto Hellas",
        "number": " 040-4005134",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Antti Isotalo",
        "number": "+358-407009900",
        "id": 5
      },
      {
        "name": "Jaana Kemppainen",
        "number": "050-5210421",
        "id": 6
      },
      {
        "name": "Donald Fauntleroy  Duck",
        "number": "313-3133133",
        "id": 7
      },
      {
        "name": "Roope Ankka",
        "number": "055-6790321",
        "id": 8
      }
]


let pbLength = persons.length
let curDate = new Date()
*/


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
  /*
  app.get('/info', (req, res) => {
    res.send(`<div>
        <h2>The phonebook has ${pbLength} persons info</h2>
        <h3>${curDate}</h3>
        </div>`)
  })*/
  

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


/*----------------------------------------POST Section---------------------------------------*/

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
    
    const person = Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(saved => {
      response.json(saved.toJSON())
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
