const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.MONGO_URI;

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]


const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const note = new Note({
            content: 'HTML is Easy',
            date: new Date(),
            important: true,
        })

        const note2 = new Note({
            content: "lorem  ipsum ok",
            date: new Date(),
            important: false,
        })

        return Promise.all([note.save(), note2.save()])
    })
    .then(() => {
        console.log('note saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))