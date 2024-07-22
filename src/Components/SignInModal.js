import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AsyncStorage from '@react-native-async-storage/async-storage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

function SignInModal({ isOpen, onClose, onSignUpClick, navigation }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSignIn = async () => {
    try {
      const user = await AsyncStorage.getItem('@user');
      if (user) {
        const userData = JSON.parse(user);
        if ((userData.username === usernameOrEmail || userData.email === usernameOrEmail) && userData.password === password) {
          setAlert('Sign in successful');
          setTimeout(() => {
            setAlert(null);
            onClose();
            navigation.navigate('Dashboard'); // Navigate to Dashboard screen
          }, 2000);

          // Clear form fields after successful sign-in
          setUsernameOrEmail('');
          setPassword('');
        } else {
          setAlert('Invalid username/email or password');
        }
      } else {
        setAlert('No account found. Please sign up.');
      }
    } catch (error) {
      console.error('Error retrieving data', error);
      setAlert('Error during sign-in');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Sign In</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {alert && <Alert severity={alert === 'Sign in successful' ? 'success' : 'error'}>{alert}</Alert>}
        <TextField
          fullWidth
          label="Username or Email"
          margin="normal"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton size="small">
                <PersonIcon />
              </IconButton>
            )
          }}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton size="small">
                <LockIcon />
              </IconButton>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography variant="body2">Don't have an account?</Typography>
          <Button onClick={onSignUpClick} color="primary" sx={{ ml: 1 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SignInModal;
