import React from "react";
import { CssBaseline } from '@material-ui/core';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './css/Category.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import useToken from "./service/useToken";
import useUsername from "./service/useUsername";
const imageApi = "http://localhost:8080/getCategoryImage?id=";
const API_URL = "http://localhost:8080/getCategories";
export default function Category() {



  /*const [data, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(
      (result) => {
        setItems(result);
      }
      )
    }, [])
*/
  const { token, setToken } = useToken();
  const { username, setUsername } = useUsername();

  const { status, data, error, isFetching } = useQuery("posts", async () => {
    const { data } = await axios.get(API_URL);
    return data;
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  if (isFetching) {
    return (
      <div className="loading">

        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
  return (
    < >
      <CssBaseline />
      <div className="bdy">
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
        <main className="main" style={{
          background: 'url("../assets/bk-category.jpg") no-repeat center center fixed'
        }} >

          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {
              data.map((item) =>
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <Card className="card" sx={{ width: 200 }} style={{
                    margin: 20,
                    marginLeft: 50,
                    height: 200,
                    transition: 'transform .3s',
                    borderRadius: '20px'

                  }}>
                    
                    <a href={`/Category/${item.name}`} style={{ textDecoration: 'none' }}>


                      <CardMedia
                        component="img"
                        height="150"
                        src={imageApi + item.id}
                        alt="green iguana"

                      />
                      <CardContent className="cardContent">
                        <h3 className="catName">{item.name}</h3>
                      </CardContent>
                    </a>
                  </Card>
                </Grid>

              )}
          </Grid>

        </main>

        {
          getFooter()
        }

      </div>
    </>


  );
}
function showUser(username) {
  const logout=()=>{
    localStorage.clear();
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
function getFooter() {

  return (


    <div style={{ height: '7rem', border: '10px solid transparent', background: 'rgba(0,0,0,0.7)' }} >
      <Container maxWidth="lg" bgcolor="text.secondary" className="footer">
        <Grid container spacing={1} >
          <Grid item xs={12} sm={6}  >
            <h3 style={{ marginTop: '0px' }}>Help
            </h3>

            <div>
              <Link to="/privacy" style={{ textDecoration: 'none' }}>
                <Button color="inherit" className='buttton' style={{ float: 'left', border: '1px solid rgb(200,200,200)' }}>

                  <h4 style={{ color: 'white' }}>Privacy</h4>

                </Button>
              </Link>

            </div>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)' }}>

                <h4 style={{ color: 'white' }}>contact</h4>

              </Button>
            </Link>

          </Grid>
          <Grid item xs={12} sm={6} >
            <h3 style={{ marginTop: '0px' }}>Account</h3>
            <div style={{ float: 'left' }}>
              <Link to="/login" style={{ textDecoration: 'none' }} >
                <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)' }}>

                  <h4 style={{ color: 'white' }}>login</h4>

                </Button>
              </Link>
            </div>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)' }}>

                <h4 style={{ color: 'white' }}>register</h4>

              </Button>
            </Link>

          </Grid>

        </Grid>
      </Container>
    </div>





  );


}
//export default function Category;
