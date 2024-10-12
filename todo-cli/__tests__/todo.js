// const todoList = require("../todo");
// const { all, markAsComplete, add, getOverdueItems, getDueTodayItems, getDueLaterItems } = todoList();

// describe("TodoList Test Suite", () => {
//   beforeEach(() => {
//     // Clear the todo list before each test
//     all().length = 0; // Ensure the list is empty before each test
//     add({
//       title: "Test todo 1",
//       completed: false,
//       dueDate: new Date().toISOString().slice(0, 10), // Today
//     });
//   });

//   test("Should add a new todo", () => {
//     const todoItemsCount = all().length; // Call all() to get the current count
//     add({
//       title: "Test todo 2",
//       completed: false,
//       dueDate: new Date().toISOString().slice(0, 10),
//     });
//     expect(all().length).toBe(todoItemsCount + 1); // Call all() again for the updated count
//   });

//   test("Should mark a todo as complete", () => {
//     expect(all()[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all()[0].completed).toBe(true);
//   });

//   test("Should retrieve overdue items", () => {
//     // Clear the current todos to avoid any leftover items from previous tests
//     all().length = 0;

//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     add({
//       title: "Overdue todo",
//       completed: false,
//       dueDate: yesterday.toISOString().slice(0, 10),
//     });

//     // Add another overdue todo for testing
//     const anotherOverdue = new Date();
//     anotherOverdue.setDate(anotherOverdue.getDate() - 2);
//     add({
//       title: "Another Overdue todo",
//       completed: false,
//       dueDate: anotherOverdue.toISOString().slice(0, 10),
//     });

//     // Log the current todos to see what is being stored
//     console.log("Current Todos:", all());

//     const overdueItems = getOverdueItems();
//     console.log("Overdue Items:", overdueItems); // Log the overdue items
//     expect(overdueItems.length).toBe(2); // Expecting two overdue items
//     expect(overdueItems[0].title).toBe("Overdue todo");
//   });

//   test("Should retrieve due today items", () => {
//     const todayItems = getDueTodayItems();
//     expect(todayItems.length).toBe(1); // Includes "Test todo 1"
//   });

//   test("Should retrieve due later items", () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     add({
//       title: "Due later todo",
//       completed: false,
//       dueDate: tomorrow.toISOString().slice(0, 10),
//     });
    
//     const dueLaterItems = getDueLaterItems();
//     expect(dueLaterItems.length).toBe(1);
//     expect(dueLaterItems[0].title).toBe("Due later todo");
//   });
// });
// //


// __tests__/todo.js
/* eslint-disable no-undef */
const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});