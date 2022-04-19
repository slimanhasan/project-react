import React from 'react'
import { Redirect } from 'react-router-dom';
import Login from './login';

import useToken from './service/useToken'
export default function(){
    const {token,setToken}=useToken();
    if(!(token)){
        return (window.location.href="/login")
        
    }
    else{
        console.log(token);
        return (

            <div>
                create post page
            </div>

        );


    }
}