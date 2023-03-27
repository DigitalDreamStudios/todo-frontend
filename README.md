# Todo Web Application and API

This is a web application and API for managing tasks, or "todos". It allows users to create, edit, delete and mark tasks as completed.

## Features

- Create a new task
- Edit an existing task
- Delete a task
- Mark a task as completed
- View all tasks
- View completed tasks
- View active tasks

## API Endpoints

- `GET /todos/getAll` - Retrieve all todos
- `GET /todos/getOne?id=` - Retrieve a specific todo
- `POST /todos/create` - Create a new todo
- `PUT /todos/update?id=` - Update an existing todo
- `DELETE /todos/delete?id=` - Delete a todo

## Technologies Used

- Node.js
- Nest.js
- MongoDB
- Mongoose
- React.js

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the server using `npm start`
4. Navigate to `localhost:3000` to view the web application
5. Use API endpoints to interact with the data

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
