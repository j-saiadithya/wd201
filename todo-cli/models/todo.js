'use strict';
const { Model, DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list\n");

      const overdueTodos = await this.overdue();
      const dueTodayTodos = await this.dueToday();
      const dueLaterTodos = await this.dueLater();

      if (overdueTodos.length > 0) {
        console.log("Overdue");
        overdueTodos.forEach(todo => {
          console.log(todo.displayableString());
        });
        console.log(""); // Blank line after Overdue
      }

      if (dueTodayTodos.length > 0) {
        console.log("Due Today");
        dueTodayTodos.forEach(todo => {
          console.log(todo.displayableString());
        });
        console.log(""); // Blank line after Due Today
      }

      if (dueLaterTodos.length > 0) {
        console.log("Due Later");
        dueLaterTodos.forEach(todo => {
          console.log(todo.displayableString());
        });
      }
    }

    static async overdue() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today
          },
        }
      });
    }

    static async dueToday() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: today.toISOString().split('T')[0],
        }
      });
    }

    static async dueLater() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today
          },
        }
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().split('T')[0];

      if (this.completed && this.dueDate < today) {
        // Completed and overdue
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      } else if (this.dueDate === today) {
        // Due today
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        // Future or incomplete
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
