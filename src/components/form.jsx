import React,{useState} from "react"
import Todo from "./todo/todo"
import "./form.css"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
  

const Form = () => {

    const [text,setText] = useState("");
    const [todos,setTodos] = useState([]);
    const [contador,setContador] = useState(0)

    const handleSetTodo = (e) => {
       e.preventDefault()
       if(text){
         setTodos([
            ...todos,
            {text: text, complete: false, id:contador+1}
        ])
        setText("")
        setContador(contador+1)  
       }else{
           alert("Ingrese una tarea ")
       }
        
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setTodos(items);
      }
    return(
        <div className="container">
        <form className = "form" onSubmit={(e) => handleSetTodo(e)}>
            <input value={text} onChange={(e) => setText(e.target.value) }/>
            <button className="btn btn-success">Add</button> 
        </form>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map(({text,complete,id}, index) => {
                    return (
                      <Draggable key={id} draggableId={text} index={index}>
                        {(provided) => (
                          <li className="list-group-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <Todo todo={text} complete={complete} setTodos={setTodos} index={index} setText={setText} todos={todos}/>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
    );
}

export default Form;