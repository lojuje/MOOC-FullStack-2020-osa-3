const mongoose = require('mongoose')



const password = process.argv[2]
//Omat constit nimelle ja numerolle
const name = process.argv[3]
const number = process.argv[4]


const url =
  `mongodb+srv://fullstack2020:${password}@cluster0.tcl4v.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


/*------------------------------PERSON osat------------------------------------*/


const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })


const Person = mongoose.model('Person', personSchema)


const newPerson = new Person({
    name:name,
    number:number
})


/*------------------------------Ehtoja-----------------------------------------*/


if (process.argv.length < 3) {
    console.log('Give password as argument, to add person also give the name and number')
    process.exit(1)
} else if (process.argv.length === 3) { // Näyttää puhelinluettelon ihmiset ja numerot
    console.log("Phonebook:")           // kun annetaan 'node mongo.js salasana'
    Person
    .find({})
    .then(persons => {
        persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) { //Jos argumentteja on 5
    newPerson.save().then(() => {       //Lisätään henkilö numeroineen luetteloon
        console.log(`Added ${name} with number ${number} to the phonebook`)
        mongoose.connection.close()
    })
} 

