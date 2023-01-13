/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
const mongodbUrl = process.env.MONGO_URI

module.exports = {
    mongodbUrl,
    PORT
}