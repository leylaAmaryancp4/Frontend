import { useState } from  "react";


function AddToDoList({onAdd}){
const [text, setText] = useState("");
 function handleSubmit(e){
    e.preventDefault();
    if(!text.trim())return;
    onAdd(text.trim());
    setText("");
 }

 return(
    <form onSubmit={handleSubmit} className="form">
        <input
        className="task-input"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Enter task..."
        />
        <button type="submit"  className="add-btn">Add</button>
        </form>
 )
}

export default AddToDoList;