import React, {useEffect, useState} from 'react';
import './App.css';

const Modal: React.FC = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('Response')!));
    const [modal, setModal] = useState(false)
    const [currentItem, setCurrentItem] = useState({
        id: null,
        todo: '',
        completed: false,
        userId: ''
    }) 

    // заносим данные хранилища в state
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('Response')!));
    }, [])

    // Заполняем наш state объект, curId= id последнего элемента в массиве, сохраняем для того чтобы автоматически id прибавлялся на один
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let curId = (data[data.length - 1].id) + 1;

        setCurrentItem({
            ...currentItem,
            id: curId,
            [e.currentTarget.name]: e.currentTarget.value,
            completed: e.target.checked == true ? true : false
        })
    }

    // добавление элемента в хранилище и проверка полей, пушим в массив наш объект и сохраняем массив в хранилище
    const handleAdd = () => {
        if(currentItem.todo == '' || currentItem.userId == '') {
            alert("Please fill in the empty inputs")
        }
        else {
            try {
                setData(data?.push(currentItem));
                localStorage.setItem('Response', JSON.stringify(data))
    
                setData(JSON.parse(localStorage.getItem('Response')!));
                setCurrentItem({id: null, todo: '', completed: false, userId: ''})

                window.location.reload();
            }
            catch(err) {
                console.error(err);
    
                //make relocate to App.tsx
            }
        }
        
    }


    return(
        <>
        <div className="newData">
            <div className="newData-item">
                <label htmlFor="todo">Todo</label>
                <input type="text" name="todo" onChange={(e) => handleChange(e)}  value={currentItem.todo}/>
            </div>

            <div className="newData-item">
                <label htmlFor="completed">Status</label>
                <input type="checkbox" name="completed" onChange={(e) => handleChange(e)}  defaultChecked={false} checked={currentItem.completed}/>
            </div>

            <div className="newData-item">
                <label htmlFor="userId">UserID</label>
                <input type="text" name="userId" onChange={(e) => handleChange(e)}  value={currentItem.userId}/>
            </div>
            <button onClick={handleAdd}>Add new item</button>
        </div>
        </>
    )
}
export default Modal;
