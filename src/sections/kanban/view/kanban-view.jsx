import React, { useState } from 'react';

import {
  Tab,
  Box,
  Card,
  Chip,
  Tabs,
  Grid,
  Table,
  Paper,
  Alert,
  Button,
  Dialog,
  Switch,
  Divider,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Move TabPanel component outside of KanbanView
const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

export function KanbanView() {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'seller' or 'category'
  const [editingItem, setEditingItem] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Sample data - replace with API calls
  const [sellerCommissions, setSellerCommissions] = useState([
    {
      id: 1,
      sellerName: 'TechShop',
      email: 'tech@shop.com',
      commission: 0,
      isActive: true,
      isVIP: true,
    },
    {
      id: 2,
      sellerName: 'FashionStore',
      email: 'fashion@store.com',
      commission: 12,
      isActive: true,
      isVIP: false,
    },
    {
      id: 3,
      sellerName: 'HomeDecor',
      email: 'home@decor.com',
      commission: 8,
      isActive: true,
      isVIP: false,
    },
  ]);

  const [categoryCommissions, setCategoryCommissions] = useState([
    { id: 1, categoryName: 'Shoes', commission: 15, isActive: true, productsCount: 245 },
    { id: 2, categoryName: 'Accessories', commission: 10, isActive: true, productsCount: 189 },
    { id: 3, categoryName: 'Tech', commission: 5, isActive: true, productsCount: 156 },
    { id: 4, categoryName: 'Clothing', commission: 12, isActive: false, productsCount: 334 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commission: '',
    isActive: true,
    startDate: '',
    endDate: '',
  });

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setEditingItem(item);
    if (item) {
      setFormData({
        name: type === 'seller' ? item.sellerName : item.categoryName,
        email: item.email || '',
        commission: item.commission,
        isActive: item.isActive,
        startDate: item.startDate || '',
        endDate: item.endDate || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        commission: '',
        isActive: true,
        startDate: '',
        endDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      name: '',
      email: '',
      commission: '',
      isActive: true,
      startDate: '',
      endDate: '',
    });
  };

  const handleSave = () => {
    if (!formData.name || formData.commission === '') {
      showAlert('error', 'Please fill in all required fields');
      return;
    }

    if (editingItem) {
      // Update existing
      if (dialogType === 'seller') {
        setSellerCommissions((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  sellerName: formData.name,
                  email: formData.email,
                  commission: parseFloat(formData.commission),
                  isActive: formData.isActive,
                }
              : item
          )
        );
      } else {
        setCategoryCommissions((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  categoryName: formData.name,
                  commission: parseFloat(formData.commission),
                  isActive: formData.isActive,
                }
              : item
          )
        );
      }
      showAlert(
        'success',
        `${dialogType === 'seller' ? 'Seller' : 'Category'} commission updated successfully`
      );
    } else {
      // Add new
      const newItem = {
        id: Date.now(),
        [dialogType === 'seller' ? 'sellerName' : 'categoryName']: formData.name,
        email: formData.email,
        commission: parseFloat(formData.commission),
        isActive: formData.isActive,
        isVIP: dialogType === 'seller' ? formData.commission === 0 : false,
        productsCount: dialogType === 'category' ? 0 : undefined,
      };

      if (dialogType === 'seller') {
        setSellerCommissions((prev) => [...prev, newItem]);
      } else {
        setCategoryCommissions((prev) => [...prev, newItem]);
      }
      showAlert('success', `New ${dialogType} commission added successfully`);
    }

    handleCloseDialog();
  };

  const handleDelete = (type, id) => {
    if (type === 'seller') {
      setSellerCommissions((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCategoryCommissions((prev) => prev.filter((item) => item.id !== id));
    }
    showAlert(
      'success',
      `${type === 'seller' ? 'Seller' : 'Category'} commission deleted successfully`
    );
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Iconify icon="solar:dollar-minimalistic-bold" width={40} color="primary.main" />
          Commission Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure dynamic commission models for sellers and product categories
        </Typography>
      </Box>

      {/* Alert */}
      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {/* Main Content */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:shop-bold" width={20} />
                  Seller Commissions
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:category-bold" width={20} />
                  Category Commissions
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* Seller Commissions Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              p: 2,
            }}
          >
            <Typography variant="h6">Seller Commission </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
              onClick={() => handleOpenDialog('seller')}
            >
              Add New Seller
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.50' }}>
                <TableRow>
                  <TableCell>
                    <strong>Seller Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Commission %</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellerCommissions.map((seller) => (
                  <TableRow key={seller.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="solar:shop-bold" width={20} color="primary" />
                        {seller.sellerName}
                      </Box>
                    </TableCell>
                    <TableCell>{seller.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${seller.commission}%`}
                        color={
                          seller.commission === 0
                            ? 'success'
                            : seller.commission < 10
                              ? 'primary'
                              : 'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={seller.isActive ? 'Active' : 'Inactive'}
                        color={seller.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {seller.isVIP && (
                        <Chip
                          label="VIP"
                          color="secondary"
                          size="small"
                          icon={<Iconify icon="solar:star-bold" width={16} />}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog('seller', seller)}
                        color="primary"
                        size="small"
                      >
                        <Iconify icon="solar:pen-bold" width={20} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete('seller', seller.id)}
                        color="error"
                        size="small"
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Category Commissions Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              p: 2,
            }}
          >
            <Typography variant="h6">Category Commission Rules</Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" width={20} />}
              onClick={() => handleOpenDialog('category')}
            >
              Add New Category
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'grey.50' }}>
                <TableRow>
                  <TableCell>
                    <strong>Category Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Commission %</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Products</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryCommissions.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="solar:category-bold" width={20} color="primary" />
                        {category.categoryName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${category.commission}%`}
                        color={
                          category.commission < 10
                            ? 'success'
                            : category.commission < 15
                              ? 'primary'
                              : 'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{category.productsCount} products</TableCell>
                    <TableCell>
                      <Chip
                        label={category.isActive ? 'Active' : 'Inactive'}
                        color={category.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog('category', category)}
                        color="primary"
                        size="small"
                      >
                        <Iconify icon="solar:pen-bold" width={20} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete('category', category.id)}
                        color="error"
                        size="small"
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {dialogType === 'seller' ? (
              <Iconify icon="solar:shop-bold" width={24} />
            ) : (
              <Iconify icon="solar:category-bold" width={24} />
            )}
            {editingItem ? 'Edit' : 'Add New'} {dialogType === 'seller' ? 'Seller' : 'Category'}{' '}
            Commission
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={dialogType === 'seller' ? 'Seller Name' : 'Category Name'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>

            {dialogType === 'seller' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Commission Percentage"
                type="number"
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                inputProps={{ min: 0, max: 100, step: 0.01 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date (Optional)"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date (Optional)"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          {formData.commission === '0' && dialogType === 'seller' && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>VIP Seller:</strong> 0% commission means this seller will be marked as VIP
              with no marketplace fees.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            {editingItem ? 'Update' : 'Add'} Commission
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
