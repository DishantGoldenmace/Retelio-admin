import {
  Box,
  Card,
  Stack,
  CardHeader,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material';

/**
 * @typedef {Object} Metric
 * @property {string} label
 * @property {number} value
 * @property {number} percentage
 * @property {string} color
 */

/**
 * @typedef {Object} Props
 * @property {string} [title]
 * @property {string} [subheader]
 * @property {Metric[]} metrics
 */

export function SalesOverview({ title = 'Sales overview', subheader, metrics }) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ px: 3, pb: 3 }}>
        <Stack spacing={3}>
          {metrics.map((item) => (
            <Box key={item.label}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography variant="subtitle2">
                  ${item.value.toLocaleString()} ({item.percentage}%)
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  mt: 1,
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: item.color,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
