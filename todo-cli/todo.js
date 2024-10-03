const todoList = () => {
    const all = [];
  
    const add = (todoItem) => {
      all.push(todoItem);
    };
  
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter(item => item.dueDate < today && !item.completed);
    };
  
    const dueToday = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter(item => item.dueDate === today);
    };
  
    const dueLater = () => {
      const today = new Date().toISOString().split("T")[0];
      return all.filter(item => item.dueDate > today);
    };
  
    const toDisplayableList = (list) => {
      return list.map(item => {
        const status = item.completed ? "[x]" : "[ ]";
        const displayDate = item.dueDate !== new Date().toISOString().split("T")[0]
          ? item.dueDate
          : "";
        return `${status} ${item.title} ${displayDate}`.trim();
      }).join("\n");
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    };
  };
  module.exports=todoList;
  
  