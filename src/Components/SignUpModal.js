// import React from 'react';
// import {
//   Modal, Box, TextField, Button, Typography, IconButton
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const modalStyle = {
//   position: 'absolute',
//   top: '56%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   maxHeight: '80vh',
//   overflowY: 'auto',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: '10px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   height: "70%" // Adjusted height to accommodate additional elements
// };

// function SignUpModal({ isOpen, onClose, onSignInClick }) {
//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box sx={modalStyle}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2}>
//           <Typography variant="h6">Sign Up</Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Box 
//           width="100%"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           overflow="auto"
//           style={{ height: '100%' }}
//         >
//           <TextField 
//             fullWidth 
//             label="First Name" 
//             margin="normal" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <TextField 
//             fullWidth 
//             label="Last Name" 
//             margin="normal" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <TextField 
//             fullWidth 
//             label="Email" 
//             margin="normal" 
//             type="email" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <TextField 
//             fullWidth 
//             label="Username" 
//             margin="normal" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <TextField 
//             fullWidth 
//             label="Password" 
//             margin="normal" 
//             type="password" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <TextField 
//             fullWidth 
//             label="Confirm Password" 
//             margin="normal" 
//             type="password" 
//             InputLabelProps={{ style: { fontSize: 14 } }} 
//           />
//           <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//             Sign Up
//           </Button>
//           <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
//             <Typography variant="body2">Already have an account?</Typography>
//             <Button onClick={onSignInClick} color="primary" sx={{ ml: 1 }}>
//               Sign In
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// export default SignUpModal;
import React, { useState } from 'react';
import {
  Modal, Box, TextField, Button, Typography, IconButton, Alert, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AsyncStorage from '@react-native-async-storage/async-storage';

const modalStyle = {
  position: 'absolute',
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: "70%" // Adjusted height to accommodate additional elements
};

function SignUpModal({ isOpen, onClose, onSignInClick }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSignUp = async () => {
    // Validate all fields are filled
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setAlert('Please fill in all fields');
      return;
    }

    // Validate username length
    if (username.length < 6) {
      setAlert('Username should be at least 6 characters long');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
      return;
    }

    // Validate strong password criteria
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setAlert('Password should contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      return;
    }

    // Save user data to AsyncStorage
    try {
      const user = { firstName, lastName, email, username, password };
      await AsyncStorage.setItem('@user', JSON.stringify(user));

      // Clear form fields after successful signup
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      // Show success alert and navigate to sign-in
      setAlert('Registration successful');
      setTimeout(() => {
        setAlert(null);
        onSignInClick();
      }, 5000);
    } catch (error) {
      console.error('Error saving data', error);
      setAlert('Error registering user');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderConfirmPasswordIcon = () => {
    if (!confirmPassword) {
      return null;
    }

    if (password === confirmPassword) {
      return <CheckCircleIcon style={{ color: 'green' }} />;
    } else {
      return <ErrorIcon style={{ color: 'red' }} />;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2}>
          <Typography variant="h6">Sign Up</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {alert && <Alert severity={alert === 'Registration successful' ? 'success' : 'error'}>{alert}</Alert>}
        <Box 
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          overflow="auto"
          style={{ height: '100%' }}
        >
          <TextField 
            fullWidth 
            label="First Name" 
            margin="normal" 
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            fullWidth 
            label="Last Name" 
            margin="normal" 
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            fullWidth 
            label="Email" 
            margin="normal" 
            type="email" 
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            fullWidth 
            label="Username" 
            margin="normal" 
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            fullWidth 
            label="Password" 
            margin="normal" 
            type={showPassword ? 'text' : 'password'}
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            fullWidth 
            label="Confirm Password" 
            margin="normal" 
            type="password" 
            InputLabelProps={{ style: { fontSize: 14 } }} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {renderConfirmPasswordIcon()}
                </InputAdornment>
              ),
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Typography variant="body2">Already have an account?</Typography>
            <Button onClick={onSignInClick} color="primary" sx={{ ml: 1 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
