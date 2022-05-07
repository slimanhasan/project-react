import axios from "axios";
import React, { useState } from "react";
import { CssBaseline } from '@material-ui/core';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useUsername from "./service/useUsername";
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from "react-query";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import './css/personalPage.css'
import photo from './assets/1.jpg';
import useToken from "./service/useToken";
const API_URL = "http://localhost:8080/getPersonalPageData"
const updateApi = 'http://localhost:8080/updateUserData';
export default function () {

    const { username, setUsername } = useUsername();
    const { token, setToken } = useToken();
    const [userData, setUserData] = useState();
    const [personUsername, setPersonUsername] = useState();
    const [personEmail, setPersonEmail] = useState();
    const [personPassword, setPersonPassword] = useState();
    const [personPhone, setPersonPhone] = useState();
    const [personLocation, setPersonLocation] = useState();
    const [personBirthDate, setPersonBirthDate] = useState();
    const [personImage, setPersonImage] = useState(null);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [editStatus, setEditStatus] = useState(true);
    const [usernameError, setUsernameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [phoneError, setPhoneError] = useState();
    const [locationError, setLocationError] = useState();
    const [birthDateError, setBirthDateError] = useState();
    const { status, data, error, isFetching } = useQuery("getPersonalData", async () => {
        const { data } = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
        setUserData(data);
        setPersonUsername(data.user.userName);
        setPersonEmail(data.user.email);
        setPersonPassword(data.user.password);
        setPersonPhone(data.user.phone);
        setPersonLocation(data.user.location);
        setPersonBirthDate(new Date(data.user.date).toISOString().split('T')[0]);
        setPersonImage(data.userImage);
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const openInputFields = async (e) => {
        if (editStatus) {
            document.getElementsByClassName('overlay')[0].style.display = 'block'
            setVisiblePassword(true);
            e.target.style.backgroundColor = 'rgb(41, 173, 31)'
            let d = document.getElementsByTagName('input');
            for (let i = 0; i < d.length; i++) {
                d[i].removeAttribute('disabled');
                d[i].style.backgroundColor = '#cbddea';
                d[i].style.borderRadius = '10px';
            }
            e.target.innerHTML = 'save';
            setEditStatus(false);
        }
        else {

            if (personUsername.length < 3) {
                setUsernameError('user name must be at least 3 characters')
                return;
            }
            if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(personEmail))) {
                setEmailError('invalid email');
                return;
            }
            if (personPassword.length < 5) {
                setPasswordError('password must be at least 5 characters');
                return;
            }
            if (personPhone.length != '10') {
                setPhoneError('invalid phone number');
                return;
            }
            if (personBirthDate.length != 10) {
                setBirthDateError('invalid birth date');
                return;
            }
            if (personLocation.length < 1) {
                setLocationError('invalid location');
                return;
            }

            const f=new FormData();
            f.append('username',personUsername);
            f.append('email',personEmail);
            f.append('password',personPassword);
            f.append('location',personLocation);
            f.append('date',new Date(personBirthDate));
            f.append('phone',personPhone);
            await axios.post(updateApi,f,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res=>{
                console.log(res.status)
            })
            



            document.getElementsByClassName('overlay')[0].style.display = 'none'
            e.target.style.backgroundColor = 'rgb(58, 171, 171)';
            let d = document.getElementsByTagName('input');
            for (let i = 0; i < d.length; i++) {
                d[i].setAttribute('disabled', 'true');
                d[i].style.backgroundColor = 'transparent';
                d[i].style.borderRadius = '0px';
            }
            e.target.innerHTML = 'edit profile';

            setEditStatus(true);
        }
    }
    if (isFetching) {
        return (
            <div className="loading">

                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    else
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
                        }}>
                            <div className="userPhotoContainer" >
                                <img className='userPhoto' src={
                                    (personImage==userData.userImage)?`data:image/png;base64,${personImage}`
                                    :personImage
                            }></img>
                                <div className="overlay" style={{ display: 'none' }} onClick={(e) => {
                                    document.getElementById('uploadImageBtn').click();
                                }}>
                                    <p className="text">update photo</p>
                                    <input id='uploadImageBtn' type='file' style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const reader = new FileReader();
                                            reader.onload = function (e2) {
                                                setPersonImage(e2.target.result);
                                            }
                                            reader.readAsDataURL(e.target.files[0]);
                                        }}
                                    />
                                </div>

                            </div>
                            <div style={{
                                marginLeft: '6%',
                                display: 'flex',
                                width: '52%',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                position: 'relative',
                            }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '50px' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        user name :

                                    </label>
                                    <Input type='text' style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '10px',
                                        width: '70%'

                                    }}
                                        disabled
                                        value={personUsername}
                                        onChange={(e) => { setPersonUsername(e.target.value); setUsernameError('') }}
                                    />
                                </div>
                                {(usernameError) ? <span className='errMsg'> {usernameError} </span> : <></>}
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        email :

                                    </label>
                                    <Input type='email' style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '10px',
                                        marginLeft: '65px',
                                        width: '70%'
                                    }}
                                        disabled

                                        value={personEmail}
                                        onChange={(e) => { setPersonEmail(e.target.value); setEmailError('') }}

                                    />
                                </div>
                                {(emailError) ? <span className='errMsg'> {emailError} </span> : <></>}


                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        password :

                                    </label>
                                    <Input type={visiblePassword ? 'text' : 'password'} style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '15px',
                                        marginLeft: '37px',
                                        width: '70%'

                                    }}
                                        disabled

                                        value={personPassword}
                                        onChange={(e) => { setPersonPassword(e.target.value); setPasswordError('') }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(e) => setVisiblePassword(!visiblePassword)}
                                                >
                                                    {visiblePassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                </div>
                                {(passwordError) ? <span className='errMsg'> {passwordError} </span> : <></>}

                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        birth date :

                                    </label>
                                    <Input type='date' style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '15px',
                                        marginLeft: '37px',
                                        width: '70%'

                                    }}
                                        disabled

                                        onChange={(e) => { setPersonBirthDate(e.target.value); setBirthDateError('') }}
                                        value={personBirthDate}

                                    />

                                </div>
                                {(birthDateError) ? <span className='errMsg'> {birthDateError} </span> : <></>}
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        phone number :

                                    </label>
                                    <Input type='number' style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '7px',
                                        fontSize: '20px',
                                        marginTop: '15px',
                                        width: '70%'



                                    }}
                                        disabled

                                        value={personPhone}
                                        onChange={(e) => { setPersonPhone(e.target.value); setPhoneError('') }}
                                    />
                                </div>
                                {(phoneError) ? <span className='errMsg'> {phoneError} </span> : <></>}

                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '15px' }}>

                                    <label style={{ marginTop: '10px' }}>
                                        address :

                                    </label>
                                    <Input type='text' style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '49px',
                                        fontSize: '20px',

                                        width: '70%',
                                        height: 'min-content'

                                    }}
                                        disabled

                                        value={personLocation}
                                        onChange={(e) => { setPersonLocation(e.target.value); setLocationError('') }}

                                    />
                                </div>
                                {(locationError) ? <span className='errMsg'> {locationError} </span> : <></>}


                            </div>

                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '20px' }}>

                            <Button id='editBtn' style={{
                                width: '150px',
                                height: '40px',
                                backgroundColor: 'rgb(58, 171, 171)',
                                color: 'white',
                                marginTop: '3px',
                                marginRight: '20px',
                                marginBottom: '3px',
                                display: 'flex'
                            }}
                                onClick={(e) => openInputFields(e)}
                            >
                                edit profile
                            </Button>
                            <Button style={{
                                width: '150px',
                                height: '40px',
                                backgroundColor: 'rgb(222, 38, 38)',
                                color: 'white',
                                marginRight: '20px',
                                marginTop: '3px',
                                marginBottom: '3px'

                            }}>delete account</Button>

                        </div>
                    </div>
                    <h3 style={{ marginLeft: '45%' }}>your donations</h3>
                    <div style={{
                        position: 'static',
                        margin: 'auto',
                        marginTop: '20px',
                        width: '60%',
                        background: 'rgba(255,255,255,0.4)',
                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                        backgroundFilter: 'blur(8.5px)',
                    }}>
                        <Grid item md={12}
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Card className="card" sx={{ width: '150px', height: '150px' }} style={{
                                margin: 20,
                                marginLeft: 50,
                                transition: 'transform .3s',
                                borderRadius: '90px'

                            }}>



                                <CardMedia
                                    component="img"
                                    height="100%"
                                    src={photo}
                                    alt="green iguana"

                                />

                            </Card>
                        </Grid>

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
                <i className="arrow down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/personalPage"> personal page</Link>
                <Link to="/myDonations"> my donations</Link>
                <Link to="/" onClick={logout}> logout</Link>
            </div>
        </div>
    )
}