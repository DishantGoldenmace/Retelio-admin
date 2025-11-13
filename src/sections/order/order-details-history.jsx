import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// import { _mock } from 'src/_mock';

// import CloseIcon from '@mui/icons-material/Close';

// const mockImages = [0, 1, 2];

export function OrderDetailsHistory({ history }) {
  return (
    <Card>
      <CardHeader title="Tracking Section" />
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Top Info Grid */}
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            display: 'grid',
            rowGap: 1.5,
            columnGap: 2,
            borderRadius: 2,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            typography: 'body2',
            borderStyle: 'dashed',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Tracking No.
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {history?.trackingNo || 'SPX037739199373'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Courier
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              DHL
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Return date
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {history?.returnDate || '25 May 2025'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Delivery status
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {history?.status || 'In transit'}
            </Typography>
          </Box>
        </Paper>

        {/* Notes */}
        {/* <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            NOTES
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We appreciate your business. Should you need us to add VAT or extra notes let us know!
          </Typography>
        </Box> */}

        {/* Thumbnails */}
        {/* <Stack direction="row" spacing={2}>
          {mockImages.map((i) => (
            <Box
              key={i}
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={_mock.image.product(i)}
                alt={`product-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Stack> */}
      </Box>
    </Card>
  );
}
