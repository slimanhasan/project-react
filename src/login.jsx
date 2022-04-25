import { React , useState  } from 'react';
import { Link } from "react-router-dom";
import './css/loginPage.css';
import { CssBaseline } from '@material-ui/core';
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
                    <div className='MainContainer'>
                        <h2 className='WelcomeText'> glad to see you again ! </h2>
                        <form className='InputContainer' onSubmit={handleSubmit} id="loginForm" >
                            <input onChange={(e)=> setEmail(e.target.value)} className='xxx' type="email" placeholder="Email"/>
                            <input onChange={(e)=> setPass(e.target.value)} className='xxx' type="password" placeholder="Password" />
                            { failed && (
                                 <span className='failedSpan'>{failed}</span>
                            )}
                            <div className='ButtonContainer'>
                                <button className='styledBtn' >sign in</button>
                            </div>
                        </form>
                        <h4 className='ForgotPassword'> 
                            <Link to="/forgotPassword" style={{textDecoration:'none',color:'pink' }}> forgot password ?</Link>
                        </h4>
                        <h4 className='SignUpText'>
                            don't have an account ?
                            <Link to="/register" style={{textDecoration:'none',color:'pink' }}> sign up now</Link>
                        </h4>
                    </div>
                </div>
            </div>
        </CssBaseline>
    );

}
