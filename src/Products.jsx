import React from 'react';
import { Grid } from '@mui/material';

import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import './css/Products.css';
  import Button from "@mui/material/Button";


import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const imageApi="http://localhost:8080/getItemImage?id=";
const API_URL = "http://localhost:8080/getItems/";
export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image:null
    }
  }
  /*
    handleSearch = () => {
      window.location.href = "/Category/" + params.name + "?q=" + document.getElementById('SearchInput').value;
    }
  */
     getParam() {
      
    }
    componentDidMount(){
      const API_URL = "http://localhost:8080/getItems/";
      var url=window.location.href;
      var j=url.lastIndexOf('/');
      var catName="";
      for(var i=j+1;i<url.length;i++)catName+=url.charAt(i);

        fetch(API_URL+catName)
        .then(res => res.json())
        .then((result) => {
          this.setState({data:result});
        })
    }
    handleImage(itemId){
      var imagesApi="http://localhost:8080/getItemImage?id="+itemId;
    
      var ret=null;
     
      fetch(imagesApi,{
           headers:{
             'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
       })
       .then(result=> result.json())
       .then(result=> {
         this.setState()

       })
     
    }
  
  render() {
    return (
      <>

        <CssBaseline />


        <div className='allPage'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <AppBar position="static"
            style={{ background: 'rgba(0,0,0,0.7)' }}
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
          <AppBar position='relative' style={{ background: '#004d40', width: 'cover' }}  >
            <Toolbar>
              <Typography variant='h6' >
                Products
              </Typography >
              <div class="search">
                <input id="SearchInput" required style={{ background: 'white', fontSizeize: '50px' }} type="search" placeholder="Search here..." />
                <button type="button" className='searchButton' style={{height:'42px'}}>Search</button>
              </div>
            </Toolbar>
          </AppBar>

          <main  >
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >

              {
                this.state.data.map((item) =>
                  <Grid key={item.id} item xs={12} sm={6} md={3} justifyContent="center">
                    <Card sx={{ Width: 200 }} style={{
                      margin: 20, width: 200, transition: 'transform .3s',
                      boxShadow: '5px 10px 20px 1px rgba(0,0,0,0.8)'
                    }}
                      className="card"
                    >

                      <Link to='/Details' style={{ textDecoration: 'none' }}>
                       
                        <CardMedia
                          component="img"
                          height="140"
                          image={imageApi+item.id}
                          alt="green iguana"

                        />

                        <CardContent className="cardContent">
                          <h3 className='content'>
                            {item.name}
                          </h3>
                        </CardContent>

                      </Link>
                    </Card>
                  </Grid>
                )}
            </Grid>

          </main>

        </div>
        <div className='productFooter'>
          <div style={{ position: 'static', bottom: '0', border: '10px solid transparent', background: 'rgba(0,0,0,0.7)' }} className="appBar">
            <Container maxWidth="lg" bgcolor="text.secondary" className="footer" style={{}}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}  >
                  <Box ><h3>Help</h3></Box>
                  <hr color='white'></hr>

                  <div>
                    <Button style={{ float: 'left', border: '1px solid rgb(200,200,200)', marginTop: '10px' }} className="buttton" color="inherit" ><h3>Privacy</h3></Button>
                  </div>
                  <Button style={{ border: '1px solid rgb(200,200,200)', marginTop: '10px' }} color="inherit" className="buttton"  ><h3>Contact</h3></Button>
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Box><h3>Account</h3></Box>
                  <hr color='white'/>
                  <div style={{ float: 'left' }}>
                    <Button color="inherit" style={{ alignContent: 'start', border: '1px solid rgb(200,200,200)', marginTop: '10px' }} className="buttton" ><h3>login</h3></Button>
                  </div>
                  <Button style={{ border: '1px solid rgb(200,200,200)', marginTop: '10px' }} color="inherit" className="buttton"  ><h3>register</h3></Button>
                </Grid>

              </Grid>
            </Container>
          </div>

        </div>
      </>
    );

  }

  getFooter() {




  }
}
