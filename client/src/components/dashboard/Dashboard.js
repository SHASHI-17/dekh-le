import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../redux/Slices/appConfigSlice";
import Navbar from "../Navbar";
import TodoItem from "./TodoItem";
import axios from "axios";
import Search from "../Search";

function DashBoard() {

  const dispatch = useDispatch();
  const Todos = useSelector(state => state.appConfigReducer.todoData);

  // const [Todos,setTodes]=useState(todos);

  useEffect(() => {
    dispatch(getTodos());
  }, []);
  // console.log("inside the Dashboard",Todos);

  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');


  function handleAddTodos() {
    setShowInput(!showInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos/`, {
        title: text,
        completed: "false",
        pending: "false",
      });
      console.log("created post Successfully", result);

    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch(getTodos());
      setText('');
      setShowInput(false);
    }
  }

  const [filterData, setFilterData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [showFilter, setShowFilter] = useState(false);


  const handleFilter = async () => {
    if (selectedStatus === 'completed') {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos/completed`);
        console.log("completed data ", response.data.showCompleted);
        setFilterData(response.data.showCompleted);
      } catch (e) {
        e.message(e.message);
      } finally {
        setShowFilter(true);
      }
    } else if (selectedStatus === 'pending') {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos/pending`);
        console.log("pending data ", response.data.showPending);
        setFilterData(response.data.showPending);
      } catch (e) {
        e.message(e.message);
      } finally {
        setShowFilter(true);
      }
    }
  };

  return (
    <div className="text-white font-mono w-[1300px] mx-auto">
      <Navbar />


      <div>

        <label htmlFor="status">Filter by Status:</label>
        <select className="text-black p-2" id="status" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
          <option value="select">Select..</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button className="border p-2 ml-2" onClick={handleFilter}>Apply Filter</button>
        <button className="border p-2 ml-2" onClick={() => { setShowFilter(false); setSelectedStatus('select') }}>reset</button>

      </div>


      <div className="flex flex-col items-center ">
        <h1 className='text-center text-6xl'>TODOS</h1>

          {/* <Search/> */}

        {showInput ?

          <form onSubmit={handleSubmit}>
            <label htmlFor="add" className="mr-2 text-2xl">Todo</label>
            <input id="add" className="text-black p-1" type="text" onChange={(e) => { setText(e.target.value) }} autoFocus />
            <input type="button" value="Submit" className="ml-2 p-2 border" onClick={handleSubmit} />
            <input type="button" value="Back" className="ml-2 p-2 border" onClick={() => setShowInput(false)} />
          </form>

          : <button className=" p-2 border cursor-pointer " onClick={handleAddTodos} >Add Todo</button>}
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5" >

        {showFilter ? <div>
              {filterData.map((todo,index)=>{
                return <TodoItem key={todo._id} idd={todo._id} todo={todo} />
              })}
        </div> :

          <div>
            {Todos.map((todo, index) => {
              return <TodoItem key={todo._id} idd={todo._id} todo={todo} />
            })}</div>
        }

      </div>

    </div>
  );
}

export default DashBoard;
