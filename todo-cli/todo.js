const todos = [];

function add(todo) {
  todos.push(todo);
}

function markAsComplete(index) {
  if (todos[index]) {
    todos[index].completed = true;
  }
}

function getOverdueItems() {
  const today = new Date();
  return todos.filter(todo => {
    const dueDate = new Date(todo.dueDate);
    return dueDate < today && !todo.completed;
  });
}

function getDueTodayItems() {
  const today = new Date().toISOString().slice(0, 10);
  return todos.filter(todo => todo.dueDate === today && !todo.completed);
}

function getDueLaterItems() {
  const today = new Date();
  return todos.filter(todo => {
    const dueDate = new Date(todo.dueDate);
    return dueDate > today && !todo.completed;
  });
}

function all() {
  return todos;
}

module.exports = () => ({
  all,
  markAsComplete,
  add,
  getOverdueItems,
  getDueTodayItems,
  getDueLaterItems,
});
