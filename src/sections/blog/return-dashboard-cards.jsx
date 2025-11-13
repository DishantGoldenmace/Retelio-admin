// src/sections/return/return-dashboard-cards.jsx

import { Box, Grid, Card, Stack, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const summaryData = [
  {
    label: 'Total Requests',
    value: 248,
    icon: 'mdi:file-document',
    color: 'primary',
    note: '+12% from last month',
  },
  {
    label: 'Pending',
    value: 42,
    icon: 'ic:round-access-time',
    color: 'warning',
    note: 'Requires attention',
  },
  {
    label: 'Approved',
    value: 156,
    icon: 'eva:checkmark-circle-2-fill',
    color: 'success',
    note: '+8% approval rate',
  },
  {
    label: 'Rejected',
    value: 50,
    icon: 'ic:round-cancel',
    color: 'error',
    note: '-3% rejection rate',
  },
];

export default function ReturnDashboardCards() {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {summaryData.map((item) => (
        <Grid key={item.label} item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: `${item.color}.light`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon={item.icon} width={24} color={`${item.color}.main`} />
              </Box>
              <Box>
                <Typography variant="h6">{item.value}</Typography>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.note}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
