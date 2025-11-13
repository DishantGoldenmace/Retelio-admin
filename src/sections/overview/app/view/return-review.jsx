import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
// import IconButton from '@mui/material/IconButton';
// import { fCurrency } from 'src/utils/format-number';
// import { Label } from 'src/components/label';
import { useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function ReturntToReview({ title, subheader, tableData, headLabel, ...other }) {
    const navigate = useNavigate();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar sx={{ minHeight: 402 }}>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row) => (
              <RowItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          onClick={() => {
            navigate('/dashboard/post/pegasus-running-suits');
          }}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

function RowItem({ row }) {
  const popover = usePopover();
  const navigate = useNavigate();

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt={row.customerName} src={row.product} />
            <Box>
              <div style={{ color: '#888', fontSize: 13 }}>{row.name}</div>
            </Box>
          </Box>
        </TableCell>

        {/* <TableCell>{fCurrency(row.price)}</TableCell> */}
        <TableCell>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt={row.customerName} src={row.avatarUrl} />
            <Box>
              <div style={{ fontWeight: 600 }}>{row.customerName}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{row.email}</div>
            </Box>
          </Box>
        </TableCell>
        <TableCell>{row.reason}</TableCell>

        <TableCell align="right" sx={{ pr: 2 }}>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/dashboard/post');
              }}
              variant="contained"
              color="success"
              size="small"
              sx={{ textTransform: 'none' }}
              // onClick={handleAccept}
            >
              Manage Return
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleDownload}>
            <Iconify icon="eva:cloud-download-fill" />
            Download
          </MenuItem>

          <MenuItem onClick={handlePrint}>
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
