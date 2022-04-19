import React from 'react';
import { CssBaseline } from '@material-ui/core';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import Card from '@mui/material/Card';
import IconButton from "@material-ui/core/IconButton";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@mui/system';


const images = [
    { url: require("./assets/1.jpg") },
    { url: require("./assets/2.jpg") },
    { url: require("./assets/3.jpg") },
    { url: require("./assets/4.jpg") },
   
  ];

function Details() {


    return (
        <>
        <CssBaseline />
        <main style={{backgroundImage: `url(${require('./assets/50.jpg')})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100%',
            minHeight:'100%',
           
            }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                //justifyContent: 'space-around',
                overflow: 'hidden',
                padding:70,
            }}>
                <div>
            <SimpleImageSlider
                width={600}
                height={500}
                images={images }
                showBullets={true}
                showNavs={true}

                />

    </div>
    <Box sx={{ maxHeight:60, width:500, alignContent:'center' }} style={{margin:40, alignItems:'center'}}>

    <Card sx={{ml:5, mt:2, backgroundColor:'#607d8b'}} style={{boxShadow:'0 3px 5px 2px rgba(0,0,0,1)'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              <PersonIcon fontSize='large' />Donor Name:</Typography>
            </CardContent>
          </Card>

          <Card sx={{ml:5, mt:2, backgroundColor:'#607d8b',}}
           style={{boxShadow:'0 3px 5px 2px rgba(0,0,0,1)'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  <LocationOnIcon fontSize='large'/>
                Location: 
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ml:4, mt:5, width:500, height:200}} style={{boxShadow:'0 3px 5px 2px rgba(0,0,0,1)'}}>
                <CardContent>
                <Typography variant="h5" component="div">
                    descrption: 
                    <Box sx={{ border: 1 , padding:'30'}} />
                        <IconButton onClick={()=>console.log('test')}>
                            <LocalPostOfficeIcon fontSize='large' />
                        </IconButton>
                        <IconButton onClick={()=>console.log('test')}>
                            <PhoneIcon fontSize='large'/>
                        </IconButton>
                        <IconButton onClick={()=>console.log('test')}>
                            <WhatsAppIcon fontSize='large'/>
                        </IconButton>
                        <IconButton onClick={()=>console.log('test')}>
                            <FacebookIcon fontSize='large'/>
                        </IconButton>
                </Typography>
                </CardContent>
                
            </Card>
            </Box>
    </div>  
        </main>
        </>
    );
}

export default Details;