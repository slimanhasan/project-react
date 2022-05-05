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
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@mui/system';
import { MdPhoneEnabled } from "react-icons/md";
import { blue } from "@material-ui/core/colors";
import { EmailRounded } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
const API_URL = "http://localhost:8080/getItems/";

const images = [];
const cities=['all','damascus','homs','aleppo','hama'];
export default function () {
  let url = window.location.href;
  const curCategory = url.substring(url.lastIndexOf('/') + 1);
  const [orderBy, setOrderBy] = useState("sort by");
  const { token, setToken } = useToken();
  const { username, setUsername } = useUsername();
  const [images, setImages] = useState([]);
  const [originalData,setOriginalData]=useState();
  const [data, setData] = useState();
  const [postUserEmail, setPostUserEmail] = useState();
  const [postUserPhone, setPostUserPhone] = useState();
  const [postLocation, setPostLocation] = useState();
  const [postDescription, setPostDescription] = useState();
  const [fetchingOnRight, setFetchingOnRight] = useState(true);
  const [noSuchElement, setNoSuchElement] = useState(false);
  const [searchByCity,setSearchByCity]=useState("search by city");
  const [searchWord, setSearchWord] = useState("");
  const [emptyCategory, setEmptyCategory] = useState(false);
  const { status, posts, error, isFetching } = useQuery("getPosts", async () => {
    const catName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const { data } = await axios.get(API_URL + catName);
    setData(data);
    setOriginalData(data);
    if (data.length == 0) {
      setEmptyCategory(true);
      setFetchingOnRight(false);

      return;
    }
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
              backgroundColor: 'rgba(0,0,0,0.1)',
              border: '1px solid black',
              display: 'flex',
              marginTop: '2px',
              marginLeft: '1%',
              width: '20%',

            }}
            >
              <div style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >

              </div>

              <InputBase
                style={{ width: '100%', marginLeft: '10px' }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchWord}
                onChange={async (e) => {
                  setSearchWord(e.target.value)
                  console.log(e.target.value);
                  if (e.target.value.length == 0) {
                    setNoSuchElement(false);
                    setData(posts);
                  }
                  const newData = await axios.get("http://localhost:8080/getItems/" + curCategory + "?q=" + e.target.value);
                  if (newData.data.length > 0) {

                    setData(newData.data);
                    handleChangeRightData(newData.data[0])
                  }
                  else {
                    setData([]);
                    handleChangeRightData(null);
                    setNoSuchElement(true);
                    setPostUserEmail("");
                    setPostLocation("");
                    setPostDescription("");
                    setPostUserPhone("");

                  }

                }}

              />

            </div>
            <div className="sortBy" >
              <button className="sortByBtn">
                {orderBy}
                <i className="arrow down" style={{
                  border: 'solid rgb(0, 0, 0)',
                  borderWidth: '0 3px 3px 0',
                  display: 'inline-block',
                  position: 'static',
                  padding: '2px',
                  marginLeft: '18px',
                  marginBottom: '2px',
                  color: 'black'
                }}></i>
              </button>
              <div className="sortBy-content">
                <div onClick={
                  () => {
                    var tmp = [].concat(data).sort((a, b) => a.postDate < b.postDate ? 1 : -1);
                    setData(tmp);
                    setOrderBy("newest to oldest")
                  }
                }>newest to oldest</div>
                <div onClick={
                  () => {
                    var tmp = [].concat(data).sort((a, b) => a.postDate > b.postDate ? 1 : -1);
                    setData(tmp);
                    setOrderBy("oldest to newest");
                  }
                }>oldest to newest</div>
                <div onClick={
                  () => {
                    var tmp = [].concat(data).sort((a, b) => a.name > b.name ? 1 : -1);
                    setData(tmp);
                    setOrderBy("A - Z");
                  }

                }>A - Z</div>
                <div onClick={
                  () => {
                    if (orderBy == "Z - A") return;
                    var tmp = [].concat(data).sort((a, b) => a.name < b.name ? 1 : -1);
                    setData(tmp);
                    setOrderBy("Z - A")
                  }
                }>Z - A</div>



              </div>
            </div>


            <div className="sortBy" >
              <button className="sortByBtn">
                {searchByCity}
                <i className="arrow down" style={{
                  border: 'solid rgb(0, 0, 0)',
                  borderWidth: '0 3px 3px 0',
                  display: 'inline-block',
                  position: 'static',
                  padding: '2px',
                  marginLeft: '18px',
                  marginBottom: '2px',
                  color: 'black'
                }}></i>
              </button>
              <div className="sortBy-content">
                {
                  cities.map((i)=>
                    <div key={i} onClick={(e)=>{
                      setSearchByCity(e.target.innerHTML);
                      if(i=='all'){
                        setNoSuchElement(false)
                        setData(originalData);
                        handleChangeRightData(originalData[0]);
                        return ;
                      }
                      var tmp=[].concat(originalData).filter(a=>a.author.location==i);
                      if(tmp.length<1){
                        setNoSuchElement(true);
                      }
                      else setNoSuchElement(false);
                      setData(tmp);
                      if(tmp.length)handleChangeRightData(tmp[0]);
                    }}>{i}</div>
                  )
                }
              </div>

            </div>

          </div>

          <div className="leftDiv">
            {
              (emptyCategory) ? (
                <span style={{ marginLeft: '20%', fontSize: '15px', height: '100%', marginTop: '50%', color: 'red' }}>no elements in this category</span>

              ) : (<></>)
            }
            
            {
              (fetchingOnRight && !noSuchElement) ? (
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
              (noSuchElement && !emptyCategory) ? (

                <span style={{ marginLeft: '40%', fontSize: '15px', marginTop: '50%', color: 'red' }}>no such element</span>
              ) : <></>
            }

                {
                  (data) ? (
                    data.map((item) =>
                      <div key={item.id} className="leftCards" id={item.id}
                        style={item.id == data[0].id ? { backgroundColor: 'rgb(216, 211, 211)' } : {}}
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
                            <Typography gutterBottom variant="h5" component="div">
                              {'Since : ' + item.postDate.substring(0, 10)}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Avatar sx={{ bgcolor: blue[700] }}>{item.author.userName[0].toUpperCase()}</Avatar>
                            <Link to={{pathname:'/viewProfile',search:'?q='+item.author.id}} target={"_blank"}  className="viewProfileLink" >
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


              <Box style={{ marginTop: '0px', marginLeft: '700px', width: '20%', height: 'fit-content', position: 'absolute' }}>

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
                        marginTop: '-22px', marginLeft: '40px', fontSize: '15px', width: 'auto',
                        wordBreak: 'normal', display: 'felx'
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
        <Link to="/myDonations"> my donations</Link>
        <Link to="/" onClick={logout}> logout</Link>
      </div>
    </div>
  )
}