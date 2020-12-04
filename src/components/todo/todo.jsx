import React, { useState } from "react"
import "./todo.css"

const Todo = ({todo, complete, setTodos, index,todos,setText}) => {

    const [completeLocal,setCompleteLocal] = useState(complete)
    const[textLocal,setTextLocal] = useState(todo)
    const [edit,setEdit] = useState("readOnly")

    const handleDelete = () => {
        let temp = todos
        if(!temp[index].complete){
          temp[index].complete = true
          setTodos(temp)
          setCompleteLocal(true)  
          console.log("Se cambio");
        }else{
          temp[index].complete = false
          setTodos(temp)
          setCompleteLocal(false)  
          console.log("Se cambio");
        }
        
    }

    const handleClick = () => {
        if(completeLocal) return alert("La tarea no se puede editar porque ya se completó")
        if(edit !== "readOnly"){
            let temp = todos
            temp[index].text = textLocal
            setTodos(temp)
            setEdit("readOnly")
        }else{
            setEdit("")
        }
    }       

    return(
        <div className="contentTodo">
            <div className="contentInput">
                 {completeLocal ? <s className="inputTachado">{textLocal}</s> : <input style={{width:"100%",height:"33px"}} value={textLocal} readOnly={edit} onChange={(e) => setTextLocal(e.target.value)}/>}
            </div>
                
         
            <button className="btn btn-primary" style={{marginLeft:"5px"}} onClick = {handleClick}>{edit?"Edit":"Save"}</button>
            <button className="btn btn-danger" onClick = {handleDelete}>X</button>
        </div>
    );
}

export default Todo;