import { useNavigate } from 'react-router-dom';

import { Chip, Stack, Avatar, TableRow, TableCell, Typography } from '@mui/material';

const statusColor = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
};

export default function ReturnTableRow({ row }) {
  const { orderId, amount, customer, product, reason, status, date } = row;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/post', {
      state: {
        orderId,
        status,
        createdAt: date,
        customer: {
          name: customer.name,
          email: customer.email,
          avatarUrl: customer.avatar,
          ipAddress: customer.ipAddress || '192.168.0.1', // optional fallback
        },
      },
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
          {orderId}
        </Typography>
        <Typography variant="body2">${amount}</Typography>
      </TableCell>

      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={customer.avatar} />
          <div>
            <Typography variant="subtitle2">{customer.name}</Typography>
            <Typography variant="caption">{customer.email}</Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={customer.avatar} />
          <div>
            <Typography variant="subtitle2">Jordi Aubanell</Typography>
            <Typography variant="caption">Jordi@email.com</Typography>
          </div>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">{product.name}</Typography>
        <Typography variant="caption">{product.category}</Typography>
      </TableCell>

      <TableCell>{reason}</TableCell>

      <TableCell>
        <Chip label={status} color={statusColor[status]} size="small" />
      </TableCell>

      <TableCell>{date}</TableCell>
    </TableRow>
  );
}
