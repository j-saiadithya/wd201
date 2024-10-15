const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Hello World");
});

// GET all Todos
app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll(); // Query the database for all Todos
    return response.json(todos); // Respond with the list of Todos
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET a single Todo by ID
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      return response.json(todo);
    } else {
      return response.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// POST a new Todo
app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.create({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.status(201).json(todo); // Return the created Todo with a 201 status
  } catch (error) {
    console.log(error);
    return response.status(422).json({ error: 'Unable to create todo' });
  }
});

// PUT to mark a Todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      todo.completed = true; // Mark as completed
      await todo.save(); // Save changes
      return response.json(todo); // Return the updated Todo
    } else {
      return response.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// DELETE a Todo by ID
app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const result = await Todo.destroy({ where: { id: request.params.id } });
    if (result) {
      return response.json(true); // Successfully deleted
    } else {
      return response.status(404).json(false); // Todo not found
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = app;
