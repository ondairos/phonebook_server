# Phonebook App

A phonebook application that allows you to create, read, update, and delete phonebook entries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js
* MongoDB
* Express.js
* dotenv

### Installing
1. Clone the repository
```
git clone https://github.com/username/phonebook-app.git
```

2. Install the dependencies
```
npm install
```

3. Create a .env file in the root directory of the project and add the following variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook
PORT=3001
```

4. Start the server
```
npm start
```

5. Visit [http://localhost:3001](http://localhost:3001) to see the application in action

### Routes
* **/** - Homepage
* **/api/persons** - Get all phonebook entries
* **/api/persons/:id** - Get a specific phonebook entry
* **/info** - Get information about the phonebook
* **/api/persons** - Add a new phonebook entry
* **/api/persons/:id** - Delete a phonebook entry

## Built With
* [Node.js](https://nodejs.org/) - The JavaScript runtime used
* [MongoDB](https://www.mongodb.com/) - The database used
* [Express.js](https://expressjs.com/) - The web framework used

## Authors
Ioannis Kantiloros

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
