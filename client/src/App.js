import Login from './Pages/Login/Login';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import RequireUSer from './components/RequireUSer';
import Feed from './components/dashboard/Dashboard';
import './index.css';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import OnlyIfNotLoggedIn from './components/OnlyIfNotLoggedIn';
import toast, { Toaster } from 'react-hot-toast';
import { getTodos } from './redux/Slices/appConfigSlice';
export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'

function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  const toastData = useSelector(state => state.appConfigReducer.toastData);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();  // agar null start mein fir maaf kr dega
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
    }
  }, [toastData]);


  return (
    <div className='App '>
      <LoadingBar color='#5f9fff' ref={loadingRef} />
      <div><Toaster /></div>
      <Routes>

        <Route path='/' element={<Home />}></Route>

          <Route element={<RequireUSer />} >
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/dashboard' element={<Feed />}></Route>
            {/* <Route path='/post/:postId' element={<Comment />}></Route> */}
          </Route>
        

        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
