const personsRouter = require('express').Router()
const Person = require('../models/person')
const mongoose = require('mongoose')

// home route uses persons conroller
personsRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


// show person route uses persons conroller
personsRouter.get('/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).json({ error: 'person not found' })
            }
            response.json(person)
        }).catch(error => {
            console.log(error)
            response.status(500).redirect('/')
        })
})



// uses persons conroller
personsRouter.post('/', (request, response, next) => {
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

// Delete person route uses persons conroller
personsRouter.delete('/:id', (request, response, next) => {
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
// uses persons conroller
personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter