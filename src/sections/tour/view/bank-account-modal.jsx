import { useState } from 'react';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export default function BankAccountModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    holderName: '',
    bankName: '',
    accountNumber: '',
    reAccountNumber: '',
    ifsc: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    setForm({
      holderName: '',
      bankName: '',
      accountNumber: '',
      reAccountNumber: '',
      ifsc: '',
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3, // more rounded
          p: 3, // inner padding
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: '20px' }}>Add Bank Account</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Account holder name"
            name="holderName"
            value={form.holderName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Bank Name"
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Account number"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Re-enter account number"
            name="reAccountNumber"
            value={form.reAccountNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="IFSC code"
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ borderRadius: 2, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
