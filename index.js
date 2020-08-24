const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json()) 
app.use(morgan('tiny'))

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


/*--------------------------------------DELETE Section-------------------------------------*/

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    console.log('Poisto onnistui!')
  })


/*----------------------------------------POST Section---------------------------------------*/

app.post('/api/persons', (request, response) => {
    

    const body = request.body


    if(!body.name) {
        return response.status(400).json({
            error:'Name is missing'
        })
    }


    if(!body.number) {
        return response.status(400).json({
            error:'Number is missing'
        })
    }
    

    if(persons.map(person => person.name === body.name)) {
        return response.status(400).json({
            error:'Given name is already in the phonebook, try another name'
        })
    }
    

    //Luo uuden id:n lisättävälle jannulle käyttäen min ja maxia välinä
    const generateId= () => {                       
    const newId = Math.round(Math.random() * (1000 - 10) + 10)
    return newId
    }   


    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    
    persons = persons.concat(person)


    console.log(person)
    response.json(person)
  })


/*----------------------------------------PORT Section---------------------------------------*/
  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })