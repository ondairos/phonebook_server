const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

const mongodbUrl = process.env.MONGO_URI;

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))


// assign as let so you can change it.
let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// home route
app.get('/', (request, response) => {
    response.end("<h1>Phonebook App</h1>")
})

// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.
app.get('/api/persons', (request, response) => {
    response.json(data)
})


// show person route
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = data.find(element => {
        return element.id === id
    })

    if (person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

// info route
app.get('/info', (request, response) => {
    number_persons = data.length
    date = new Date();
    response.end(`<p>Phonebook has info for ${number_persons} people!</p><p>The date is: ${date}.</p>`)
})


// add person route
const generateId = () => {
    const maxId = data.length > 0 ? Math.max(...data.map(element => element.id)) : 0;
    return maxId
}
app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body);
    let testPersonName = data.map(element => element.name == body.name)
    console.log(testPersonName);

    // no body error
    if (testPersonName.some(element => element === true)) {
        return response.status(400).json({ error: "name must be unique!" })
    }

    // Check if number is an empty string
    if (body.number === "") {
        return response.status(400).json({ error: "You must enter a number!" });
    }

    // create person object
    const person = {
        id: generateId,
        name: body.name,
        number: body.number
    }

    // add person to data
    data = data.concat(person);
    response.json(person)
})

// Delete person route
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const deletedPerson = data.find(element => element.id === id)
    console.log(`Deleted person with id: ${deletedPerson.id}`);

    data = data.filter(element => element.id !== id)
    response.status(204).end()
})

// unknown route middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// usage of unknownEndpoint middleware function
app.use(unknownEndpoint)

// const PORT = process.env.PORT || 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})