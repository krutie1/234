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
    const [editingId, setEditingId] = useState(undefined)

    const [currentItem, setCurrentItem] = useState({
        id: '',
        todo: '',
        completed: '',
        userId: ''
    }) 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://dummyjson.com/todos');
            const json = await response.json();

            localStorage.setItem('Response', JSON.stringify(json.todos));
            // @ts-ignore
            setData(JSON.parse(localStorage.getItem('Response')))
            //setData(fetched.todos.slice(0,10));
        }
    
        fetchData();
      },[])

    function handleClick(value: any)
    {
        setEditingId(value)
        // TODO: cancel or save edits
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // No longer need to cast to any - hooray for react!
        setCurrentItem({
            ...currentItem,
            [e.target.name]: e.target.value
        })

        console.log(currentItem)
    }

    const handleSave = () => {
        console.log(data)

    }

    const listItems = data?.map((task)=>
    {
        if (editingId === task.id) {
        return(
            <tr key={task.id}>
                <td data-label="ID"><input name="id" onChange={handleChange} defaultValue={task.id}/></td>
                <td data-label="Todo"><input name="todo" onChange={handleChange} defaultValue={task.todo}/></td>
                <td data-label="Status"><input name="completed" onChange={handleChange} defaultValue={task.completed == false ? 'false': 'true'}/></td>
                <td data-label="UserID"><input name="userId" onChange={handleChange} defaultValue={task.userId}/></td> 
                <td onClick={handleSave}>Save</td>
            </tr>)
        }
        else {
            return (<tr key={task.id}>
                <td data-label="ID">{task.id}</td>
                <td data-label="Todo">{task.todo}</td>
                <td data-label="Status">{task.completed == false ? 'false': 'true'}</td>
                <td data-label="UserID">{task.userId}</td> 
                <td onClick={(e)=>{handleClick(task.id)}}>Edit</td>
            </tr>)
         }
    })


    return(
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
                {listItems}
            </tbody>
        </table>
    )
}
export default App;
