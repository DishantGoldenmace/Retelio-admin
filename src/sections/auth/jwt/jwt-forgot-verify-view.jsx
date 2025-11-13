import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
  Box,
  Link,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';




const JwtForgotVerifyView = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call or validation
    console.log('Verification code submitted:', code);

    // Redirect to reset password page
    router.push('/jwt/reset-password');
  };

  return (
   
      <Box maxWidth={420} mx="auto" mt={10} px={2}>
        <Link
          component="button"
          underline="none"
          onClick={() => router.push('/jwt/sign-in')}
          sx={{ display: 'inline-block', mb: 2, fontSize: 14 }}
        >
          ← Back to login
        </Link>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Verify code
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        An authentication code has been sent to your email.
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Enter Code"
            type={showCode ? 'text' : 'password'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowCode(!showCode)} edge="end">
                    {showCode ? <FiEyeOff /> : <FiEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="caption" sx={{ mt: -1 }}>
            Didn’t receive a code?{' '}
            <Link component="button" color="error" underline="none">
              Resend
            </Link>
          </Typography>

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
              Verify
            </Button>
          </Stack>
        </form>
      </Box>
   
  );
};

export default JwtForgotVerifyView;
