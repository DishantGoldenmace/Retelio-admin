// src/sections/return/return-table-head.jsx

import { TableRow, TableHead, TableCell } from '@mui/material';

export default function ReturnTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Order Details</TableCell>
        <TableCell>Customer</TableCell>
        <TableCell>Seller</TableCell>
        <TableCell>Product</TableCell>
        <TableCell>Reason</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Date</TableCell>
        {/* <TableCell align="center">Actions</TableCell> */}
      </TableRow>
    </TableHead>
  );
}
