import { useState } from "react";
import Timer from  "./Timer"
let idCounter = 1;

  function Dashboard(){
    const [timers, setTimers] = useState([]);

    const createTimer = ()=>{
setTimers([...timers,{id:idCounter++}])
    }

    const deleteTimer  = (id)=>{
setTimers(timers.filter(t => t.id !== id));
    }

    const duplicateTimer = (id)=>{
        setTimers([...timers,{id: idCounter++}]);
    };

    return(
        <div>
            <button onClick={createTimer}> Create Timer</button>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}></div>
            {timers.map(t=>(
<Timer key={t.id}
onDelete={()=> deleteTimer(t.id)}
onDuplicate={()=>duplicateTimer(t.id)}
/>
            )

            )}
        </div>
    )
}

export default Dashboard;