import { CssBaseline } from '@material-ui/core';
import { React } from 'react'
import { Grid } from '@mui/material';
import Container from '@material-ui/core/Container';
import './css/home.css'
import useToken from './service/useToken'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useUsername from "./service/useUsername";
import gmp from './assets/gmp.jpg';
import middlePhoto from './assets/middlePhoto.jpg';
export default function () {


    const { token, setToken } = useToken();
    const { username, setUsername } = useUsername();

    return (
        <CssBaseline>
            <div className='homeParDiv'>
                <div className='homeBody'>
                    <div className='bg'>

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
                                <Link to={(token) ? '/createPost' : '/login'}>
                                    <Button color="inherit" className='buttton' style={{ border: '1px solid rgb(200,200,200)', marginRight: '10px' }}>
                                        <h4 style={{ color: 'white' }}>donate now</h4>
                                    </Button>
                                </Link>
                                {
                                    (username) ? (

                                        showUser(username)
                                    ) : (
                                        <></>
                                    )
                                }

                            </Toolbar>
                        </AppBar>
                        <div className='upperDiv'>
                            <div className='helpText'>
                                <p> We help each <br></br>other</p>
                                <p style={{ color: 'white', fontSize: 'x-large' }}>
                                    By donating things we don't<br></br>
                                    need so that others can benefit<br></br>
                                    from it

                                </p>
                                <div className='buttons'>
                                {
                                    (!username)?(
                                    <div className='ButtonContainer' style={{justifyContent:'space-between'}}>
                                        <Link to="/register" >
                                            <button className='registerStyledBtn' >Register</button>
                                        </Link>
                                    
                                        <Link to="/login">

                                            <button className='loginStyledBtn' >login</button>
                                        </Link>
                                    </div>
                                    ):(
                                        <div className='ButtonContainer' >
                                        <Link to="/personalPage" >
                                            <button className='registerStyledBtn' >personal page</button>
                                        </Link>
                                    </div>
                                    )
                                }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='middleDiv'>
                        <div className='left'>
                            <div className='leftContent'>

                                <h1 style={{ color: 'rgb(102, 174, 237)' }}> Content</h1>
                                <p style={{fontSize:'large' ,marginTop:'-5px'}}>
                                    you can know the products <br></br>
                                    and donations in your area <br></br>
                                    by searching for your city <br></br>
                                    and you will receive all offers, <br></br>
                                    discounts and free donations <br></br>
                                    and bla bla bla bla bla bla <br></br>
                                </p>
                            </div>
                        </div>
                        <div className='right'>
                            <div className="rightContent" >
                                <img className='middlePhoto' src={middlePhoto}></img>
                            </div>

                        </div>

                    </div>
                    <div className='bottomDiv'>
                        <div>
                        </div>

                        {
                            getFooter()
                        }
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
function getFooter() {

    return (


        <div style={{ height: '7rem', border: '10px solid transparent', background: 'rgba(0,0,0,0.5)' ,marginTop:'auto'}} >
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
