import React, {useEffect, useState} from 'react';
import './App.css';

interface IResponse {
  id: number, 
  todo: string, 
  completed: boolean,
  userId: number
}

function App() {
  const [data, setData] = useState<IResponse[]>()
  const [buttonEdit, setButtonEdit] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      const fetched = await (
        await fetch('https://dummyjson.com/todos')
      ).json();

      setData(fetched.todos.slice(0,10));
    }

    fetchData();
  },[])

  const showingData = () => (
    data != null ?
    data.map((item) => (
      <tr key={item.id}> 
        {
          buttonEdit == item.id ? 
          <>
            <td data-label="ID"><input value={item.id}/></td>
            <td data-label="Todo"><input value={item.todo}/></td>
            <td data-label="Status"><input value={item.completed == false ? 'false': 'true'}/></td>
            <td data-label="UserID"><input value={item.userId}/></td> 
          </>
          : 
          <>
          <td data-label="ID">{item.id}</td>
          <td data-label="Todo">{item.todo}</td>
          <td data-label="Status">{item.completed == false ? 'false': 'true'}</td>
          <td data-label="UserID">{item.userId}</td> 
          </>
        }

        <td>
          <button className={item.id.toString()} onClick={(event: React.MouseEvent<HTMLElement>) => {
              setButtonEdit(item.id)
            }}>
              Edit
          </button>
        </td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    ))
    :
    <tr>
      <td>
        <p>
          loading..
        </p>
      </td>
    </tr>
  )

  return (
    <div className="App">
      <table>
        <caption>Statement Summary</caption>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Todo</th>
            <th scope="col">Completed</th>
            <th scope="col">UserID</th>
          </tr>
        </thead>
        <tbody>
          {
            showingData()
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
