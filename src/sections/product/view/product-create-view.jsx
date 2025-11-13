import { useState } from 'react';

import {
  Box,
  Menu,
  Table,
  Stack,
  Avatar,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const staticData = [
  {
    id: 'R001',
    avatarUrl: 'n',
    storeName: 'FashionStore',
    price: '24.86',
    name: 'Running Shoes',
  },
  {
    id: 'R002',
    avatarUrl: 'n',
    storeName: 'TechShop',
    price: '12.54',
    name: 'Cotton Shirt',
  },
  {
    id: 'R003',
    avatarUrl: 'n',
    storeName: 'FashionStore',
    price: '56.32',
    name: 'Leather Jacket',
  },
];

export function ProductCreateView() {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleApprove = (id) => {
    console.log('Approved seller ID:', id);
  };

  const handleReject = (id) => {
    console.log('Rejected seller ID:', id);
  };

  const handleEdit = () => {
    console.log('Edit:', selectedRow);
    handleMenuClose();
  };
  const handleDisable = (id) => {
    console.log('Disabled seller ID:', id);
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Pending Approval"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'product' },
          { name: 'Pending Approval' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Box p={3}>
        <Box>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Store Name</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {staticData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={row.avatarUrl} />

                        <Typography variant="subtitle2" noWrap>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.storeName}</TableCell>
                    <TableCell> ${row.price}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleApprove}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 1 }} />
          Approve
        </MenuItem>
        <MenuItem onClick={handleReject}>
          <Iconify icon="eva:close-circle-fill" sx={{ mr: 1 }} />
          Reject
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
