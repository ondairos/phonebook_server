# Phonebook App

This is a simple Node.js application that allows you to view, create, and delete phonebook entries. The phonebook entries are stored in a hardcoded list called data.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installing

To install the required dependencies, run the following command in the root directory of the project:
```
 npm install
```
Running the app

To run the app in development mode, use the following command:
```
npm run dev
```

This will start the app on port 3001. You can view the app by going to http://localhost:3001 in your web browser.
API Endpoints


The following API endpoints are available:

- GET /api/persons - returns a list of phonebook entries
- DELETE /api/persons/:id - deletes a phonebook entry with the specified id
- POST /api/persons - creates a new phonebook entry
- DELETE /api/persons/:id - deletes a phonebook entry with the specified id
- GET /info - returns information about the number of phonebook entries and the current date

## License

This project is licensed under the MIT License.
