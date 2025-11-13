import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { PickupScheduling } from 'src/sections/file-manager/pickup-scheduling';
import { OrderDetailsInfo } from 'src/sections/file-manager/order-details-info';
import { OrderDetailsItems } from 'src/sections/file-manager/order-details-item';

import { OrderDetailsToolbar } from '../../../file-manager/order-details-toolbar';


export function OrderSchdulingView() {
  return (
    <DashboardContent maxWidth="xl">
      <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber="INV-12345"
        createdAt="20 Jul 2025 4:34 pm"
        status="New" // or "Awaiting Confirmation"
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              // items={order?.items}
              taxes="10.00"
              shipping="10.00"
              discount="10.00"
              subtotal="337.93"
              totalAmount="349.72"
            />
            <PickupScheduling/>
          </Stack>
        </Grid>
        <OrderDetailsInfo />
      </Grid>
    </DashboardContent>
  );
}
