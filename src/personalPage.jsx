import axios from "axios";
import React from "react";
import { CssBaseline } from '@material-ui/core';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useUsername from "./service/useUsername";
import './css/personalPage.css'
import { Grid } from '@mui/material';

import photo from './assets/1.jpg';
const API_URL = "http://localhost:8080/getPersonalPageData?q=157"
export default function () {

    const { username, setUsername } = useUsername();

    return (
        <CssBaseline>
            <div className="parDiv">
                <AppBar position="static"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                    <Toolbar >

                        <Typography variant="h5"
                            component="div" sx={{ padding: 3, flexGrow: 1 }}

                        >
                            WebSite Name
                        </Typography>
                        <Link to="/home">
                            <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                <h4 style={{ color: 'white' }}>home</h4>
                            </Button>
                        </Link>
                        <Link to="/categories" >
                            <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                <h4 style={{ color: 'white' }}>donations</h4>
                            </Button>
                        </Link>
                        <Link to='/createPost'>
                            <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                <h4 style={{ color: 'white' }}>donate now</h4>
                            </Button>
                        </Link>

                        {
                            showUser(username)
                        }
                    </Toolbar>
                </AppBar>
                <div style={{
                    position: 'static',
                    margin: 'auto',
                    marginTop: '20px',
                    width: '50%',
                    background: 'rgba(255,255,255,0.4)',
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                    backgroundFilter: 'blur(8.5px)',
                }} >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'normal',
                        marginTop: '10px',
                        borderBottom: '1px solid grey',
                    }}>
                        <div style={{ marginLeft: '20px', marginTop: '40px', display: 'flex',marginBottom:'10px' }}>
                            <img style={{ width: '300px', height: '300px', borderRadius: '80px' }} src={photo}></img>
                        </div>
                        <div style={{
                            marginLeft: '10%',
                            display: 'flex',
                            width: '50%',
                            flexDirection: 'column',
                            justifyContent: 'stretch',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <label style={{ marginTop: '21px' }}>
                                    user name :

                                </label>
                                <h2 style={{ marginLeft: '32px' }}>sliman hasan</h2>
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <label style={{ marginTop: '21px' }}>
                                    email :

                                </label>
                                <h2 style={{ marginLeft: '63px' }}>slimanhasan9@gmail.com</h2>
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <label style={{ marginTop: '21px' }}>
                                    password :

                                </label>
                                <h2 style={{ marginLeft: '35px' }}>************</h2>
                            </div>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <label style={{ marginTop: '21px' }}>
                                    phone number :

                                </label>
                                <h2 style={{ marginLeft: '6px' }}>0962897132</h2>
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <label style={{ marginTop: '21px' }}>
                                    address :

                                </label>
                                <h2 style={{ marginLeft: '50px' }}>homs</h2>
                            </div>

                         
                        </div>

                    </div>
                    <div style={{width:'100%',display:'flex' ,flexDirection:'row',justifyContent:'flex-end' ,marginTop:'10px'}}>

                        <Button className="editBtn">Edit profile</Button>
                        <Button className="deleteBtn">delete account</Button>

                    </div>
                </div>

            </div>
        </CssBaseline>

    )


}
function showUser(username) {
    const logout = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    return (

        <div className="dropdown" >
            <button className="dropbtn">
                {username}
                <i class="arrow down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/personalPage"> personal page</Link>
                <Link to="/myDonations"> my donations</Link>
                <Link to="/" onClick={logout}> logout</Link>
            </div>
        </div>
    )
}