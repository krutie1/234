import React, {useEffect, useState} from 'react';
import './App.css';

interface IResponse {
  id: number, 
  todo: string, 
  completed: boolean,
  userId: number
}

const App: React.FC = () => {
    const [data, setData] = useState<any[]>();
    const [editingId, setEditingId] = useState<number>();

    const [currentItem, setCurrentItem] = useState({
        id: null,
        todo: '',
        completed: false,
        userId: ''
    }) 

    // получение json-а из api
    const fetchData = async () => {
        const response = await fetch('https://dummyjson.com/todos');
        const json = await response.json();

        localStorage.setItem('Response', JSON.stringify(json.todos));
        setData(JSON.parse(localStorage.getItem('Response')!))
    }

    // первый запуск приложения, проверка на отсутствие данных в localstorage
    useEffect(() => {
        console.log(editingId);

        if (localStorage.length == 0) {
            fetchData();
        }
        else {
            setData(JSON.parse(localStorage.getItem('Response')!));
        }

    },[])

    // заполнение данными хранилище, которые мы получили при первом запуске 
    useEffect(() => {
        if (data != undefined) {
            localStorage.setItem('Response', JSON.stringify(data));
        }
    })

    // выбор редактируемого элемента
    function handleClick(value: any)
    {
        setEditingId(value);
        // TODO: cancel or save edits
    }

    // отлавливаем изменения в инпутах и отправляем их в объект
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentItem({
            ...currentItem,
            [e.currentTarget.name]: e.currentTarget.value,
            completed: e.target.checked == true ? true : false
        })
    }

    // сохраняем внесенные изменения, для этого нужно найти объект в массиве который собираемся редактировать, дальше по индексу обновляем его
    // с объектом, если объект не несет в себе данных, то оставляем старые
    const handleSave = () => {
        try {
            alert('Data stored succesfully')
  
            let idx = data?.findIndex((obj) => obj.id === editingId);

            //@ts-ignore
            data[idx].id = data[idx].id;
            //@ts-ignore
            data[idx].todo = currentItem.todo == '' ? data[idx].todo : currentItem.todo;
            //@ts-ignore
            data[idx].completed = currentItem.completed;
            //@ts-ignore
            data[idx].userId = currentItem.userId == '' ? data[idx].userId  : currentItem.userId;

            
            setEditingId(-1);
        }
        catch(err) {
            console.error(err);
        }
    }

    // Удаляем данные из state и сохраняем массив в хранилище
    const handleRemove = (curVal: number) => {
        try {
            setData(data?.filter((i: { id: number; }) => i.id != curVal));
            localStorage.setItem('Response', JSON.stringify(data));
        }
        catch(err) {
            console.error(err);
        }
    }

    // отображение данных и инпутов редактирования, когда редактируемый элемент равен одному из элементов массива
    const listItems = data?.map((task)=>
    {
        if (editingId === task.id) {
        return(
            <tr key={task.id}>
                <td data-label="ID">{task.id}</td>
                <td data-label="Todo"><input name="todo" onChange={(e) => handleChange(e)} value={currentItem.todo}/></td>
                <td data-label="Status">
                <input name="completed" type="checkbox" onChange={(e) => handleChange(e)} defaultChecked={true} checked={currentItem.completed}>
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
                    <th>Todo</th>
                    <th>Status</th>
                    <th>UserID</th>
                </tr>
            </thead>
            <tbody>
                {
                    data == null ? 
                    <tr>
                        <td>
                            loading..
                        </td>
                    </tr> : 
                    listItems
                }
            </tbody>
        </table>
        </>
    )
}
export default App;
