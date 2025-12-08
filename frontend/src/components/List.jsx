import ToDoItem from "./ToDoItem";

function List({todos, onToggle}){
    return (
        <ul className="todo-list">
            {todos.map((todo, index) =>(
                <ToDoItem
                key={index}
                todo={todo}
                onToggle={()=> onToggle(index)}
                />
            ))}
        </ul>
    );
}
export default List;