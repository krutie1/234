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
    const [fetchedData, setFetchedData] = useState<any[]>();
    const [buttonEdit, setButtonEdit] = useState<number>()
    const [editingId, setEditingId] = useState<number>()

    const [currentItem, setCurrentItem] = useState({
        id: '',
        todo: '',
        completed: '',
        userId: ''
    }) 


    const checkStorage = (key: string) => {
        const storedData = localStorage.getItem(key);
        
        if (storedData == undefined || null) {
            return true
        }
        else {
            return false
        }
     }

     const fetchData = async () => {
        const response = await fetch('https://dummyjson.com/todos');
        const json = await response.json();

        localStorage.setItem('FetchedResponse', JSON.stringify(json.todos));
        // // @ts-ignore
        setFetchedData(JSON.parse(localStorage.getItem('FetchedResponse')))
    }

    useEffect(() => {
        fetchData();
        
        // if(checkStorage('Response')) {
        //     console.log('yes')
        // }
        // else {
        //     setTimeout(() => {
        //         localStorage.setItem('Response', JSON.stringify(fetchedData));
        //         // @ts-ignore
        //         setData(JSON.parse(localStorage.getItem('Response')))

        //         console.log(JSON.stringify(fetchedData))
        //     },1000)

        //     console.log('not')
        // }
    }, [])
      
    useEffect(() => {
        localStorage.setItem('Response', JSON.stringify(fetchedData))
        console.log(localStorage.getItem('Response') || '{}')
    },[fetchedData])

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

        // setCurrentItem({
        //     ...currentItem,
        //     id: e.currentTarget.value,
        //     todo: ,
        //     completed:,
        //     userId:,
        // })

    }

    const handleSave = () => {

        // let item = JSON.parse(localStorage.getItem('Response'))
        // localStorage.setItem('Response', JSON.stringify(item))
    }

    const handleRemove = (curVal: number) => {
        setData(data?.filter((i: { id: number; }) => i.id != curVal))
        localStorage.setItem('Response', JSON.stringify(data))
    }

    const listItems = fetchedData?.map((task)=>
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
                <td onClick={(e)=> handleClick(task.id)}>Edit</td>
                <td onClick={(e) => handleRemove(task.id)}>Remove</td>
            </tr>)
         }
    })


    return(
        <>
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
        </>
    )
}
export default App;
