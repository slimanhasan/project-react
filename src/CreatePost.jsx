import { CssBaseline } from '@material-ui/core';
import { React, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import './css/createPost.css'
import useToken from './service/useToken'
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useUsername from "./service/useUsername";

export default function () {
    const { token, setToken } = useToken();
    const { username, setUsername } = useUsername();
    const [fetching, setFetching] = useState(false);
    if (!token) {
        return (window.location.href = "/login")
    }
    const { status, data, error, isFetching } = useQuery("getCategories", async () => {
        const { data } = await axios.get(
            "http://localhost:8080/getCategories"
        );
        return data;
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const categories = data;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setdescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);
    const [imageError, setImageError] = useState("");

    const [img1ToSend, setImg1ToSend] = useState(null);
    const [img2ToSend, setImg2ToSend] = useState(null);
    const [img3ToSend, setImg3ToSend] = useState(null);


    const handleImageUpload = (e) => {
        setImageError("");
        if (!photo1) {
            setImg1ToSend(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = function (e2) {
                setPhoto1(e2.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            document.getElementById('image1').style.border = 'none';
        }
        else if (!photo2) {
            setImg2ToSend(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = function (e2) {
                setPhoto2(e2.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            document.getElementById('image2').style.border = 'none';

        }
        else if (!photo3) {
            setImg3ToSend(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = function (e2) {
                setPhoto3(e2.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            document.getElementById('image3').style.border = 'none';

        }
        else {
            alert("you can't upload more than 3 photos");
        }
        document.getElementById('photo').value = '';
    }


    const deleteImg1 = () => {
        setPhoto1(null);
        document.getElementById('image1').style.border = '2px dashed gray';
    }
    const deleteImg2 = () => {
        setPhoto2(null);
        document.getElementById('image2').style.border = '2px dashed gray';
    }
    const deleteImg3 = () => {
        setPhoto3(null);
        document.getElementById('image3').style.border = '2px dashed gray';
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length < 3) {
            setTitleError("title must be at least 3 characters");
            return;
        }
        if (description.length < 1) {
            setdescriptionError("description is short");
        }
        var c = document.getElementById('categorySelect').value;
        if (c == 'select category') {
            setCategoryError('please specify category');
            return;
        }
        if (!photo1 && !photo2 && !photo3) {
            setImageError("please attach at least one photo");
        }
        setFetching(true);
        const formdata = new FormData();
        formdata.append('title', title);

        formdata.append('description', description);
        formdata.append('category', c);
        if (photo1) formdata.append('photo1', img1ToSend);
        if (photo2) formdata.append('photo2', img2ToSend);
        if (photo3) formdata.append('photo3', img3ToSend);
        const returnStatus = await axios.post("http://localhost:8080/createPost", formdata, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setTimeout(() => {
            setFetching(false);
            window.location.replace("/")
        }, 2000);




    }
    if (isFetching) {
        return (
            <div className="loading">

                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    else {

        return (
            <CssBaseline>
                <div className='createPostParDiv'>
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
                            {
                                showUser(username)
                            }



                        </Toolbar>
                    </AppBar>
                    <div className='createPostBody'>
                        {
                            (fetching) ? (

                                <div className="createPostlds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            ) : (<></>)
                        }
                        <div className='createPostMainContainer'>
                            <h2 className='thankfulH1'> we are thankful for your help</h2>
                            <form className='createPostInputContainer' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <input type="text" placeholder='title..' className='createPostInputFields'
                                    onChange={(e) => { setTitle(e.target.value); setTitleError("") }}
                                />
                                {(titleError) ? (<span className='titleError'>{titleError}</span>) : (<></>)}
                                <textarea type="text" style={{ height: '120px' }} placeholder='description..'
                                    className='createPostInputFields'
                                    onChange={(e) => { setDescription(e.target.value); setdescriptionError("") }}
                                />
                                {(descriptionError) ? (<span className='titleError'>{descriptionError}</span>) : (<></>)}

                                <select className='createPostInputFields createPostSelect'
                                    id="categorySelect" onChange={(e) => setCategoryError("")}
                                >
                                    <option disabled='on' selected="on" >
                                        select category
                                    </option>
                                    {
                                        categories.map((i) =>
                                            <option className='createPostOption' value={i.name} key={i.name}>{i.name}</option>
                                        )

                                    }
                                </select>
                                {(categoryError) ? (<span className='titleError'>{categoryError}</span>) : (<></>)}

                                <input id="photo" multiple="multiple" accept='.jpg,.jpeg,.png' type="file"
                                    className='createPostInputFields createPostCustomFileInput' onChange={handleImageUpload}
                                    name="image" >
                                </input>
                                {(imageError) ? (<span className='titleError'>{imageError}</span>) : (<></>)}
                                <div className='createPostRegisterButtonContainer'>
                                    <button className='createPostRegisterButton' >share</button>
                                </div>

                            </form>

                            <div className='imagesUploaded' >
                                <div className='image' id="image1">
                                    {
                                        (photo1) ? (

                                            <img src={photo1} style={{ border: 'none' }} className='firstImage' />
                                        ) : (
                                            <h2 className='noChosenFile'> no chosen file</h2>
                                        )
                                    }
                                    {
                                        (photo1) ? (
                                            <p className='clearImg' onClick={deleteImg1}>clear</p>
                                        ) : (<></>)
                                    }
                                </div>

                                <div className='image' id="image2">
                                    {
                                        (photo2) ? (
                                            <img src={photo2} className='secondImage' />
                                        ) : (
                                            <h2 className='noChosenFile'> no chosen file</h2>
                                        )
                                    }
                                    {
                                        (photo2) ? (
                                            <p className='clearImg' onClick={deleteImg2}>clear</p>
                                        ) : (<></>)
                                    }
                                </div>
                                <div className='image' id="image3">
                                    {
                                        (photo3) ? (
                                            <img src={photo3} style={{ border: 'none' }} className='thirdImage' />
                                        ) : (
                                            <h2 className='noChosenFile'> no chosen file</h2>
                                        )
                                    }
                                    {
                                        (photo3) ? (
                                            <p className='clearImg' onClick={deleteImg3}>clear</p>
                                        ) : (<></>)
                                    }
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </CssBaseline>

        );


    }
}
function showUser(username) {
    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }
    return (

        <div className="dropdown" >
            <button className="dropbtn">
                {username}
                <i className="arrow down"></i>
            </button>
            <div className="dropdown-content">
                <Link to="/personalPage"> personal page</Link>
                <Link to="/myPosts"> my posts</Link>
                <Link to="/" onClick={logout}> logout</Link>
            </div>
        </div>
    )
}