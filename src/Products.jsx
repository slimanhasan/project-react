import React, { useState } from "react";
import './css/Products.css';
import { CssBaseline } from '@material-ui/core';
import './css/Category.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import useToken from "./service/useToken";
import useUsername from "./service/useUsername";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@mui/system';
import { MdPhoneEnabled } from "react-icons/md";
import { blue } from "@material-ui/core/colors";
import { EmailRounded } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
const API_URL = "http://localhost:8080/getItems/";

const images = [];
export default function () {
  const { token, setToken } = useToken();
  const { username, setUsername } = useUsername();
  const [images, setImages] = useState([]);
  const [data, setData] = useState();
  const [postUserEmail, setPostUserEmail] = useState();
  const [postUserPhone, setPostUserPhone] = useState();
  const [postLocation, setPostLocation] = useState();
  const [postDescription, setPostDescription] = useState();
  const [fetchingOnRight, setFetchingOnRight] = useState(true);
  const { status, posts, error, isFetching } = useQuery("getPosts", async () => {
    const catName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const { data } = await axios.get(API_URL + catName);
    setData(data);
    handleChangeRightData(data[0])
    setFetchingOnRight(false);
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  const handleChangeRightData = async (e) => {
    setImages([]);
    setFetchingOnRight(true);
    const numberOfPhotos = await axios.get("http://localhost:8080/getNumberOfPhotosForItem?postId=" + e.id);
    const cur = [];
    for (var i = 0; i < numberOfPhotos.data; i++) {
      cur.push("http://localhost:8080/getPostPhotos?postId=" + e.id + "&num=" + i);
    }
    setImages(arr => cur);

    setPostUserEmail(e.author.email);
    setPostLocation(e.author.location);
    setPostDescription(e.description);
    setPostUserPhone(e.author.phone);
    setFetchingOnRight(false);
  }

  if (isFetching) {
    return (
      <div className="loading">

        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
  else if (data && data.length == 0) {
    return (<div style={{ marginTop: '25%', marginLeft: '45%' }}>  no items in this Category</div>)
  }
  else {

    return (

      <CssBaseline>
        <div className="postsParDiv">
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
              <Link to={(token) ? '/createPost' : '/login'}>
                <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                  <h4 style={{ color: 'white' }}>donate now</h4>
                </Button>
              </Link>
              {
                (username) ? (

                  showUser(username)
                ) : (
                  <Link to='/login'>
                    <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                      <h4 style={{ color: 'white' }}>login</h4>
                    </Button>
                  </Link>
                )
              }

            </Toolbar>
          </AppBar>



          <div className="tools">

            <div style={{
              position: 'relative',
              backgroundColor: 'rgba(0,0,0,0.1)',
              border:'1px solid black',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.7)',
              },
              marginTop:'1px',
              marginLeft: '40%',
              width: '20%',

            }}>
              <div style={{
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                style={{
                  color: 'inherit',
                  // vertical padding + font size from searchIcon
                  paddingLeft:'calc(1em + 4px)',
                  width: '100%',
                    '&:focus': {
                      width: '20ch',
                  }
                }}
                inputProps={{ 'aria-label': 'search ' }}
              />
            </div>
          </div>



          <div className="leftDiv">
            {
              (fetchingOnRight) ? (
                <div className="loading">

                  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
              ) : (<></>)
            }
            <div style={{
              display: 'contents',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              padding: 10,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                overflowY: 'scroll',
              }}>
                {
                  (data) ? (
                    data.map((item) =>
                      <div key={item.id} className="leftCards" id={item.id}
                        style={item.id == data[0].id ? { backgroundColor: '#eeeeee' } : {}}
                        onClick={(e) => {
                          handleChangeRightData(item)
                          var d = document.getElementsByClassName('leftCards');
                          for (var i = 0; i < d.length; i++) {
                            d[i].className = 'leftCards';
                            d[i].style.backgroundColor = ''
                          }
                          document.getElementById(item.id).style.backgroundColor = '#eeeeee';

                        }}>
                        <CardContent style={{ justifyContent: 'center' }} >
                          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                            {item.name}
                          </Typography>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {'Donor : ' + item.author.userName}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Avatar sx={{ bgcolor: blue[700] }}>{item.author.userName[0].toUpperCase()}</Avatar>
                            <Link to="/personalPage" target={"_blank"} className="viewProfileLink" >
                              <h4 style={{ color: 'blue', marginTop: '-0px' }}>view profile</h4>
                            </Link>
                          </CardActions>
                        </CardContent>


                      </div>
                    )) : (null)
                }
              </div>
            </div>
          </div>



          <div className="rightDiv">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'visible',
              padding: 40,
              height: '100%',
            }}>

              {
                (images.length > 0) ? (
                  <div >
                    <SimpleImageSlider
                      width={600}
                      height='71%'
                      images={images}
                      showBullets={true}
                      showNavs={true}
                      autoPlay='on'

                    />
                  </div>
                ) : (<></>)
              }


              <Box style={{ marginTop: '-20px', marginLeft: '700px', width: '20%', height: 'fit-content', position: 'absolute' }}>

                <Card sx={{ width: '100%', backgroundColor: '#cbddea' }}
                  style={{ boxShadow: '0 3px 5px 2px rgba(0,0,0,1)', }}>
                  <CardContent >
                    <div style={{ width: '100%', height: '30px', display: 'grid', marginLeft: '-15px', top: '0px' }} >
                      <EmailRounded titleAccess="donor email" size="20px" style={{ marginLeft: '5px' }}></EmailRounded>
                      <p style={{ marginTop: '-20px', marginLeft: '40px', fontSize: '15px' }}> {postUserEmail}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card sx={{ width: '100%', backgroundColor: '#cbddea' }}
                  style={{ marginTop: '20px', boxShadow: '0 3px 5px 2px rgba(0,0,0,1)' }}>
                  <CardContent >
                    <div style={{ width: '100%', height: '30px', display: 'grid', marginLeft: '-15px', top: '0px' }} >
                      <MdPhoneEnabled title="donor phone" size="20px" style={{ marginLeft: '10px', marginTop: '10px' }}></MdPhoneEnabled>
                      <p style={{ marginTop: '-17px', marginLeft: '40px', fontSize: '15px' }}> {postUserPhone}</p>
                    </div>
                  </CardContent>
                </Card>


                <Card sx={{ width: '100%', backgroundColor: '#cbddea' }}
                  style={{ marginTop: '20px', boxShadow: '0 3px 5px 2px rgba(0,0,0,1)' }}>
                  <CardContent >
                    <div style={{ width: '100%', height: '30px', display: 'grid', marginLeft: '-15px', top: '0px' }} >
                      <LocationOnIcon titleAccess="donor location" size="20px" style={{ marginLeft: '10px', marginTop: '105x' }}></LocationOnIcon>
                      <p style={{ marginTop: '-20px', marginLeft: '40px', fontSize: '15px' }}> {postLocation}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card sx={{ width: '100%', backgroundColor: '#cbddea' }}
                  style={{ marginTop: '20px', boxShadow: '0 3px 5px 2px rgba(0,0,0,1)' }}>
                  <CardContent >
                    <div className="descriptionTextArea" style={{ width: '100%', height: '120px', display: 'grid', marginLeft: '-15px', top: '0px' }} >
                      <ArticleIcon titleAccess="item description" size="20px" style={{ marginLeft: '10px', marginTop: '105x' }}></ArticleIcon>
                      <p style={{
                        marginTop: '-22px', marginLeft: '40px', fontSize: '15px',
                        wordBreak: 'break-all', display: 'felx'
                      }}>
                        {postDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>

              </Box>
            </div>
          </div>

        </div>
      </CssBaseline>

    )

  }
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
        <Link to="/myPosts"> my posts</Link>
        <Link to="/" onClick={logout}> logout</Link>
      </div>
    </div>
  )
}