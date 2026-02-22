import { useState } from 'react'

export function ToDo() {
    const [todos, setTodos] = useState<string[]>([])
    const [value, setValue] = useState('')

    const addTodo = () => { //ky foraeachnya java
        setTodos([...todos, value])
        setValue('')
    }

    const deleteTodo = (index:number) => {
        setTodos(todos.filter((_, i) => i !== index))
    }

    return <div>
        <h4>My ToDo</h4>
        <ul>
            {todos.map((todo, index) => <li key={index}>{todo} <button onClick={()=>deleteTodo(index)}>Delete</button></li>)}
        </ul>
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={addTodo}>Add</button>
        </div>
    </div>
}