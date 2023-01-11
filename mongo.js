const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.MONGO_URI;

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2] //third argument password
const name = process.argv[3] //fourth argument name
const number = process.argv[4] //fifth argument number


const personSchema = new mongoose.Schema({
    password: String,
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const person = new Person({
            password: password,
            name: name,
            number: number,
        })
        return person.save()
    })
    .then((res) => {
        console.log(`${res.name} saved to the database!`)
        return Person.find({});

    }).then(result => {
        if (process.argv.length == 3) {
            console.log('Phonebook: ');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            });
        } else {
            console.log('Thank you');
        }
        mongoose.connection.close()
    })
    .catch((err) => console.log(err))


// mongoose
//     .connect(url)
//     .then((result) => {
//         console.log('connected')
//         return Note.find({ important: true });
//     })
//     .then(result => {
//         if (result.length > 0) {
//             result.forEach(note => {
//                 console.log(note)
//             });
//         } else {
//             console.log('No notes found');
//         }
//         mongoose.connection.close()
//     })
//     .catch((err) => console.log(err))