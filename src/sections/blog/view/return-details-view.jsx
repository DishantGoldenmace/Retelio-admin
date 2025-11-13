import { useState } from 'react';

import {
  Card,
  Table,
  Container,
  TableBody,
  Typography,
  TableContainer,
} from '@mui/material';

import { _returnRequests } from 'src/_mock/return';
import { DashboardContent } from 'src/layouts/dashboard';

import { useSettingsContext } from 'src/components/settings';

import ReturnTableRow from '../return-table-row';
import ReturnFilterBar from '../return-filter-bar';
import ReturnTableHead from '../return-table-head';
import ReturnDashboardCards from '../return-dashboard-cards';
// ----------------------------------------------------------------------

export function ReturnDetailsView({ post, loading, error }) {
  const settings = useSettingsContext();
  const [filter, setFilter] = useState('');

  return (
    <DashboardContent maxWidth={false} disablePadding>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Return Management
        </Typography>

        <ReturnDashboardCards />

        <ReturnFilterBar filter={filter} setFilter={setFilter} />

        <Card>
          {/* <Scrollbar> */}
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <ReturnTableHead />
                <TableBody>
                  {_returnRequests.map((row) => (
                    <ReturnTableRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          {/* </Scrollbar> */}
        </Card>
      </Container>
    </DashboardContent>
  );
}
