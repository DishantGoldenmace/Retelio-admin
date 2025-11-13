import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import {
  Box,
  Menu,
  Chip,
  Grid,
  Card,
  Table,
  Paper,
  Stack,
  Alert,
  Rating,
  Dialog,
  Button,
  Avatar,
  Divider,
  Checkbox,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  FormGroup,
  TableHead,
  IconButton,
  Typography,
  DialogTitle,
  CardContent,
  DialogActions,
  DialogContent,
  FormControlLabel,
  CircularProgress,
  Skeleton,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';
import { useGetAllVendorList } from './http/useGetAllVendorList';

const availableCategories = [
  'Electronics',
  'Fashion',
  'Books',
  'Sports',
  'Home & Garden',
  'Beauty',
  'Toys',
  'Automotive',
  'Health',
  'Food & Beverages',
  'Accessories',
  'Footwear',
  'Gadgets',
  'Mobile Accessories',
  'Stationery',
];

  const LoadingSkeleton = () => (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={100} height={16} />
                <Skeleton variant="text" width={150} height={16} />
              </Box>
            </Stack>
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={100} height={16} />
            <Skeleton variant="text" width={90} height={16} />
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={0.5}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={50} height={24} />
            </Stack>
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={70} height={24} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="circular" width={32} height={32} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );


export function TourNewEditForm() {
  const router = useRouter();

  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [actionType, setActionType] = useState('approved');
  const [vendors, setVendors] = useState([]);

  const { data, isLoading, error } = useGetAllVendorList(actionType);


  useEffect(() => {
    if (data && Array.isArray(data)) {
      setVendors(data);
    }
  }, [data]);

  const [editForm, setEditForm] = useState({
    categories: [],
    customConditions: '',
  });

  const [anchorEls, setAnchorEls] = useState({});

  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  const handleViewDetails = (row) => {
    setSelectedSeller(row);
    setOpenDetails(true);
    handleMenuClose(row._id);
  };

  const handleEditCategories = (row) => {
    setSelectedSeller(row);
    setEditForm({
      categories: row.categories || [],
      customConditions: row.customConditions || '',
    });
    setOpenEdit(true);
    handleMenuClose(row._id);
  };

  const handleToggleStatus = (row, action) => {
    setSelectedSeller(row);
    setActionType(action);
    setOpenConfirmDialog(true);
    handleMenuClose(row._id);
  };

  const confirmAction = () => {
    if (selectedSeller && actionType) {
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === selectedSeller._id
            ? {
                ...vendor,
                status: actionType === 'disable' ? 'disabled' : 'approved',
                customConditions:
                  actionType === 'disable' ? 'Account disabled by admin' : vendor.customConditions,
              }
            : vendor
        )
      );
      console.log(`${actionType}d vendor:`, selectedSeller.shopName);
    }
    setOpenConfirmDialog(false);
    setSelectedSeller(null);
    setActionType('approved');
  };

  const handleSaveEdit = () => {
    if (selectedSeller) {
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === selectedSeller._id
            ? {
                ...vendor,
                categories: editForm.categories,
                customConditions: editForm.customConditions,
              }
            : vendor
        )
      );
      console.log('Updated vendor categories:', editForm);
    }
    setOpenEdit(false);
    setSelectedSeller(null);
  };

  const handleCategoryChange = (category) => {
    setEditForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'disabled':
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'ACTIVE';
      case 'disabled':
        return 'DISABLED';
      case 'rejected':
        return 'REJECTED';
      case 'pending':
        return 'PENDING';
      default:
        return status?.toUpperCase() || 'UNKNOWN';
    }
  };

  const getRatingColor = (rating) => {
    const rate = parseFloat(rating);
    if (rate >= 4.5) return 'success';
    if (rate >= 3.5) return 'warning';
    return 'error';
  };

  // Loading skeleton component

  if (error) {
    return (
      <DashboardContent>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading vendors: {error.message || 'Something went wrong'}
        </Alert>
      </DashboardContent>
    );
  }

  const activeVendors = vendors.filter((v) => v.status === 'approved').length;
  const disabledVendors = vendors.filter((v) => v.status === 'disabled').length;
  const pendingVendors = vendors.filter((v) => v.status === 'pending').length;

  return (
    <DashboardContent>
      <Box>
        <Alert severity="info" sx={{ mb: 3 }}>
          Managing {vendors.length} registered vendors.
          {activeVendors} active, {disabledVendors} disabled, {pendingVendors} pending approval.
        </Alert>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>Vendor Information</TableCell>
                  <TableCell>Contact Details</TableCell>
                  <TableCell>Verification Status</TableCell>
                  <TableCell>Account Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <TableBody>
                  {vendors.map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {row.shopName?.charAt(0) || row.firstName?.charAt(0) || 'V'}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" noWrap>
                              {row.shopName || 'No Shop Name'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Owner: {row.firstName} {row.lastName}
                            </Typography>
                            <br />
                            <Typography variant="caption" color="text.secondary">
                              Code: {row.pivaCode}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" noWrap>
                            {row.email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {row.phone}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            {row.address?.city}, {row.address?.zipCode}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Stack spacing={0.5}>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Icon 
                              icon={row.isEmailVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                              color={row.isEmailVerified ? "green" : "red"}
                              width="16"
                              height="16"
                            />
                            <Typography variant="caption">
                              Email {row.isEmailVerified ? 'Verified' : 'Unverified'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Icon 
                              icon={row.isPhoneVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                              color={row.isPhoneVerified ? "green" : "red"}
                              width="16"
                              height="16"
                            />
                            <Typography variant="caption">
                              Phone {row.isPhoneVerified ? 'Verified' : 'Unverified'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Icon 
                              icon={row.isVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                              color={row.isVerified ? "green" : "red"}
                              width="16"
                              height="16"
                            />
                            <Typography variant="caption">
                              Account {row.isVerified ? 'Verified' : 'Unverified'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={getStatusLabel(row.status)}
                          color={getStatusColor(row.status)}
                          size="small"
                          icon={
                            <Icon
                              icon={row.status === 'approved' ? 'mdi:check-circle' : 'mdi:close-circle'}
                            />
                          }
                        />
                      </TableCell>

                      <TableCell align="right">
                        <IconButton onClick={(e) => handleMenuOpen(e, row._id)}>
                          <Icon icon="mdi:dots-vertical" width="24" height="24" />
                        </IconButton>

                        <Menu
                          anchorEl={anchorEls[row._id]}
                          open={Boolean(anchorEls[row._id])}
                          onClose={() => handleMenuClose(row._id)}
                        >
                          <MenuItem onClick={() => handleViewDetails(row)}>
                            <Icon icon="mdi:eye" width="20" height="20" style={{ marginRight: 8 }} />
                            View Details
                          </MenuItem>
                          <MenuItem onClick={() => handleEditCategories(row)}>
                            <Icon icon="mdi:edit" width="20" height="20" style={{ marginRight: 8 }} />
                            Edit Categories
                          </MenuItem>
                          <Divider />
                          {row.status === 'approved' ? (
                            <MenuItem
                              onClick={() => handleToggleStatus(row, 'disable')}
                              sx={{ color: 'error.main' }}
                            >
                              <Icon
                                icon="mdi:block-helper"
                                width="20"
                                height="20"
                                style={{ marginRight: 8 }}
                              />
                              Disable Vendor
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => handleToggleStatus(row, 'enable')}
                              sx={{ color: 'success.main' }}
                            >
                              <Icon
                                icon="mdi:check-circle"
                                width="20"
                                height="20"
                                style={{ marginRight: 8 }}
                              />
                              Approve Vendor
                            </MenuItem>
                          )}
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!isLoading && vendors.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                          No vendors found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Paper>
      </Box>

      {/* View Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="mdi:store" color="primary" />
            <Typography variant="h6">Vendor Details</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {selectedSeller && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Store Information
                    </Typography>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="subtitle2">Shop Name</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.shopName || 'No Shop Name'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Owner Name</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.firstName} {selectedSeller.lastName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Age</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.age} years
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Registration Date</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(selectedSeller.createdAt)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Contact Information
                    </Typography>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.email}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Phone</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.phone}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Address</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.address?.address}, {selectedSeller.address?.city}, {selectedSeller.address?.zipCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Date of Birth</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(selectedSeller.dob)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Account Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Box textAlign="center">
                          <Typography variant="h6" color="primary">
                            {selectedSeller.pivaCode}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            PIVA Code
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box textAlign="center">
                          <Typography variant="h6" color="success.main">
                            {selectedSeller.referralCode}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Referral Code
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box textAlign="center">
                          <Typography variant="h6" color={selectedSeller.isVerified ? "success.main" : "error.main"}>
                            {selectedSeller.isVerified ? "Verified" : "Unverified"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Account Status
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box textAlign="center">
                          <Typography variant="h6" color="info.main">
                            {formatDate(selectedSeller.updatedAt)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last Updated
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Verification Status
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon 
                            icon={selectedSeller.isEmailVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                            color={selectedSeller.isEmailVerified ? "green" : "red"}
                          />
                          <Typography variant="body2">
                            Email {selectedSeller.isEmailVerified ? 'Verified' : 'Unverified'}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon 
                            icon={selectedSeller.isPhoneVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                            color={selectedSeller.isPhoneVerified ? "green" : "red"}
                          />
                          <Typography variant="body2">
                            Phone {selectedSeller.isPhoneVerified ? 'Verified' : 'Unverified'}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon 
                            icon={selectedSeller.isVerified ? "mdi:check-circle" : "mdi:close-circle"} 
                            color={selectedSeller.isVerified ? "green" : "red"}
                          />
                          <Typography variant="body2">
                            Account {selectedSeller.isVerified ? 'Verified' : 'Unverified'}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Categories Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Categories & Conditions</DialogTitle>
        <DialogContent dividers>
          {selectedSeller && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Allowed Categories for {selectedSeller.shopName}
                </Typography>
                <FormGroup>
                  <Grid container>
                    {availableCategories.map((category) => (
                      <Grid item xs={6} key={category}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={editForm.categories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                              color="primary"
                            />
                          }
                          label={category}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Custom Conditions"
                  multiline
                  rows={4}
                  value={editForm.customConditions}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      customConditions: e.target.value,
                    }))
                  }
                  placeholder="Enter custom sales conditions, commission rates, special terms, etc."
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm {actionType === 'disable' ? 'Disable' : 'Approve'} Vendor</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {actionType} the vendor account for{' '}
            <strong>{selectedSeller?.shopName}</strong>?
            {actionType === 'disable' && (
              <Box mt={1}>
                <Alert severity="warning">
                  Disabling will prevent the vendor from making new sales and accessing their
                  dashboard.
                </Alert>
              </Box>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmAction}
            variant="contained"
            color={actionType === 'disable' ? 'error' : 'success'}
          >
            {actionType === 'disable' ? 'Disable' : 'Approve'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}