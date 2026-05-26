import { useEffect, useState } from "react";
 
function Timer({onDelete, onDuplicate }) {
    const [count, setCount] = useState(()=>Math.floor(Math.random() * 20) + 10)
 const [paused, setPaused] = useState(false);

 useEffect(()=>{
    if(paused) return;

    const interval = setInterval(()=>{
        setCount(prev => {
            if(prev === 0){
              clearInterval(interval);
              return 0;
            }
            return prev - 1;  
        })
    }, 1000)

    // cleanup

    return()=>clearInterval(interval);

 }, [paused]);

return (

    <div className="buttonContainer">
      <h3>
        <span className="seconds">{count}</span>
        </h3>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onDuplicate}>Duplicate</button>
      <button onClick={() => setPaused(!paused)}>
        {paused ? "Continue" : "Pause"}
      </button>
    </div>
    
  );
}

export default Timer;
