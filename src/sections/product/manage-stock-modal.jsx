import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import { Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Iconify } from 'src/components/iconify';

// Helper function to convert hex color to readable name
const getColorName = (hexColor) => {
  const colorMap = {
    '#FF4842': 'Red',
    '#1890FF': 'Blue',
    '#00AB55': 'Green',
    '#FFC107': 'Yellow',
    '#9C27B0': 'Purple',
    '#FF9800': 'Orange',
    '#607D8B': 'Gray',
    '#000000': 'Black',
    '#FFFFFF': 'White',
  };
  return colorMap[hexColor] || hexColor;
};

export function ManageStockModal({ open, onClose, product, onUpdateStock }) {
  const [variantStocks, setVariantStocks] = useState([]);

  useEffect(() => {
    if (open && product) {
      // Generate variants from product colors and sizes
      const variants = [];

      product.colors?.forEach((color) => {
        product.sizes?.forEach((size) => {
          variants.push({
            size,
            color: getColorName(color),
            colorHex: color,
            quantity: 0, // Default quantity, you can modify this logic
          });
        });
      });

      setVariantStocks(variants);
    }
  }, [open, product]);

  const handleQuantityChange = (index, value) => {
  const updated = [...variantStocks];
  updated[index].quantity = value === '' ? 0 : Number(value);
  setVariantStocks(updated);
};


  const handleSave = () => {
    onUpdateStock(product.id, variantStocks);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Manage Stock — {product?.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Iconify icon="eva:close-fill" width={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {variantStocks.map((variant, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center" mb={2}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 100 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: variant.colorHex,
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                }}
              />
              <Typography variant="body2">{variant.color}</Typography>
            </Stack>
            <Typography sx={{ minWidth: 60 }} variant="body2">
              {variant.size}
            </Typography>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              value={variant.quantity === 0 ? '' : variant.quantity}
              onFocus={(e) => {
                if (variant.quantity === 0) {
                  e.target.select(); // Optional: auto-select the 0
                }
              }}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              inputProps={{ min: 0 }}
              sx={{ width: 120 }}
            />
          </Stack>
        ))}
        {variantStocks.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={3}>
            No variants available for this product
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={variantStocks.length === 0}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
