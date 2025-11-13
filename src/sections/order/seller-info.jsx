import { Box, Card, Stack, Divider, CardHeader, Typography } from '@mui/material';

export function SellerInfo({ seller }) {
  return (
    <Card>
      <CardHeader title="Seller Info" />
      <Divider />

      <Box sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Field label="Store Name" value={seller.storeName} />
          {seller.fullName && <Field label="Seller Name" value={seller.fullName} />}
          <Field label="Email" value={seller.email} />
          <Field label="Phone" value={seller.phoneNumber} />
        </Stack>
      </Box>
    </Card>
  );
}

function Field({ label, value }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
        {label}:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Stack>
  );
}
