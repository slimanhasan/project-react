import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
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
import CardContent from '@mui/material/CardContent';
import SimpleImageSlider from "react-simple-image-slider";
import swal from "sweetalert";
import './css/personalPage.css'
import useToken from "./service/useToken";
const API_URL = "http://localhost:8080/getPersonalPageData"
const updateApi = 'http://localhost:8080/updateUserData';
const imageApi = "http://localhost:8080/getPostPhotos?postId=";

export default function () {

    const { username, setUsername } = useUsername();
    const { token, setToken } = useToken();
    if (!token) {
        window.location.href = "/login";
    }
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
    const [changedImage, setChangedImage] = useState(false);
    const [imgToSend, setImgToSend] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState()
    const [images, setImages] = useState([]);
    const [selectedPostName, setSelectedPostName] = useState();
    const [selectedPostDescription, setSelectedPostDescription] = useState();
    const [editPostStatus, setEditPostStatus] = useState(false);
    const [selectedPostErrorName, setSelectedPostErrorName] = useState();
    const [selectedPostErrorDescription, setSelectedPostErrorDescription] = useState();



    const titleRef = useRef();

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
        setPosts(data.posts)
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });



    const handleDeleteAccount = async () => {
        await axios.get("http://localhost:8080/deleteAccount?uid=" + userData.user.id)
        window.sessionStorage.clear();
        window.location.href = "/";
    }



    const openSelectedPostFields = async (e) => {

        if (!editPostStatus) {

            let d = document.getElementById('selectedPostName');
            d.removeAttribute('disabled');
            d.style.backgroundColor = '#cbddea';
            d.style.borderRadius = '10px';
            e.target.innerHTML = 'save';

            d = document.getElementById('selectedPostDescription');
            d.removeAttribute('disabled');
            d.style.backgroundColor = '#cbddea';
            d.style.borderRadius = '10px';

            e.target.style.backgroundColor = 'rgb(41, 173, 31)'
            setEditPostStatus(true);
        }
        else {
            if (selectedPostName.length < 3) {
                setSelectedPostErrorName("title must be at least 3 characters");
                return;
            }
            if (selectedPostDescription.length < 3) {
                setSelectedPostErrorDescription("description is short");
                return;
            }

            await axios({
                method: 'post',
                url: "http://localhost:8080/updatePost",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: selectedPost.id,
                    name: selectedPostName,
                    description: selectedPostDescription
                }
            }).then(res => {
                window.location.reload();
            })

        }


    }



    const handleDeletePost = async (e) => {
        await axios({
            method: 'post',
            url: "http://localhost:8080/deletePost",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                id: selectedPost.id,

            }
        }).then(res => {
            window.location.reload();
        })

    }



    const handleSelectPost = async (e) => {
        setImages([])
        setSelectedPost(e)
        setSelectedPostName(e.name);
        setSelectedPostDescription(e.description);
        const numberOfPhotos = await axios.get("http://localhost:8080/getNumberOfPhotosForItem?postId=" + e.id);
        const cur = [];
        for (var i = 0; i < numberOfPhotos.data; i++) {
            cur.push(imageApi + e.id + "&num=0" + i);
        }
        setImages(arr => cur);

    }



    const setPostAsTaken = async () => {
         swal({
            title: "Are you sure?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {

                     axios({
                        method: 'post',
                        url: "http://localhost:8080/setPostAsTaken",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: {
                            id: selectedPost.id,
            
                        }
                    })

                    swal("updated succussfully", {
                        icon: "success",
                    });
                } else {
                    swal("it's ok :)");
                }
            });
    }



    const openInputFields = async (e) => {
        if (editStatus) {
            document.getElementsByClassName('overlay')[0].style.display = 'block'
            setVisiblePassword(true);
            e.target.style.backgroundColor = 'rgb(41, 173, 31)'
            let d = document.getElementsByTagName('input');
            for (let i = 0; i < d.length; i++) {
                if (d[i].type == 'email') continue;
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

            const f = new FormData();
            f.append('username', personUsername);
            f.append('email', personEmail);
            f.append('password', personPassword);
            f.append('location', personLocation);
            f.append('date', new Date(personBirthDate));
            f.append('phone', personPhone);
            await axios.post(updateApi, f, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(async (res) => {
                if (res.data == 'existed number') {
                    console.log(res.data)
                    setPhoneError('existed phone number');
                    return;

                }
                if (imgToSend) {
                    console.log("inside image API")
                    const f2 = new FormData();
                    f2.append("image", document.getElementById('uploadImageBtn').files[0]);
                    f2.append("email", personEmail);
                    console.log(personImage);

                    await axios.post("http://localhost:8080/setUserImage", f2)
                        .then((res) => {
                            console.log(res.status)
                        })

                }
            })

            if (phoneError) return;



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
                                    <h4 style={{ color: 'white' }}>categories</h4>
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
                                    (personImage == userData.userImage) ? `data:image/png;base64,${personImage}`
                                        : personImage
                                }></img>
                                <div className="overlay" style={{ display: 'none' }} onClick={(e) => {
                                    document.getElementById('uploadImageBtn').click();
                                }}>
                                    <p className="text">update photo</p>
                                    <input id='uploadImageBtn' type='file' style={{ display: 'none'  }}
                                        onChange={(e) => {
                                            setChangedImage(true);
                                            const reader = new FileReader();
                                            reader.onload = function (e2) {
                                                setImgToSend(e2.target.result);
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

                            }} onClick={(e) => handleDeleteAccount()}>delete account</Button>

                        </div>
                    </div>
                    <h3 style={{ marginLeft: '45%' }}>your donations</h3>

                    <Grid

                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        display="flex"
                        style={{
                            margin: 'auto',
                            marginTop: '20px',
                            width: '60%',
                            background: 'rgba(255,255,255,0.4)',
                            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                            backgroundFilter: 'blur(8.5px)',
                        }}>
                        {
                            posts.map((item) =>
                                <Grid key={item.id} item xs={12} sm={6} md={3} >


                                    <Card className="card" sx={{ width: 140 }} style={{
                                        marginLeft: 50,
                                        marginBottom: 12,

                                        height: 140,
                                        transition: 'transform .3s',
                                        borderRadius: '20px',
                                        cursor: 'pointer'

                                    }}
                                        onClick={async (e) => {
                                            await handleSelectPost(item)

                                            titleRef.current.scrollIntoView({ behavior: "smooth" });

                                        }}
                                    >


                                        <CardMedia
                                            component="img"
                                            height="110"
                                            src={imageApi + item.id + "&num=0"}
                                            alt="green iguana"

                                        />
                                        <div style={{ height: '10px', textAlign: 'center', fontSize: 'large' }}>
                                            {item.name}

                                        </div>
                                    </Card>
                                </Grid>

                            )}
                    </Grid>
                    {
                        (selectedPost) ? (
                            <div ref={titleRef} style={{
                                margin: 'auto',
                                marginTop: '20px',
                                width: '60%',
                                height: '350px',
                                background: 'rgba(255,255,255,0.4)',
                                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                backgroundFilter: 'blur(8.5px)',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                justifyContent: 'flex-start',
                            }}>
                                <div style={{
                                    float: 'left',
                                    width: '50%',
                                    height: 'auto',
                                }}>



                                    <CardContent style={{ justifyContent: 'center' }} >
                                        <CardContent>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '10px' }}>

                                                <label style={{ marginTop: '21px', fontSize: 'large' }}>
                                                    name :

                                                </label>
                                                <Input id="selectedPostName" type='text' style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '80px',
                                                    fontSize: '20px',
                                                    marginTop: '10px',
                                                    width: '40%'

                                                }}
                                                    disabled
                                                    value={selectedPostName}
                                                    onChange={(e) => { setSelectedPostErrorName(""); setSelectedPostName(e.target.value) }}
                                                />
                                                {(selectedPostErrorName) ? <span className='selectedPostErrMsg'> {selectedPostErrorName} </span> : <></>}

                                            </div>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '10px' }}>

                                                <label style={{ marginTop: '21px', fontSize: 'large' }}>
                                                    Description :

                                                </label>
                                                <Input id="selectedPostDescription" type='text' style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '32px',
                                                    fontSize: '20px',
                                                    marginTop: '10px',
                                                    width: '40%'

                                                }}
                                                    disabled
                                                    value={selectedPostDescription}
                                                    onChange={(e) => { setSelectedPostErrorDescription(""); setSelectedPostDescription(e.target.value) }}

                                                />
                                                {(selectedPostErrorDescription) ? <span className='selectedPostErrDescription'> {selectedPostErrorDescription} </span> : <></>}

                                            </div>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '10px' }}>

                                                <label style={{ marginTop: '21px', fontSize: 'large' }}>
                                                    post Date :

                                                </label>
                                                <div type='text' style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '47px',
                                                    fontSize: '20px',
                                                    marginTop: '15px',
                                                    width: '30%'

                                                }}


                                                >
                                                    {selectedPost.postDate.substring(0, 10)}
                                                </div>
                                            </div>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '10px' }}>

                                                <label style={{ marginTop: '21px', fontSize: 'large' }}>
                                                    Location :

                                                </label>
                                                <div type='text' style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '54px',
                                                    fontSize: '20px',
                                                    marginTop: '15px',
                                                    width: '30%'

                                                }}
                                                    disabled

                                                >
                                                    {selectedPost.author.location}

                                                </div>
                                            </div>

                                        </CardContent>

                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '5px' }}>

                                            <Button id='editBtn' style={{
                                                width: '110px',
                                                height: '40px',
                                                backgroundColor: 'rgb(58, 171, 171)',
                                                color: 'white',
                                                marginTop: '3px',
                                                marginRight: '20px',
                                                marginBottom: '3px',
                                                display: 'flex'
                                            }}
                                                onClick={(e) => openSelectedPostFields(e)}
                                            >
                                                edit post
                                            </Button>
                                            <Button style={{
                                                width: '110px',
                                                height: '40px',
                                                backgroundColor: 'rgb(222, 38, 38)',
                                                color: 'white',
                                                marginRight: '20px',
                                                marginTop: '3px',
                                                marginBottom: '3px'

                                            }}
                                                onClick={(e) => handleDeletePost()}
                                            >delete post</Button>
                                            <Button style={{
                                                width: '110px',
                                                height: '40px',
                                                backgroundColor: 'green',
                                                color: 'white',
                                                marginRight: '20px',
                                                marginTop: '3px',
                                                marginBottom: '3px',
                                                fontSize: '13px'

                                            }}
                                                onClick={(e) => setPostAsTaken()}
                                            >set as taken</Button>

                                        </div>
                                    </CardContent>


                                </div>
                                <div style={{ float: 'right', width: '50%', marginTop: '20px' }}>
                                    {
                                        (images.length > 0) ? (
                                            <div >
                                                <SimpleImageSlider
                                                    width={400}
                                                    height='40%'
                                                    images={images}
                                                    showBullets={true}
                                                    showNavs={true}
                                                    autoPlay='on'

                                                />
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>
                            </div>

                        ) : (<></>)
                    }
                </div>


            </CssBaseline >

        )


}

function showUser(username) {
    const logout = () => {
        sessionStorage.clear();
        //     window.location.reload();
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