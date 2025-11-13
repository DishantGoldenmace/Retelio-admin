import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  Box,
  Grid,
  Card,
  Accordion,
  TextField,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  _jobs,
  _roles,
  JOB_SORT_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import { JobSort } from '../job-sort';
import { JobSearch } from '../job-search';
import { JobFilters } from '../job-filters';
import refund from '../../../assets/images/refund.png';
import { JobFiltersResult } from '../job-filters-result';
import account from '../../../assets/images/account.png';
import payment from '../../../assets/images/payment.png';
import delivery from '../../../assets/images/delivery.png';
import assurances from '../../../assets/images/assurances.png';
import packageimage from '../../../assets/images/packageimage.png';
// ----------------------------------------------------------------------

export function JobListView() {
  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const search = useSetState({ query: '', results: [] });

  const filters = useSetState({
    roles: [],
    locations: [],
    benefits: [],
    experience: 'all',
    employmentTypes: [],
  });

  const dataFiltered = applyFilter({ inputData: _jobs, filters: filters.state, sortBy });

  const canReset =
    filters.state.roles.length > 0 ||
    filters.state.locations.length > 0 ||
    filters.state.benefits.length > 0 ||
    filters.state.employmentTypes.length > 0 ||
    filters.state.experience !== 'all';

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = _jobs.filter(
          (job) => job.title.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch search={search} onSearch={handleSearch} />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <JobFilters
          filters={filters}
          canReset={canReset}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            roles: _roles,
            benefits: JOB_BENEFIT_OPTIONS.map((option) => option.label),
            employmentTypes: JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label),
            experiences: ['all', ...JOB_EXPERIENCE_OPTIONS.map((option) => option.label)],
          }}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = <JobFiltersResult filters={filters} totalResults={dataFiltered.length} />;

  // Add this code ABOVE your FAQ Box component
  const helpItems = [
    {
      image: account,
      title: 'Managing your account',
    },
    {
      image: payment,
      title: 'Payment',
    },
    {
      image: delivery,
      title: 'Delivery',
    },
    {
      image: packageimage,
      title: 'Problem with the Product',
    },
    {
      image: refund,
      title: 'Return & Refund',
    },
    {
      image: assurances,
      title: 'Guarantees and assurances',
    },
  ];

  return (
    <DashboardContent>
      <Box sx={{ p: 4 }}>
        {/* Help & Support Section */}
        <Box mb={6}>
          <Typography variant="h4" align="left" gutterBottom>
            Help & Support
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {helpItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',

                    height: '100%',
                    minWidth: 160,
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent>
                    <img src={item.image} alt={item.title} />
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.black' }}>
            Live chat support will be available soon, in the meantime use the contact form or FAQ**
          </Typography>
        </Box>

        {/* FAQ Section */}
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Frequently asked questions
          </Typography>

          <Grid container spacing={4}>
            {/* Left side: FAQ accordion */}
            <Grid item xs={12} md={6}>
              {[
                {
                  question: 'Questions 1',
                  answer:
                    'Curabitur nisi. Phasellus blandit leo ut odio. Donec posuere vulputate arcu. Donec mi odio, faucibus at, scelerisque quis, convallis in.',
                },
                { question: 'Questions 2', answer: 'Answer for question 2' },
                { question: 'Questions 3', answer: 'Answer for question 3' },
                { question: 'Questions 4', answer: 'Answer for question 4' },
                { question: 'Questions 5', answer: 'Answer for question 5' },
                { question: 'Questions 6', answer: 'Answer for question 6' },
                { question: 'Questions 7', answer: 'Answer for question 7' },
                { question: 'Questions 8', answer: 'Answer for question 8' },
              ].map((faq, index) => (
                <Accordion key={index} defaultExpanded={index === 0}>
                  <AccordionSummary expandIcon="▼">
                    <Typography variant="subtitle1">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>

            {/* Right side: Contact form */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Haven&apos;t found the right help?
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <TextField label="Name" variant="outlined" fullWidth />
                <TextField label="Email" variant="outlined" fullWidth />
                <TextField label="Subject" variant="outlined" fullWidth />
                <TextField
                  label="Enter your message here"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                  Submit now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Job', href: paths.dashboard.job.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.job.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New job
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      /> */}

      {/* <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack> */}

      {/* {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <JobList jobs={dataFiltered} /> */}
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // Sort by
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // Filters
  if (employmentTypes.length) {
    inputData = inputData.filter((job) =>
      job.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};
