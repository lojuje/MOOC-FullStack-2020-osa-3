const express = require('express')
const app = express()

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


/*----------------------------------------GET Section----------------------------------------*/


//Mitä index.js:n kautta näkyy
app.get('/', (req, res) => {
    res.send('<h1>Hello, this is a phonebook!</h1>')
  })


  //Antaa infon
  app.get('/info', (req, res) => {
    res.send(`<div>
        <h2>The phonebook has ${pbLength} persons info</h2>
        <h3>${curDate}</h3>
        </div>`)
  })
  

  //Antaa kaikki henkilöt
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })


  //Yksittäisen näyttö
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
        console.log('Löytyi!') //Näyyy cmd:ssä
      } else {
        response.status(404).end()
        console.log('Ei löytynyt!') //Näyyy cmd:ssä
      }
  })


/*----------------------------------------PORT Section---------------------------------------*/
  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })