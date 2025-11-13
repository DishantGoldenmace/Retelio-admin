import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Link,
  Paper,
  Table,
  Button,
  Select,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Breadcrumbs,
  TableContainer,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import ClockIcon from '../../../../assets/images/clock.png';
import ChartIcon from '../../../../assets/images/chart.png';
import WarningIcon from '../../../../assets/images/warning.png';
import DollarIcon from '../../../../assets/images/dollaricon.png';
import StripeLogo from '../../../../assets/images/stripe-logo.png'; // use your uploaded image
import SyncIcon from '../../../../assets/images/sync.png'; // icon for Sync Data
import FilterIcon from '../../../../assets/images/Filter.png';
import PendingIcon from '../../../../assets/images/pending.png';
import ErrorIcon from '../../../../assets/images/error-icon.png';
import CancelIcon from '../../../../assets/images/cancel-icon.png';
import SettingsIcon from '../../../../assets/images/settingsicon.png';
import ProcessingIcon from '../../../../assets/images/processing.png';

// import { _bookings, _bookingNew, _bookingReview } from 'src/_mock';

const cards = [
  {
    title: 'Total Earnings',
    value: '$24,580.50',
    icon: DollarIcon,
    subText: '+12.5% from last month',
    subTextColor: 'success.main',
    bgColor: '#ecfdf5',
  },
  {
    title: 'Pending Payouts',
    value: '$3,240.00',
    icon: ClockIcon,
    subText: '5 transactions',
    subTextColor: 'text.secondary',
    bgColor: '#fefce8',
  },
  {
    title: 'Failed Transactions',
    value: '$156.00',
    icon: WarningIcon,
    subText: '2 transactions',
    subTextColor: 'error.main',
    bgColor: '#fef2f2',
  },
  {
    title: 'Success Rate',
    value: '98.2%',
    icon: ChartIcon,
    subText: '+0.3% improvement',
    subTextColor: 'success.main',
    bgColor: '#f0f9ff',
  },
];

const data = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 2100 },
  { name: 'Mar', amount: 2900 },
  { name: 'Apr', amount: 3200 },
  { name: 'May', amount: 4000 },
  { name: 'Jun', amount: 4600 },
  { name: 'Jul', amount: 4200 },
  { name: 'Aug', amount: 4400 },
  { name: 'Sep', amount: 4100 },
  { name: 'Oct', amount: 4800 },
  { name: 'Nov', amount: 5200 },
  { name: 'Dec', amount: 5400 },
];

const payouts = [
  {
    date: 'Dec 15, 2024',
    amount: 2450.0,
    fee: 71.28,
    net: 2378.72,
    status: 'Completed',
  },
  {
    date: 'Dec 10, 2024',
    amount: 1890.5,
    fee: 54.83,
    net: 1835.67,
    status: 'Completed',
  },
];

const pendingPayouts = [
  {
    amount: 1240.0,
    expected: 'Dec 18, 2024',
    status: 'Processing',
    icon: ProcessingIcon,
    bg: '#fefce8',
    badgeColor: '#facc15',
    textColor: '#92400e',
  },
  {
    amount: 2000.0,
    expected: 'Dec 20, 2024',
    status: 'Pending',
    icon: ErrorIcon,
    bg: '#eff6ff',
    badgeColor: '#60a5fa',
    textColor: '#1e3a8a',
  },
];

const failedTransactions = [
  {
    amount: 89.99,
    message: 'Card declined',
    icon: PendingIcon,
  },
  {
    amount: 66.01,
    message: 'Insufficient funds',
    icon: CancelIcon,
  },
];

