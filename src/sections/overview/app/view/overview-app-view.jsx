import { useNavigate } from 'react-router-dom';

// import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { _appRelated, _appFeatured, _appInvoices } from 'src/_mock';
import illustrationMotivation from 'src/assets/images/illustration-motivation.png';

import { useMockedUser } from 'src/auth/hooks';

import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppTopRelated } from '../app-top-related';
import { OrderToConfirm } from '../order-to-confirm';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
// import { SalesOverview } from '../app-top-installed-countries';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Congratulations  ${user?.displayName} !`}
            description="Best seller of the month You have done 57.6% more sales today."
            // img={<SeoIllustration hideBackground />}
            img={<img src={illustrationMotivation} alt="Custom Illustration" />}
            action={
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#333', // optional: slightly lighter on hover
                  },
                }}
              >
                Go now
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={6} xl={3}>
          <AppWidgetSummary
            title="Active Orders"
            percent={8.2}
            total={120}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
            // onClick={() => navigate('/dashboard/sales-overview')}
            sx={{ cursor: 'pointer' }}
          />
        </Grid>

        <Grid xs={12} md={6} xl={3}>
          <AppWidgetSummary
            title="Active Sellers"
            percent={86.6}
            total={50}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Monthly Revenue"
            percent={73.9}
            total={50000}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} xl={3}>
          <AppWidgetSummary
            title="Ongoing Returns"
            percent={73.9}
            total={5}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} xl={3}>
          <AppWidgetSummary
            title="Order Pending"
            percent={73.9}
            total={10}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Sale by categories"
            subheader="Downloaded by operating system"
            chart={{
              series: [
                { label: 'Mens', value: 12244 },
                { label: 'Women', value: 53345 },
                { label: 'Kids', value: 44313 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Yearly sales"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    { name: 'Total income', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    {
                      name: 'Total expenses',
                      data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                    },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'Total income', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Total expenses', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'Total income', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Total expenses', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <OrderToConfirm
            title="New Registered Sellers"
            tableData={_appInvoices}
            headLabel={[
              { id: 'seller', label: 'Seller' },
              { id: 'store', label: 'store' },
              { id: 'country', label: 'Country' },

              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
        {/* <Grid xs={12} lg={12}>
          <ReturntToReview
            title="Returns to Review"
            tableData={_returnReviews}
            headLabel={[
              { id: 'product', label: 'Product' },

              { id: 'customer', label: 'Customer' },

              { id: 'reason', label: 'Reason' },

              { id: '' },
            ]}
          />
        </Grid> */}

        <Grid xs={12} md={12} lg={4}>
          <AppTopRelated title="Latest products" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          {/* <SalesOverview
  metrics={[
    { label: 'Total profit', value: 37406, percentage: 60, color: '#4caf50' },   // green
    { label: 'Total income', value: 1519, percentage: 23, color: '#00bcd4' },    // blue
    { label: 'Total expenses', value: 17214, percentage: 12, color: '#ff9800' }, // orange
  ]}
/> */}
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 320,
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Your current balance
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              $9,990
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography sx={{ color: 'text.disabled' }}>Order total</Typography>
              <Typography sx={{ fontWeight: 500 }}>$10,989</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'text.disabled' }}>Earning</Typography>
              <Typography sx={{ fontWeight: 500 }}>$11,988</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'text.disabled' }}>Refunded</Typography>
              <Typography sx={{ fontWeight: 500 }}>$93.10</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#FFA800', color: '#000', flex: 1 }}>
                Request
              </Button>
              <Button variant="contained" sx={{ bgcolor: '#22C55E', color: '#fff', flex: 1 }}>
                Send
              </Button>
            </Box>
          </Box>
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
