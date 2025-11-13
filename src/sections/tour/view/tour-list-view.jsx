import { useState } from 'react';

import {
  Box,
  Chip,
  Grid,
  Card,
  Table,
  Stack,
  Alert,
  Button,
  Avatar,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  DialogTitle,
  CardContent,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useGetAllVendorList } from '../http/useGetAllVendorList';
import useAcceptRejectMutation from '../http/useAcceptRejectMutation';

export function TourListView() {
  const router = useRouter();
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'

  const [actionTypes, setActionTypes] = useState('all'); // 'approve' or 'reject'


  const { data, isLoading } = useGetAllVendorList(actionTypes);

  const {mutate: updateVendorStatus} = useAcceptRejectMutation()

  const pendingSellers = data?.filter(seller => seller.status === 'pending' || 'rejected') || [];

  const handleApprove = (seller) => {
    setSelectedSeller(seller);
    setActionType('approve');
    setOpenConfirmDialog(true);
  };

  const handleReject = (seller) => {
    setSelectedSeller(seller);
    setActionType('reject');
    setOpenConfirmDialog(true);
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setOpenDetails(true);
  };

  const confirmAction = () => {
    if (actionType === 'approve') {
     updateVendorStatus({id: selectedSeller._id, status: 'approved'})
    } else if (actionType === 'reject') {
    updateVendorStatus({id: selectedSeller._id, status: 'rejected'})
    }
    setOpenConfirmDialog(false);
    setSelectedSeller(null);
    setActionType('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
      case 'active':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getFullAddress = (addressObj) => {
    if (!addressObj) return 'N/A';
    const { address, city, zipCode } = addressObj;
    return `${address || ''}, ${city || ''} ${zipCode || ''}`.trim().replace(/^,\s*/, '');
  };

  const getFullName = (seller) => {
    return `${seller?.firstName || ''} ${seller?.lastName || ''}`.trim();
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Pending Seller Approvals"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Seller Management' },
            { name: 'Pending Approvals' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Pending Seller Approvals"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Seller Management' },
          { name: 'Pending Approvals' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box p={3}>
        {pendingSellers.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No pending seller applications at the moment.
          </Alert>
        ) : (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {pendingSellers.length} seller application{pendingSellers.length > 1 ? 's' : ''} pending your review
          </Alert>
        )}

        <Card>
          <Scrollbar>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Seller Details</TableCell>
                  <TableCell>Shop Information</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>Verification Status</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pendingSellers.map((seller) => (
                  <TableRow key={seller._id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {getFullName(seller).charAt(0) || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" noWrap>
                            {getFullName(seller) || 'Unknown User'}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Iconify icon="solar:letter-bold" width={16} sx={{ color: 'text.disabled' }} />
                            <Typography variant="caption" color="text.secondary">
                              {seller.email}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Iconify icon="solar:phone-bold" width={16} sx={{ color: 'text.disabled' }} />
                            <Typography variant="caption" color="text.secondary">
                              {seller.phone}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
                          <Iconify icon="solar:buildings-2-bold" width={16} color="primary.main" />
                          <Typography variant="subtitle2">{seller.shopName || 'N/A'}</Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          Code: {seller.pivaCode || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify icon="solar:calendar-bold" width={16} sx={{ color: 'text.disabled' }} />
                        <Typography variant="body2">{formatDate(seller.createdAt)}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack spacing={0.5}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Iconify 
                            icon={seller.isEmailVerified ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
                            width={16} 
                            color={seller.isEmailVerified ? "success.main" : "error.main"}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Email: {seller.isEmailVerified ? 'Verified' : 'Not Verified'}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Iconify 
                            icon={seller.isPhoneVerified ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
                            width={16} 
                            color={seller.isPhoneVerified ? "success.main" : "error.main"}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Phone: {seller.isPhoneVerified ? 'Verified' : 'Not Verified'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={seller.status.toUpperCase()}
                        color={getStatusColor(seller.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<Iconify icon="solar:eye-bold" />}
                          onClick={() => handleViewDetails(seller)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          disabled={seller.status !== 'pending'}
                          startIcon={<Iconify icon="solar:check-circle-bold" />}
                          onClick={() => handleApprove(seller)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          disabled={seller.status !== 'pending'}

                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={() => handleReject(seller)}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </Box>

      {/* Seller Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:buildings-2-bold" color="primary.main" />
            <Typography variant="h6">Seller Application Details</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          {selectedSeller && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Personal Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2">Full Name</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getFullName(selectedSeller)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Email Address</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            {selectedSeller.email}
                          </Typography>
                          <Chip 
                            label={selectedSeller.isEmailVerified ? "Verified" : "Not Verified"}
                            color={selectedSeller.isEmailVerified ? "success" : "error"}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Phone Number</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            {selectedSeller.phone}
                          </Typography>
                          <Chip 
                            label={selectedSeller.isPhoneVerified ? "Verified" : "Not Verified"}
                            color={selectedSeller.isPhoneVerified ? "success" : "error"}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Date of Birth</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(selectedSeller.dob)} ({calculateAge(selectedSeller.dob)} years old)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Address</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getFullAddress(selectedSeller.address)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Business Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2">Shop Name</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.shopName || 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">PIVA Code</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.pivaCode || 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Referral Code</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedSeller.referralCode || 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Registration Date</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(selectedSeller.createdAt)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Last Updated</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(selectedSeller.updatedAt)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Account Status & Verification
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify 
                            icon={selectedSeller.isEmailVerified ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
                            color={selectedSeller.isEmailVerified ? "success.main" : "error.main"} 
                            width={20} 
                          />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Email Verification</Typography>
                            <Typography variant="body2">
                              {selectedSeller.isEmailVerified ? 'Verified' : 'Pending'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify 
                            icon={selectedSeller.isPhoneVerified ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
                            color={selectedSeller.isPhoneVerified ? "success.main" : "error.main"} 
                            width={20} 
                          />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Phone Verification</Typography>
                            <Typography variant="body2">
                              {selectedSeller.isPhoneVerified ? 'Verified' : 'Pending'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify 
                            icon={selectedSeller.isVerified ? "solar:check-circle-bold" : "solar:close-circle-bold"} 
                            color={selectedSeller.isVerified ? "success.main" : "error.main"} 
                            width={20} 
                          />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Overall Verification</Typography>
                            <Typography variant="body2">
                              {selectedSeller.isVerified ? 'Verified' : 'Pending'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify 
                            icon="solar:user-bold" 
                            color="primary.main" 
                            width={20} 
                          />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Account Status</Typography>
                            <Chip 
                              label={selectedSeller.status}
                              color={getStatusColor(selectedSeller.status)}
                              size="small"
                              variant="filled"
                            />
                          </Box>
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
          {selectedSeller && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="solar:check-circle-bold" />}
                onClick={() => {
                  setOpenDetails(false);
                  handleApprove(selectedSeller);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Iconify icon="solar:close-circle-bold" />}
                onClick={() => {
                  setOpenDetails(false);
                  handleReject(selectedSeller);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {actionType} the seller application for{' '}
            <strong>{selectedSeller?.shopName}</strong> by <strong>{getFullName(selectedSeller)}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmAction}
            variant="contained"
            color={actionType === 'approve' ? 'success' : 'error'}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}