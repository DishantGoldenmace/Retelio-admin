import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

const JwtResetPasswordView = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // TODO: Handle password reset API call here
    console.log('New password set:', password);
    router.push('/jwt/sign-in'); // redirect to login after success
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      px={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Set a password
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 4,
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        Your previous password has been reseted. Please set a new password for your account.
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Create Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              sx: { fontSize: 14, height: 48 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: { fontSize: 14 },
            }}
          />

          <TextField
            label="Re-enter Password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              sx: { fontSize: 14, height: 48 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                    {showConfirm ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: { fontSize: 14 },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              height: 44,
              fontSize: 14,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Set password
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default JwtResetPasswordView;
