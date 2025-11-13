import React from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Grid, Button, Divider, TextField } from '@mui/material';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import csvIcon from '../assets/images/CvIcon.png';
import csvtemp from '../assets/images/Cvtemp.png';
import excelIcon from '../assets/images/excel.png';
import emailIcon from '../assets/images/email.png';
import exceltemp from '../assets/images/exceltemp.png';
import imageIcon from '../assets/images/imageIcon.png';
import uploadIconSrc from '../assets/images/uploadIcon.png';
import downloadIconSrc from '../assets/images/download.png';
import downloadIcon from '../assets/images/downloadIcon.png';
import uploadCloudIcon from '../assets/images/uploadCloud.png';
import backgroundImageSrc from '../assets/images/ProductBanner.jpg';

// ----------------------------------------------------------------------

export default function MassiveProduct() {
  const theme = useTheme();

  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={{
        borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}` },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            minWidth: { lg: 0 },
            py: { lg: 3, xl: 5 },
            flexDirection: 'column',
            flex: { lg: '1 1 auto' },
            px: { xs: 2, sm: 3, xl: 5 },
            borderRight: {
              lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
            },
          }}
        >
          {/* <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Hi, Frankie 👋
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >{`Let's learn something new today!`}</Typography>
          </Box> */}

          {/* <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            <CourseWidgetSummary
              title="Courses in progress"
              total={6}
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-progress.svg`}
            />

            <CourseWidgetSummary
              title="Courses completed"
              total={3}
              color="success"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-completed.svg`}
            />

            <CourseWidgetSummary
              title="Certificates"
              total={2}
              color="secondary"
              icon={`${CONFIG.site.basePath}/assets/icons/courses/ic-courses-certificates.svg`}
            />
          </Box> */}

          {/* <CourseHoursSpent
            title="Hours spent"
            chart={{
              series: [
                {
                  name: 'Weekly',
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: 'Monthly',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Yearly',
                  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          /> */}

          {/* <Box
            sx={{
              gap: 3,
              display: 'grid',
              alignItems: 'flex-start',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
            }}
          >
            <CourseProgress
              title="Course progress"
              chart={{
                series: [
                  { label: 'To start', value: 45 },
                  { label: 'In progress', value: 25 },
                  { label: 'Completed', value: 20 },
                ],
              }}
            />

            <CourseContinue title="Continue course" list={_coursesContinue} />
          </Box> */}

          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
              height: { xs: 220, sm: 260, md: 280 }, // adjust height responsively
              backgroundImage: `url(${backgroundImageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              p: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={1}>
              Bulk Product Upload
            </Typography>

            <Typography variant="body1" mb={3} sx={{ maxWidth: 500 }}>
              Upload thousands of products at once using CSV or Excel files. Save time and manage
              your inventory efficiently.
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                size="medium"
                sx={{
                  bgcolor: '#22c55e',
                  '&:hover': { bgcolor: '#16a34a' },
                  textTransform: 'none',
                }}
                startIcon={
                  <Box
                    component="img"
                    src={uploadIconSrc}
                    alt="Upload"
                    sx={{ width: 16, height: 16 }}
                  />
                }
              >
                Start Upload
              </Button>

              <Button
                variant="outlined"
                size="medium"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#ddd',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  textTransform: 'none',
                }}
                startIcon={
                  <Box
                    component="img"
                    src={downloadIconSrc}
                    alt="Download"
                    sx={{ width: 16, height: 16 }}
                  />
                }
              >
                Download Template
              </Button>
            </Box>
          </Box>

          {/* <CourseFeatured title="Featured course" list={_coursesFeatured} /> */}
          <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2 }}>
            <Grid container spacing={3}>
              {/* Left section */}
              <Grid item xs={12} md={8}>
                {/* Header */}
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Upload Your Products
                </Typography>

                {/* Dropzone */}
                <Box
                  sx={{
                    border: '1px dashed #ccc',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    mb: 3,
                  }}
                >
                  <Box component="img" src={uploadCloudIcon} alt="Upload" sx={{ mb: 1 }} />
                  <Typography variant="subtitle1" fontWeight={500}>
                    Drop your files here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    or click to browse
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    Supports CSV, XLSX files up to 50MB
                  </Typography>
                </Box>

                {/* CSV and Excel upload cards */}
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box component="img" src={csvIcon} alt="CSV" sx={{ mt: 0.5 }} />
                      <Box>
                        <Typography fontWeight={600}>CSV Upload</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Upload comma-separated values file with product data
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box component="img" src={excelIcon} alt="Excel" sx={{ mt: 0.5 }} />
                      <Box>
                        <Typography fontWeight={600}>Excel Upload</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Upload Excel file (.xlsx) with product information
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Email Upload Option */}
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography fontWeight={600} mb={1}>
                    <Box
                      component="img"
                      src={emailIcon}
                      alt="Email"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />{' '}
                    Email Upload Option
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Send your files directly to our upload email:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      value="upload@vendorhub.com"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Button variant="outlined" size="small">
                      Copy
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Right section */}
              <Grid item xs={12} md={4} display="flex" flexDirection="column" gap={3}>
                {/* Download Templates */}
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    <Box
                      component="img"
                      src={downloadIcon}
                      alt="Download"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />{' '}
                    Download Templates
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: '#000',
                      color: '#fff',
                      mb: 1,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#111' },
                    }}
                    startIcon={<Box component="img" src={csvtemp} sx={{}} />}
                  >
                    CSV Template
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: '#22c55e',
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#16a34a' },
                    }}
                    startIcon={<Box component="img" src={exceltemp} sx={{}} />}
                  >
                    Excel Template
                  </Button>
                </Box>

                {/* Image Guidelines */}
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    <Box
                      component="img"
                      src={imageIcon}
                      alt="Image"
                      sx={{ mr: 1, verticalAlign: 'middle' }}
                    />{' '}
                    Image Guidelines
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" mb={1}>
                      Use SKU-based naming: SKU_1.jpg
                    </Typography>
                    <Typography component="li" variant="body2" mb={1}>
                      Maximum file size: 5MB
                    </Typography>
                    <Typography component="li" variant="body2" mb={1}>
                      Formats: JPG, PNG, WebP
                    </Typography>
                    <Typography component="li" variant="body2">
                      Minimum resolution: 800x800px
                    </Typography>
                  </Box>
                </Box>

                {/* Upload Stats */}
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    Upload Stats
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="text.secondary">Today</Typography>
                    <Typography fontWeight={600}>1,247</Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography color="text.secondary">This Week</Typography>
                    <Typography fontWeight={600}>8,932</Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography color="text.secondary">Success Rate</Typography>
                    <Typography fontWeight={600} color="#22c55e">
                      98.5%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'column',
            px: { xs: 2, sm: 3, xl: 5 },
            pt: { lg: 8, xl: 10 },
            pb: { xs: 8, xl: 10 },
            flexShrink: { lg: 0 },
            gap: { xs: 3, lg: 5, xl: 8 },
            maxWidth: { lg: 320, xl: 360 },
            bgcolor: { lg: 'background.neutral' },
            [`& .${cardClasses.root}`]: {
              p: { xs: 3, lg: 0 },
              boxShadow: { lg: 'none' },
              bgcolor: { lg: 'transparent' },
            },
          }}
        >
          <CourseMyAccount />

          <CourseMyStrength
            title="Strength"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [{ data: [80, 50, 30, 40, 100, 20] }],
            }}
          />

          <CourseReminders title="Reminders" list={_coursesReminder} />
        </Box> */}
      </Box>
    </DashboardContent>
  );
}
