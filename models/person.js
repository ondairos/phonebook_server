const { default: mongoose, mongo } = require('mongoose');
// mongoose init
const mongodbUrl = process.env.MONGO_URI;

mongoose.connect(mongodbUrl)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

// set the schema to not show the __v and to show the id value as string
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('Person', personSchema)
