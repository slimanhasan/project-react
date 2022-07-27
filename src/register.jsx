import { React, useRef, useState, useEffect } from 'react';
import './css/register.css';
import { CssBaseline } from '@material-ui/core';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import useToken from './service/useToken';
export default function ({setToken}) {
    const {token,set}=useToken();
    if(token){
        window.location.href="/";
    }
    const [emailErrMsg,setEmailErrMsg]=useState("");
    const [passwordErrMsg,setpasswordErrMsg]=useState("");
    const [usernameErrMsg,setusernameErrMsg]=useState("");
    const [phoneErrMsg,setphoneErrMsg]=useState("");
    const [cityErrMsg,setcityErrMsg]=useState("");
    const [birthDateErrMsg,setbirthDateErrMsg]=useState("");

    const [values,setValues]=useState({
        email:"",
        password:"",
        userName:"",
        location:"",
        phone:"",
        date:""
    });
    const[image,setImage]=useState(null);
  
    
    const handleChange=(e)=>{
        if(e.target.name=='email'){
            setEmailErrMsg('')
        }
        if(e.target.name=='password'){
            setpasswordErrMsg('')
        }
        if(e.target.name=='location'){
            setcityErrMsg('')
        }
        if(e.target.name=='phone'){
            setphoneErrMsg('')
        }
        if(e.target.name=='date'){
            setbirthDateErrMsg('')
        }
        if(e.target.name=='userName'){
            setusernameErrMsg('')
        }
        setValues({...values,[e.target.name]:e.target.value});
     
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(e.target['email'].value==""){
            setEmailErrMsg("invalid email")
            return ;
        }
        if(e.target['password'].value.length<5){
            setpasswordErrMsg("password must be at least 5 characters");
            return ;
        
        }
        if(e.target['username'].value.length<3){
            setusernameErrMsg("user name must be between 3 and 15 characters");
            return ;
        }
        if(e.target['city'].value==""){
            setcityErrMsg('uncorrect city name');
            return ;
        }
        if(e.target['date'].value==""){
            setbirthDateErrMsg('invalid birth date ');
            return ;
        }
        if(e.target['phone'].value.length!=10){
            setphoneErrMsg('invalid phone number');
            return ;
        }
        
        setEmailErrMsg('')
        setpasswordErrMsg('')
        setcityErrMsg('')
        setphoneErrMsg('')
        setbirthDateErrMsg('')
        setusernameErrMsg('')
    
        await fetch("http://localhost:8080/registerUser",{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(values),
        }).then( res=>{
            if(res.status==400){
                setEmailErrMsg("already used email");

            }
            else{
                res.json().then(res2=>{
                    setToken(res2.token,res2.username);
                    return res2;
                }).then(async res3=>{
                    if(image){
                        const formdata=new FormData();
                        formdata.append("image",e.target['image'].files[0]);
                        formdata.append("email",values.email)
                        await fetch("http://localhost:8080/setUserImage",{
                            method:'post',
                            
                            body:formdata
                        })
                    }
                    window.location.href="/createPost"
                })
            }
        });
    }
    return (
        <CssBaseline >
            <div className='parDiv'>
            <AppBar position="static"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                    >
                        <Toolbar >

                            <Typography variant="h5"
                                component="div" sx={{ padding: 3, flexGrow: 1 }}

                            >
                                WebSite Name
                            </Typography>
                            <Link to="/">
                                <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                    <h4 style={{ color: 'white' }}>home</h4>
                                </Button>
                            </Link>
                            <Link to="/categories" >
                                <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                    <h4 style={{ color: 'white' }}>categories</h4>
                                </Button>
                            </Link>
                            <Link to='/createPost'>
                                <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                    <h4 style={{ color: 'white' }}>donate now</h4>
                                </Button>
                            </Link>

                        </Toolbar>
                    </AppBar>
                <div className='loginPagebody' >
                    <div className='registerMainContainer'>
                        <h2 className='registerWelcomeText'>YOU ARE WELCOME </h2>
                        <form className='registerInputContainer' onSubmit={handleSubmit} encType='multipart/form-data'>
                            <input id="email" value={values["email"]} name="email" className='xxx' type="email" placeholder="Email" 
                                onChange={handleChange} autoFocus='on' 
                            />
                            {(emailErrMsg)?<span className='emailSpan'> {emailErrMsg} </span>:<></>}
                            <input id="pass" value={values["password"]} name="password" className='xxx' type="password" placeholder="Password" 
                                onChange={handleChange} 
                            />
                            {(passwordErrMsg)?<span className='emailSpan'> {passwordErrMsg} </span>:<></>}

                            <input id="username" value={values["userName"]} name="userName" className='xxx' type="text" placeholder="user name" 
                                onChange={handleChange} 
                            />
                            {(usernameErrMsg)?<span className='emailSpan'> {usernameErrMsg} </span>:<></>}
                            <input id = "phone"value={values["phone"]} name="phone" className='xxx' type="text" placeholder="phone number"
                                onChange={handleChange}                         
                            />
                            {(phoneErrMsg)?<span className='emailSpan'> {phoneErrMsg} </span>:<></>}

                            <input value={values["location"]} name="location" className='xxx' type="text" placeholder="city" id="city"
                                onChange={handleChange}
                            />
                            {(cityErrMsg)?<span className='emailSpan'> {cityErrMsg} </span>:<></>}

                            <input value={values["date"]} type="date" name ="date" placeholder='birth date' 
                                className='xxx' onChange={handleChange}/>
                            {(birthDateErrMsg)?<span className='emailSpan'> {birthDateErrMsg} </span>:<></>}
                            
                            <input id="photo"  accept='.jpg,.jpeg,.png'  type="file" className='xxx custom-file-input' name="image"
                                placeholder='choose a photo'  onChange={(e)=>setImage(e.target.value)}/>
                            <div className='registerButtonContainer'>
                                <button className='registerstyledBtn' >sign up</button>
                            </div>
                        </form>
                        <h4 className='registerSignUpText'>
                            Already have an account ?  
                            <Link to="/login"style={{textDecoration:'none' , color:'pink' }}> SIGN IN</Link>
                        </h4>
                    </div>
                </div>
            </div>
        </CssBaseline>
    );

}