import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { CssBaseline } from '@material-ui/core';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from "react-query";
import CardContent from '@mui/material/CardContent';
import SimpleImageSlider from "react-simple-image-slider";
import './css/personalPage.css'
import { useSearchParams } from "react-router-dom";
import useToken from "./service/useToken";

const API_URL = "http://localhost:8080/viewProfile?q="
const imageApi = "http://localhost:8080/getPostPhotos?postId=";

export default function () {
    const { token, setToken } = useToken();
    const [userData, setUserData] = useState();
    const [personUsername, setPersonUsername] = useState();
    const [personEmail, setPersonEmail] = useState();
    const [personPhone, setPersonPhone] = useState();
    const [personLocation, setPersonLocation] = useState();
    const [personImage, setPersonImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState()
    const [images, setImages] = useState([]);
    const [selectedPostName, setSelectedPostName] = useState();
    const [selectedPostDescription, setSelectedPostDescription] = useState();

    const [params, setParams] = useSearchParams();

    const titleRef = useRef();

    const { status, data, error, isFetching } = useQuery("viewProfile", async () => {
        const { data } = await axios.get(API_URL + params.get("q"));
        setUserData(data);
        setPersonUsername(data.user.userName);
        setPersonEmail(data.user.email);

        setPersonPhone(data.user.phone);
        setPersonLocation(data.user.location);
        setPersonImage(data.userImage);
        setPosts(data.posts)
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });







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
                                (token) ? (showUser()) : (
                                    <Link to='/login'>
                                        <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                            <h4 style={{ color: 'white' }}>login</h4>
                                        </Button>
                                    </Link>
                                )
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
                                    <div style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '17px',
                                        width: '70%'

                                    }}
                                        disabled
                                    >
                                        {personUsername}
                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        email :

                                    </label>
                                    <div style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '32px',
                                        fontSize: '20px',
                                        marginTop: '17px',
                                        marginLeft: '65px',
                                        width: '70%'
                                    }}


                                    >
                                        {personEmail}
                                    </div>
                                </div>


                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%' }}>

                                    <label style={{ marginTop: '21px' }}>
                                        phone number :

                                    </label>
                                    <div style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '7px',
                                        fontSize: '20px',
                                        marginTop: '17px',
                                        width: '70%'



                                    }}


                                    >
                                        {personPhone}

                                    </div>
                                </div>

                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '15px' }}>

                                    <label style={{ marginTop: '10px' }}>
                                        address :

                                    </label>
                                    <div style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'black',
                                        marginLeft: '49px',
                                        fontSize: '20px',
                                        marginTop: '6px',

                                        width: '70%',
                                        height: 'min-content'

                                    }}



                                    >
                                        {personLocation}

                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                    <h3 style={{ marginLeft: '45%' }}>member's donations</h3>

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
                                                <div id="selectedPostName" style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '80px',
                                                    fontSize: '20px',
                                                    marginTop: '10px',
                                                    width: '40%'

                                                }}

                                                >
                                                    {selectedPostName}

                                                </div>

                                            </div>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '15%', marginTop: '10px' }}>

                                                <label style={{ marginTop: '21px', fontSize: 'large' }}>
                                                    Description :

                                                </label>
                                                <div id="selectedPostDescription" style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    color: 'black',
                                                    marginLeft: '32px',
                                                    fontSize: '20px',
                                                    marginTop: '10px',
                                                    width: '40%'

                                                }}

                                                >
                                                    {selectedPostDescription}

                                                </div>

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