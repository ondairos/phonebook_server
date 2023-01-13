const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
// mongo db
const Person = require('./models/person')


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())

app.use(requestLogger)

// cross origin for frontend-backend
app.use(cors())

app.use(express.static('build'))

// error handler middleware
const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


// this has to be the last loaded middleware.
app.use(errorHandler)

// assign as let so you can change it.
// let data = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

// home route
app.get('/', (request, response) => {
    response.end('<h1>Phonebook App Server</h1>')
})

// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


// show person route
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (!person) {
            return response.status(404).json({ error: 'person not found' })
        }
        response.json(person)
    }).catch(error => {
        console.log(error)
        response.status(500).redirect('/api/persons')
    })
})

// info route
app.get('/info', (request, response) => {
    Person.countDocuments().then(count => {
        let numberOfEntries = count
        // eslint-disable-next-line no-undef
        date = new Date()
        // eslint-disable-next-line no-undef
        response.end(`<p>Phonebook has info for ${numberOfEntries} people!</p><p>The date is: ${date}.</p>`)
    }).catch(err => console.log(err))

})


// add person route
// const generateId = () => {
//     const maxId = data.length > 0 ? Math.max(...data.map(element => element.id)) : 0;
//     return maxId
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name is missing!' })
    } else if (body.number === undefined) {
        return response.status(400).json({ error: 'number is missing!' })
    }

    // create person object
    const person = new Person({
        name: body.name,
        number: body.number
    })

    // add person to mongo db
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            response.status(400).json({ error: error.message })
        }
        else {
            next(error)
        }
    })
})

// Delete person route
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    // findByIdAndDelete from mongoose to delete
    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return response.status(404).json({ error: 'Person not found' })
            }
            console.log(`Deleted person with id: ${deletedPerson._id}`)
            response.status(204).end()
        })
        .catch(error => {
            // response.status(500).json({ error: error.message })
            next(error)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    // find id of the document(person) we want to change
    const id = request.params.id
    const updatedNumber = request.body.number
    // add validators
    Person.findByIdAndUpdate(id, { $set: { number: updatedNumber } }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        }).catch(error => {
            next(error)
        })
})

// unknown route middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// usage of unknownEndpoint middleware function
app.use(unknownEndpoint)




// const PORT = process.env.PORT || 3001
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})