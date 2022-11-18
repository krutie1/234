import React, {useEffect, useState} from 'react';
import './App.css';

interface IResponse {
  id: number, 
  todo: string, 
  completed: boolean,
  userId: number
}

const App: React.FC = () => {
    const [data, setData] = useState<any[]>()
    const [buttonEdit, setButtonEdit] = useState<number>()
    const [editingId, setEditingId] = useState<number>()

    const [currentItem, setCurrentItem] = useState({
        id: '',
        todo: '',
        completed: '',
        userId: ''
    }) 

    
    const fetchData = async () => {
        const response = await fetch('https://dummyjson.com/todos');
        const json = await response.json();
        
        localStorage.setItem('FetchedResponse', JSON.stringify(json.todos));
        setData(JSON.parse( localStorage.getItem('FetchedResponse')!))
        window.location.reload();
    }
    
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('FetchedResponse')!))
        console.log(data)
    }, [])

    useEffect(() => {
        
    })

    function handleClick(value: any)
    {
        setEditingId(value)
        // TODO: cancel or save edits
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem({
            ...currentItem,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
    }

    const handleRemove = (curVal: any) => {
      setData(data?.filter((i: { id: number; }) => i.id != curVal))
      localStorage.setItem('FetchedResponse', JSON.stringify(data));
    }

    const listItems = () => data?.map((todo)=>
    {
        if (editingId === todo.id) {
        return(
            <tr key={todo.id}>
                <td data-label="ID"><input name="id" onChange={handleChange} defaultValue={todo.id}/></td>
                <td data-label="Todo"><input name="todo" onChange={handleChange} defaultValue={todo.todo}/></td>
                <td data-label="Status"><input name="completed" onChange={handleChange} defaultValue={todo.completed == false ? 'false': 'true'}/></td>
                <td data-label="UserID"><input name="userId" onChange={handleChange} defaultValue={todo.userId}/></td> 
                <td onClick={handleSave}>Save</td>
            </tr>)
        }
        else {
            return (<tr key={todo.id}>
                <td data-label="ID">{todo.id}</td>
                <td data-label="Todo">{todo.todo}</td>
                <td data-label="Status">{todo.completed == false ? 'false': 'true'}</td>
                <td data-label="UserID">{todo.userId}</td> 
                <td onClick={(e)=> handleClick(todo.id)}>Edit</td>
                <td onClick={(e) => handleRemove(todo.id)}>Remove</td>
            </tr>)
         }
    })


    return(
        <>
        <button onClick={fetchData}>Fetch Data</button>
        <table id="myTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Assignee</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                  data == null ? 
                  <td>loading..</td> : 
                    listItems()
                }
            </tbody>
        </table>
        </>
    )
}
export default App;
