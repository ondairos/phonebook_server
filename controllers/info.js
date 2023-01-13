const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (request, response) => {
    Person.countDocuments().then(count => {
        let numberOfEntries = count
        // eslint-disable-next-line no-undef
        date = new Date()
        // eslint-disable-next-line no-undef
        response.end(`<p>Phonebook has info for ${numberOfEntries} people!</p><p>The date is: ${date}.</p>`)
    }).catch(err => console.log(err))
})

module.exports = infoRouter
