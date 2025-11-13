import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Link, Stack, Button, TextField, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

// Define schema with zod
const ForgotPasswordSchema = zod.object({
  email: zod.string().min(1, 'Email is required').email('Invalid email'),
});
const JwtForgotPasswordView = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data) => {
    console.log('Forgot password submitted with:', data);

    // Simulate sending request
    await new Promise((res) => setTimeout(res, 1000));
    // Redirect after success
    router.push('/jwt/forgot-verify');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10} px={2}>
      <Link
        component="button"
        underline="none"
        onClick={() => router.push('/jwt/sign-in')}
        sx={{ display: 'inline-block', mb: 2 }}
      >
        ← Back to login
      </Link>

      <Typography variant="h4" gutterBottom>
        Forgot your password?
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Don’t worry, happens to all of us. Enter your email below to recover your password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default JwtForgotPasswordView;
