import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Products from './Products';
import Category from './Category';
import Details from './Details';
import Login from './login';
import Register from './register';
import { useState } from 'react';
import CreatePost from './CreatePost'
import useToken from './service/useToken'
import {QueryClientProvider,QueryClient} from 'react-query'
import Temp from './temp';
import MyDonations from './myDonations';
import PersonalPage from './personalPage';
function setToken(userToken,username){
    sessionStorage.setItem('token', JSON.stringify(userToken));
    sessionStorage.setItem('username', JSON.stringify(username));

}
function App() {
  const {token,set}=useToken();
  const queryClient=new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
              <Route path='/createPost' element={<CreatePost/>}></Route>
              <Route path="/login" element={<Login setToken={setToken}/>} />
              <Route path="/" element={ <Category/> } />
              <Route path="/Category/:name" element={ <Products/> } />
              <Route path="Details" element={ <Details/> } />
              <Route path='/register' element={<Register setToken={setToken}/>}/>
              <Route path="/Temp" element={<Temp/>}></Route>
              <Route path="/myDonations" element={<MyDonations/>}></Route>
              <Route path="/personalPage" element={<PersonalPage/>}></Route>
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
export default App;
ReactDOM.render(<App />, document.getElementById('root'));