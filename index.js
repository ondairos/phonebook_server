// app contains: db connection,all middleware(cors,static-build, jsonParser, logger, unkwnownEndpoint,errorhandler),personsRouter
const app = require('./app')
const http = require('http')
// config contains running port and mongodb uri
const config = require('./utils/config')
// logger contains console log,error
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})