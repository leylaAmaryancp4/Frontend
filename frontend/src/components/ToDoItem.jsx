function ToDoItem({todo, onToggle}){
    return (
        <li className={todo.completed ? "completed" : "" }>
            <span>{todo.text}</span>
            <button onClick={onToggle} className="complete-btn">
                {todo.completed ? "undo" : "Complete"}
                </button>
        </li>

    );
}

export default ToDoItem;