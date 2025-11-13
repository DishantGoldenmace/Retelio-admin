import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------

export function OrderDetailsInfo({ customer, delivery, payment, shippingAddress }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleBlacklist = () => {
    console.log('Blacklisted:', effectiveCustomer?.name);
    setOpenConfirm(false);
  };

  const location = useLocation();
  const locationCustomer = location.state?.customer;

  const effectiveCustomer = locationCustomer || customer;

  const renderCustomer = (
    <>
      <CardHeader
        title="Customer info"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={effectiveCustomer?.name}
          src={effectiveCustomer?.avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{effectiveCustomer?.name}</Typography>

          {/* Email with copy */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: 'text.secondary' }}>{effectiveCustomer?.email}</Box>
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(effectiveCustomer?.email)}
            >
              <Iconify icon="eva:copy-fill" />
            </IconButton>
          </Stack>

          {/* IP Address with copy */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: 'text.secondary' }}>IP: {effectiveCustomer?.ipAddress}</Box>
            <IconButton size="small">
              <Iconify icon="eva:copy-fill" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Are you sure you want to blacklist {customer?.name}?</DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleBlacklist}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader
        title="Delivery"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Ship by
          </Box>
          {delivery?.shipBy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Speedy
          </Box>
          {delivery?.speedy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tracking No.
          </Box>
          <Link underline="always" color="inherit">
            {delivery?.trackingNumber}
          </Link>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Shipping"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {shippingAddress?.fullAddress}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>
          {shippingAddress?.phoneNumber}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <Card sx={{ borderRadius: 2, p: 2 }}>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
        sx={{ p: 0, mb: 2 }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Method
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">**** **** **** 5678</Typography>
          <Iconify icon="logos:mastercard" width={24} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mdi:cloud-download-outline" />}
          sx={{
            backgroundColor: '#0f0f0f',
            color: '#fff',
            borderRadius: 2,
            textTransform: 'none',
            py: 1.2,
            fontWeight: 600,
            px: 3, // optional: controls button width
          }}
        >
          Download Invoice
        </Button>
      </Box>

      <Typography
        variant="body2"
        align="center"
        color="text.primary"
        sx={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}
      >
        Report a problem
      </Typography>
    </Card>
  );

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderDelivery}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}
