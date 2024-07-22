import React from 'react';
import { Button, Card, CardMedia, Typography, Box, AppBar, Toolbar, Container } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../src/asserts/quote-if-you-dress-a-new-something-in-old.jpg';
import image2 from '../../src/asserts/quote-the-compound-effect-is-the-principle-of-reaping-huge-rewards-from-a-series-of-small-darren-hardy-149-79-13.jpg';
import image3 from '../../src/asserts/20221114_172023.jpg';
import image4 from '../../src/asserts/gretchen rubin.jpg';
import image5  from '../../src/asserts/20221114_172023.jpg';

import image from '../../src/asserts/A.P.J_Abdul_Kalam.jpg';

const images = [image1, image2, image3, image4, image5];

const avatarStyle = {
  width: '80px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '20px'
};

function WelcomeScreen({ onSignUpClick, onSignInClick }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box 
    height="100vh"
    //  bgcolor="#6a5acd"
      // bgcolor="#fff"
      bgcolor='rgb(18,9,79)'
      display="flex" 
      flexDirection="column"
      
      alignItems="center">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={onSignUpClick} style={{ marginRight: '10px' }}>
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" onClick={onSignInClick}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '-72px', marginRight: 80 }}>
        <img src={image} alt="Avatar" style={avatarStyle} />
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <Typography variant="h2" color ='#fff'align="center" gutterBottom>
            Reigned Supreme
          </Typography>
        </Box>
      </Container>
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} width="100%">
        <Slider {...settings} style={{ width: '50%' }}>
          {images.map((image, index) => (
            <Card key={index}>
              <CardMedia
                component="img"
                height="300"
                image={image}
                alt={`Image ${index}`}
                style={{ borderRadius: '5%' }}
              />
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default WelcomeScreen;
