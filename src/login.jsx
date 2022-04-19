import { React , useState  } from 'react';
import { Link } from "react-router-dom";
import './css/loginPage.css';
import { CssBaseline } from '@material-ui/core';
import styled from "styled-components";
import MyButton from './Components/MyButton';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useToken from './service/useToken';
async function loginUser(credentials){
    console.log(credentials.email + " " + credentials.pass);
    
    return fetch("http://localhost:8080/auth/login",{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(credentials)

    }).then(res=>res.json())
}


export default function ({setToken}) {
    const {token,set}=useToken();
    if(token){
        window.location.href="/";
    }
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const [failed,setFailed]=useState("");
    const handleSubmit=async e=>{
        e.preventDefault();
        setFailed("");
        const response = await loginUser({email,pass});
        
        if(response.token){
            setToken(response.token,response.username);
            window.location.href="/createPost";
        }
        
        else{
            setFailed("invalid email or password");
            console.log("failed  = " +failed);
        }
        
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
                    <MainContainer>
                        <WelcomeText> glad to see you again ! </WelcomeText>
                        <InputContainer onSubmit={handleSubmit} id="loginForm" >
                            <input onChange={(e)=> setEmail(e.target.value)} className='xxx' type="email" placeholder="Email" />
                            <input onChange={(e)=> setPass(e.target.value)} className='xxx' type="password" placeholder="Password" />
                            { failed && (
                                 <span className='failedSpan'>{failed}</span>
                            )}
                            <ButtonContainer>
                                <MyButton content="sign in"></MyButton>
                            </ButtonContainer>
                        </InputContainer>
                        <ForgotPassword> 
                            <Link to="/forgotPassword" style={{textDecoration:'none',color:'pink' }}> forgot password ?</Link>
                        </ForgotPassword>
                        <SignUpText>
                            don't have an account ?
                            <Link to="/register" style={{textDecoration:'none',color:'pink' }}> sign up now</Link>
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
    height:70%;
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
const SignUpText = styled.h4`
    cursor:pointer;
`;
const ForgotPassword = styled.h4`
    cursor:pointer;

`;
const InputContainer = styled.form`

    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    height:45%;
    width:100%;

`;
const ButtonContainer = styled.div`
  margin: 1rem 10 2rem 0;
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