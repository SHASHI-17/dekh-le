import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getTodos } from '../../redux/Slices/appConfigSlice';


function TodoItem({ todo, idd }) {
    console.log("inside todo",todo);
    const [showInput, setShowInput] = useState(false);

    const [text, setText] = useState('');
    const [id, setId] = useState('');

    const [option, setOption] = useState('');

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("text value =>", text);
        console.log(id);
        console.log(option);

        try {
            const result = await axios.put(`${process.env.REACT_APP_SERVER_URL}/todos/`, {
                title: `${text ? text : todo?.title}`,
                completed: `${option === 'completed' ? 'true' : 'false'}`,
                pending: `${option === 'pending' ? 'true' : 'false'}`,
                todoId: idd
            });
            console.log("updating data", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            setShowInput(!showInput);
            setText('')
            setOption('')
            setId('')
            dispatch(getTodos());
        }
    }


    async function deleteHandler() {
        const todoId = idd;
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos/delete`, {
                withCredentials: true,
                todoId
            });
        } catch (e) {
            console.log(e.message);
        } finally {
            dispatch(getTodos());
        }
    }


    return (
        <div className='border w-[500px] h-[250px] '>

            <div className='flex justify-center items-center '>
                {showInput ? <form  >
                    <label className='text-2xl mr-2 mt-3' htmlFor="edit" onClick={() => { setText(todo.title) }} >Edit</label>
                    <input id='edit' className='p-2 text-black' type="text" name={todo?.title}
                        placeholder={todo?.title} autoFocus  />
                    <input type="submit" value='Update' className='border p-2 mt-2 ml-12'
                        onClick={handleSubmit}
                    />
                    <input type="button" value='Back' className='border p-2 mt-2 ml-12'
                        onClick={() => { setShowInput(!showInput) }}
                    />
                    <label htmlFor="status">Status</label><br />
                    <select id="status"
                        onChange={(e) => { setOption(e.target.value) }}
                        className="outline text-black mt-5"
                    >
                        <option>Choose the Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>

                    </select>
                </form>
                    : <h3 className='text-2xl'>{todo?.title}</h3>}
            </div>

            <div className='flex flex-col justify-center items-center gap-2 mt-9'>
                <p>Status : {todo?.pending === 'true' ? 'Pending' : todo?.completed === 'true' ? "completed" : "To be Started"}</p>
                <div className='space-x-2'>
                    <div>{!showInput && <button className='px-4 py-2 border cursor-pointer' onClick={() => { setShowInput(!showInput); setId(todo._id) }} >Edit</button>}</div>
                </div>
            </div>

            <div><button className='px-4 py-2 border cursor-pointer'

                onClick={deleteHandler}
            >Delete</button>
            </div>

        </div>
    )
}

export default TodoItem