import { React, useRef, useState, useEffect } from 'react';
import './css/register.css';
import { CssBaseline } from '@material-ui/core';
import styled from "styled-components";
import MyButton from './Components/MyButton';
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
        

        }).then(res=>{
            if(res.status==400){
                setEmailErrMsg("already used email");
            }
            else{
                res=res.json();
                return res;
            }
        }).then(res=> setToken(res.token))
        if(emailErrMsg=='already used email')return 
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

    

    }
    return (
        <CssBaseline >
            <div className='parDiv'>
                <AppBar position="static"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                >
                    <Toolbar >

                        <Typography variant="h5"
                            component="div" sx={{ padding: 3, flexGrow: 1 }}

                        >
                            WebSite Name
                        </Typography>
                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}><h3>home</h3></Button>
                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}><h3>content</h3></Button>
                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}><h3>contact</h3></Button>
                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}><h3>category's</h3></Button>
                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)' }}><h4>donate now</h4></Button>

                    </Toolbar>
                </AppBar>
                <div className='loginPagebody' >
                    <MainContainer >
                        <WelcomeText>YOU ARE WELCOME </WelcomeText>
                        <InputContainer onSubmit={handleSubmit} encType='multipart/form-data'>
                            <input id="email" value={values["email"]} name="email" className='xxx' type="email" placeholder="Email" 
                                onChange={handleChange}  
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
                            <ButtonContainer >
                                <MyButton content="SIGN UP " ></MyButton>
                            </ButtonContainer>
                        </InputContainer>
                        <SignUpText>
                            Already have an account ?  
                            <Link to="/login"style={{textDecoration:'none'}}> SIGN IN</Link>
                        </SignUpText>
                    </MainContainer>
                </div>
            </div>
        </CssBaseline>
    );

}
const MainContainer = styled.div`

    display:flex;
    align-items:center;
    flex-direction:column;
    height:95%;
    width:30vw;
    background:rgba(0,0,0,0.4);
    box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
    background-filter:blur(8.5px);
    border-radius:10px; 
    color:white;
    letter-spacing:0.2rem
`;
const WelcomeText = styled.h2`
    margin : 1rem 0 2rem 0;
    
`;
const SignUpText = styled.h5`
    cursor:pointer;
`;
const ForgotPassword = styled.h5`
    cursor:pointer;

`;
const InputContainer = styled.form`

    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    height:80%;
    width:100%;

`;
const ButtonContainer = styled.div`
  margin: 1rem 0 0rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HorizonalLine = styled.hr`

    width:90%;
    height:.3rem;
    border-radius:0.8rem;
    border:none;
    margin:1.5rem 0 1rem 0 ;
    background:linear-gradient(to right , #14163c 0 , #03217b 50%);
    background-filter: blur(25px);

`;