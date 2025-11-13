import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';

const SignUpSchema = zod
  .object({
    shopName: zod.string().min(1, 'Shop name is required'),
    firstName: zod.string().min(1, 'Owner name is required'),
    lastName: zod.string().min(1, 'Owner surname is required'),
    email: zod.string().email('Invalid email').min(1, 'Email is required'),
    phone: zod.string().min(1, 'Phone number is required'),
    dob: zod.string().min(1, 'Date of birth is required'),
    age: zod.string().min(1, 'Age is required'),
    address: zod.string().min(1, 'Address is required'),
    city: zod.string().min(1, 'City is required'),
    zipCode: zod.string().min(1, 'Zip code is required'),
    referralCode: zod.string().optional(),
    pivaCode: zod.string().optional(),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod.string(),
    agreeToTerms: zod.boolean().refine((val) => val, 'You must agree to terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const JwtSignUpView = () => {
  const { checkUserSession } = useAuthContext();
  const router = useRouter();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    shopName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    age: '',
    address: '',
    city: '',
    zipCode: '',
    referralCode: '',
    pivaCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Typography variant="h4">Sign up</Typography>
        <Typography variant="body2">
          Let &apos;s get you all set up so you can access your personal account.
        </Typography>

        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Field.Text name="shopName" label="Shop Name" />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field.Text name="firstName" label="Owner name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.Text name="lastName" label="Owner surname" />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field.Text name="email" label="Email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.Text name="phone" label="Phone Number" />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field.Text
              name="dob"
              label="Date of birth"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.Text name="age" label="Age"  />
          </Grid>
        </Grid>

        <Field.Text name="address" label="Address or shipment / delivery point" />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field.Text name="city" label="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.Text name="zipCode" label="Zip code" />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field.Text name="referralCode" label="Referral code" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field.Text name="pivaCode" label="P-IVA code" />
          </Grid>
        </Grid>

        <Field.Text
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="confirmPassword"
          label="Confirm Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={<Field.Checkbox name="agreeToTerms" />}
          label={
            <>
              I agree to all the{' '}
              <Link href="#" underline="always" color="text.primary">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="#" underline="always" color="text.primary">
                Privacy Policies
              </Link>
            </>
          }
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>

        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/jwt/sign-in"
            variant="subtitle2"
            color="green"
            sx={{ alignSelf: 'flex-end' }}
          >
            Login
          </Link>
        </Typography>
      </Stack>
    </Form>
  );
};

export default JwtSignUpView;
