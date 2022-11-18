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

        localStorage.setItem('Response', JSON.stringify(json.todos));
        setData(JSON.parse(localStorage.getItem('Response')!))
        //setData(fetched.todos.slice(0,10));
    }

    useEffect(() => {
        console.log(editingId)

        setTimeout(() => {
            if (localStorage.length == 0) {
                fetchData()
            }
            else {
                setData(JSON.parse(localStorage.getItem('Response')!));
            }
        }, 2000)
    },[])

    useEffect(() => {
        if(data != undefined){
            localStorage.setItem('Response', JSON.stringify(data))
        }
    })

    function handleClick(value: any)
    {
        setEditingId(value)
        // TODO: cancel or save edits
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem({
            ...currentItem,
            [e.currentTarget.name]: e.currentTarget.value,
            completed: e.target.checked.toString()
        })

        console.log(currentItem)
    }

    const handleSave = () => {
        try {
            alert('Data stored succesfully')
            console.log(currentItem)
            console.log(editingId)
            setEditingId(-1)
        }
        catch(err) {
            console.error(err)
        }

        // let item = JSON.parse(localStorage.getItem('Response'))
        // localStorage.setItem('Response', JSON.stringify(item))
    }

    const handleRemove = (curVal: number) => {
        try {
            setData(data?.filter((i: { id: number; }) => i.id != curVal))
            localStorage.setItem('Response', JSON.stringify(data))

            alert('Data removed succesfully')
        }
        catch(err) {
            console.error(err)
        }
    }

    const listItems = data?.map((task)=>
    {
        if (editingId === task.id) {
        return(
            <tr key={task.id}>
                <td data-label="ID">{task.id}</td>
                <td data-label="Todo"><input name="todo" onChange={(e) => handleChange(e)} value={currentItem.todo}/></td>
                <td data-label="Status">
                <input name="completed" type="checkbox" onChange={(e) => handleChange(e)} value={currentItem.completed}>
                </input>
                </td>
                <td data-label="UserID"><input name="userId" onChange={(e) => handleChange(e)} value={currentItem.userId}/></td> 
                <td onClick={() => handleSave()}>Save</td>
                <td onClick={(e) => handleRemove(task.id)}>Remove</td>
            </tr>)
        }
        else {
            return (<tr key={task.id}>
                <td data-label="ID">{task.id}</td>
                <td data-label="Todo">{task.todo}</td>
                <td data-label="Status">{task.completed == false ? 'false': 'true'}</td>
                <td data-label="UserID">{task.userId}</td> 
                <td onClick={(e)=>{handleClick(task.id)}}>Edit</td>
                <td onClick={(e) => handleRemove(task.id)}>Remove</td>
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
                    listItems
                }
            </tbody>
        </table>
        </>
    )
}
export default App;
