import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, handleSearch, searchTodo } from '../redux/Slices/appConfigSlice';
import TodoItem from './dashboard/TodoItem';

function Search() {

    const [title, setSearchValue] = useState('');

    const [show, setShow] = useState(false);


    const dispatch = useDispatch();


    const handleSearch = async (e) => {
        try {

            e.preventDefault();
            console.log("title : ", title);
            dispatch(searchTodo({
                title
            }));
            setShow(true);
        } catch (e) {
            console.log(e.message);
        }finally{
            setSearchValue("")
        }
    }

    const searchData = useSelector(state => state.appConfigReducer.search);

    console.log(searchData);

    return (
        <div>

            <form>
                <input type="text" className="text-black p-2 mb-4" placeholder="search here ..."
                    onChange={(e) => { setSearchValue(e.target.value);   }}
                />
                <button type="submit" className="border p-2 ml-2"
                    onClick={handleSearch}
                >Search</button>
                <button type="button" value="Back" className='p-3 border ml-2' 
                onClick={()=>{setShow(false); setSearchValue(" ");}}
                >Back</button>
            </form>

            {show && <TodoItem key={searchData?._id} idd={searchData?._id} todo={searchData} />}

        </div>
    )
}

export default Search