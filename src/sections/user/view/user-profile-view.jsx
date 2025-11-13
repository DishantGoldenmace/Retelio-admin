import React from 'react';

import {
  Chip,
  Table,
  Paper,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const mockTickets = [
  {
    id: 'TCKT-1001',
    subject: 'Refund not received',
    user: 'Amit Sharma',
    date: '2025-08-05',
    status: 'Open',
  },
  {
    id: 'TCKT-1002',
    subject: 'Product arrived damaged',
    user: 'Priya Verma',
    date: '2025-08-06',
    status: 'Open',
  },
  {
    id: 'TCKT-1003',
    subject: 'Login not working',
    user: 'Rahul Jain',
    date: '2025-08-07',
    status: 'Open',
  },
];

export function UserProfileView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading=" Open Support Tickets"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Use Open Support Ticketsr' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date Raised</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.user}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status}
                    color={ticket.status === 'Open' ? 'warning' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                    <Button size="small" variant="contained" color="error">
                      Close
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
}
