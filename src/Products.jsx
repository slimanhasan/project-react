import React from "react";
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
import { deepOrange } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@mui/system';
const images = [
  { url: require("./assets/1.jpg") },
  { url: require("./assets/2.jpg") },
  { url: require("./assets/3.jpg") },
  { url: require("./assets/4.jpg") },
];
const newData = [
  {
    img: require('./assets/1.jpg'),
    title: 'product Name',
    owner: 'batoul',

  },
  {
    img: require('./assets/3.jpg'),
    title: 'Product Name',
    owner: 'batoul',

  },
  {
    img: require('./assets/2.jpg'),
    title: 'Product Name',
    owner: 'batoul',
  },
  {
    img: require('./assets/4.jpg'),
    title: 'Product Name',
    owner: 'batoul',
  },
  {
    img: require('./assets/4.jpg'),
    title: 'Product Name',
    owner: 'batoul',
  },
  {
    img: require('./assets/4.jpg'),
    title: 'Product Name',
    owner: 'batoul',
  },
  {
    img: require('./assets/4.jpg'),
    title: 'Product Name',
    owner: 'batoul',
  },
]

export default function () {
  const { token, setToken } = useToken();
  const { username, setUsername } = useUsername();
  return (

    <CssBaseline>
      <div className="postsParDiv">
        <AppBar position="static"
          style={{ background: 'rgba(0,0,0,0.7)' }}
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
        <div className="tools"></div>
        <div className="leftDiv">
          <div style={{
            display: 'contents',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            padding: 10,
          }}>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              overflowY: 'scroll',
            }}>
              {newData.map((item) =>
                <Card sx={{ width: '100%', borderBottom: '1px solid black', backgroundColor: 'rgb(242, 240, 240)' }} >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {'Product: ' + item.title}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {'Owner: ' + item.owner}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography gutterBottom variant="h5" component="div">
                      Profile:
                    </Typography>
                    <Avatar sx={{ bgcolor: deepOrange[250] , color:'black'}}>B</Avatar>
                    <Button bgcolor='green' style={{marginRight:'10px', borderStyle:'dashed'}}>view</Button>
                  </CardActions>
                </Card>
              )}
            </div>
          </div>
        </div>
        <div className="rightDiv">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'visible',
            padding: 40,
          }}>
            <div >
              <SimpleImageSlider 
                width={600}
                height='66%'
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay='on'
                
              />

            </div>
            <Box style={{ marginLeft: '25px',width:'40%' , height:'50vh'}}>

              <Card sx={{ width:'70%', backgroundColor: 'rgba(20,200,100,0.2)' }} 
                style={{ boxShadow: '0 3px 5px 2px rgba(0,0,0,1)' ,}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <PersonIcon fontSize='small' />
                    Donor Name: batoul
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width:'70%', backgroundColor: 'rgba(20,200,100,0.2)' }}
                 style={{ boxShadow: '0 3px 5px 2px rgba(0,0,0,1)' , marginTop:'20px' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <LocationOnIcon fontSize='small' />
                    Location: Tartous
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width:'70%', overflow: 'hidden',marginTop:'20px' , height:'78%',
                        backgroundColor: 'rgba(20,200,100,0.2)' ,boxShadow: '0 3px 5px 2px rgba(0,0,0,1)'}} >
                <CardContent>
                  <Typography variant="h5" component="div">
                    <ArticleIcon fontSize="small"></ArticleIcon>
                    descrption:
                    
                  </Typography>
                </CardContent>

              </Card>
            </Box>
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
        <Link to="/myPosts"> my posts</Link>
        <Link to="/" onClick={logout}> logout</Link>
      </div>
    </div>
  )
}