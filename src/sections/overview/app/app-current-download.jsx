import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

export function AppCurrentDownload({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const chartColors = chart.colors ?? ['#FF5630', '#FFAB00', '#00A76F'];


  const chartSeries = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: {
      sparkline: { enabled: true },
    },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: {
      lineCap: 'round',
    },
    tooltip: {
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#f4f4f4',
          margin:8,
          strokeWidth: '100%',
        },
        hollow: {
          size: '30%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '16px',
            fontWeight: 700,
            formatter: (val) => fNumber(val),
          },
          total: {
            show: true,
            label: 'Total',
            formatter: (w) => {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return fNumber(total);
            },
          },
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} />

      <Chart
        type="radialBar"
        series={chartSeries} // e.g., [30, 40, 30]
        options={chartOptions}
        width={260}
        height={260}
        sx={{ my: 6, mx: 'auto' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}
