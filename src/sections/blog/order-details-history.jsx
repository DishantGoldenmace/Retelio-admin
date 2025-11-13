import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';

// import CloseIcon from '@mui/icons-material/Close';

const mockImages = [0, 1, 2];

export function OrderDetailsHistory({ history, product }) {
  return (
    <Card>
      <CardHeader title="Customer Media" />
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Top Info Grid */}

        {/* Thumbnails */}
        <Stack direction="row" spacing={2}>
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

          <Button variant="text">View All</Button>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Customer Note</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            product
          </Typography>
        </Box>
      </Box>
      <CardHeader title="Seller Media" />
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Top Info Grid */}

        {/* Thumbnails */}
        <Stack direction="row" spacing={2}>
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
                src={_mock.image.product(i + 1)}
                alt={`product-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}

          <Button variant="text">View All</Button>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Seller Note</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Checked and verified. No signs of damage found during inspection.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
