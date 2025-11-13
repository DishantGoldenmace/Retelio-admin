// src/sections/return/return-filter-bar.jsx

import { Stack, Button, MenuItem, TextField, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const statusOptions = ['All Status', 'Pending', 'Approved', 'Rejected'];
const categoryOptions = ['All Categories', 'Electronics', 'Clothing'];

export default function ReturnFilterBar({ filter, setFilter }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        placeholder="Search by order ID, customer..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" />
            </InputAdornment>
          ),
        }}
      />

      <Stack direction="row" spacing={2} flexShrink={0}>
        <TextField select defaultValue="All Status">
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField select defaultValue="All Categories">
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" startIcon={<Iconify icon="ic:round-file-download" />}>
          Export
        </Button>
      </Stack>
    </Stack>
  );
}