export function OverviewBookingView() {
  return (
    <DashboardContent maxWidth="xl">
      {/* <Grid container spacing={3} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total booking"
            percent={2.6}
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Sold"
            percent={0.2}
            total={311000}
            icon={<CheckInIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Canceled"
            percent={-0.1}
            total={124000}
            icon={<CheckoutIllustration />}
          />
        </Grid>

        <Grid container xs={12}>
          <Grid xs={12} md={7} lg={8}>
            <Box
              sx={{
                mb: 3,
                p: { md: 1 },
                display: 'flex',
                gap: { xs: 3, md: 1 },
                borderRadius: { md: 2 },
                flexDirection: 'column',
                bgcolor: { md: 'background.neutral' },
              }}
            >
              <Box
                sx={{
                  p: { md: 1 },
                  display: 'grid',
                  gap: { xs: 3, md: 0 },
                  borderRadius: { md: 2 },
                  bgcolor: { md: 'background.paper' },
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                }}
              >
                <BookingTotalIncomes
                  title="Total incomes"
                  total={18765}
                  percent={2.6}
                  chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    series: [{ data: [10, 41, 80, 100, 60, 120, 69, 91, 160] }],
                  }}
                />

                <BookingBooked
                  title="Booked"
                  data={_bookingsOverview}
                  sx={{ boxShadow: { md: 'none' } }}
                />
              </Box>

              <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Sold', percent: 73.9, total: 38566 },
                    { label: 'Pending for payment', percent: 45.6, total: 18472 },
                  ],
                }}
                sx={{ boxShadow: { md: 'none' } }}
              />
            </Box>

            <BookingStatistics
              title="Statistics"
              chart={{
                series: [
                  {
                    name: 'Weekly',
                    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                    data: [
                      { name: 'Sold', data: [24, 41, 35, 151, 49] },
                      { name: 'Canceled', data: [20, 56, 77, 88, 99] },
                    ],
                  },
                  {
                    name: 'Monthly',
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    data: [
                      { name: 'Sold', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] },
                      { name: 'Canceled', data: [46, 46, 43, 58, 40, 59, 54, 42, 51] },
                    ],
                  },
                  {
                    name: 'Yearly',
                    categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    data: [
                      { name: 'Sold', data: [76, 42, 29, 41, 27, 96] },
                      { name: 'Canceled', data: [46, 44, 24, 43, 44, 43] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={5} lg={4}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              <BookingAvailable
                title="Tours available"
                chart={{
                  series: [
                    { label: 'Sold out', value: 120 },
                    { label: 'Available', value: 66 },
                  ],
                }}
              />

              <BookingCustomerReviews
                title="Customer reviews"
                subheader={`${_bookingReview.length} Reviews`}
                list={_bookingReview}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid xs={12}>
          <BookingNewest
            title="Newest booking"
            subheader={`${_bookingNew.length} bookings`}
            list={_bookingNew}
          />
        </Grid>

        <Grid xs={12}>
          <BookingDetails
            title="Booking details"
            tableData={_bookings}
            headLabel={[
              { id: 'destination', label: 'Destination' },
              { id: 'customer', label: 'Customer' },
              { id: 'checkIn', label: 'Check in' },
              { id: 'checkOut', label: 'Check out' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
      </Grid> */}

      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 } }}>
        {/* ✅ Header and Breadcrumb */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Stripe Earnings
          </Typography>

          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Dashboard
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Sell
            </Link>
            <Typography color="text.primary">Stripe Earnings</Typography>
          </Breadcrumbs>
        </Box>

        {/* ✅ Metrics Cards */}
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  p: 2.5,
                  boxShadow: 1,
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {card.value}
                  </Typography>
                  <Typography variant="caption" color={card.subTextColor}>
                    {card.subText}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={card.icon}
                    alt={card.title}
                    sx={{ width: 28, height: 28 }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Earnings Overview Chart */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid #eee',
                borderRadius: 2,
                p: 2,
                height: '100%',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Earnings Overview
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    fill="#6366f1"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Stripe Integration */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid #eee',
                borderRadius: 2,
                p: 2,
                height: '100%',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Stripe Integration
                </Typography>
                <Typography variant="caption" color="success.main">
                  ● Connected
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: '#f9fafb',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box component="img" src={StripeLogo} alt="Stripe" sx={{ width: 32, height: 32 }} />
                <Box>
                  <Typography fontWeight={600}>Stripe Account</Typography>
                  <Typography variant="body2" color="text.secondary">
                    acct_1234567890
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: 'none' }}
                  startIcon={
                    <Box component="img" src={SyncIcon} alt="Sync" sx={{ width: 16, height: 16 }} />
                  }
                >
                  Sync Data
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: 'none' }}
                  startIcon={
                    <Box
                      component="img"
                      src={SettingsIcon}
                      alt="Settings"
                      sx={{ width: 16, height: 16 }}
                    />
                  }
                >
                  Settings
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={600}>Completed Payouts</Typography>

          <Box display="flex" gap={2} alignItems="center">
            <Select size="small" defaultValue="30" sx={{ minWidth: 140 }}>
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
            </Select>

            <Button
              variant="outlined"
              size="small"
              startIcon={
                <Box component="img" src={FilterIcon} alt="Filter" sx={{ width: 16, height: 16 }} />
              }
              sx={{ textTransform: 'none' }}
            >
              Filter
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f9fafb' }}>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Net</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payouts.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>${row.amount.toLocaleString()}</TableCell>
                  <TableCell>${row.fee.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: '#22c55e', fontWeight: 600 }}>
                    ${row.net.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: '#dcfce7',
                        color: '#22c55e',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        fontSize: 12,
                        display: 'inline-block',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="#6366f1" sx={{ cursor: 'pointer', fontWeight: 500 }}>
                      View Details
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Grid container spacing={3}>
        {/* Pending Payouts */}
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 2 }}>
            <Typography fontWeight={600} mb={2}>
              Pending Payouts
            </Typography>

            {pendingPayouts.map((payout, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: payout.bg,
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box component="img" src={payout.icon} alt="status-icon" />
                  <Box>
                    <Typography fontWeight={600}>${payout.amount.toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expected: {payout.expected}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: payout.badgeColor,
                    color: payout.textColor,
                    fontSize: 12,
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 10,
                  }}
                >
                  {payout.status}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Failed Transactions */}
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 2 }}>
            <Typography fontWeight={600} mb={2}>
              Failed Transactions
            </Typography>

            {failedTransactions.map((fail, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: '#fee2e2',
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box component="img" src={fail.icon} alt="error" />
                  <Box>
                    <Typography fontWeight={600}>${fail.amount.toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fail.message}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  size="small"
                  variant="text"
                  sx={{
                    color: '#ef4444',
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Retry
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
