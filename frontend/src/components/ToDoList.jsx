import { useState } from "react";
import AddToDoList from "./AddToDoList";
import List from "./List";
import ToDoItem from "./ToDoItem";

function ToDoList(){
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");

    const handleAdd = (text) => {
        const exists = todos.some(
      (todo) => todo.text.toLowerCase() === text.toLowerCase()
    );
    if (exists) {
      setError("This task already exists!");
      return;
    }
    setTodos([{ text, completed: false }, ...todos]);
    setError("");
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

   

return (
    <div className="todo-container">
        <h1 className="title"> My To-Do List</h1>
        <AddToDoList onAdd={handleAdd} />
         {error && <p className="error">{error}</p>}
         <List todos={todos} onToggle={toggleComplete} />
    
        
    
    </div>
  );
}    
    
 export  default ToDoList;