import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Card,
  List,
  Avatar,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import fileIcon from '../../../../assets/images/fileIcon.png';
import playIcon from '../../../../assets/images/playIcon.png';
import downloadIcon from '../../../../assets/images/downloadIcon.png';
import productBanner from '../../../../assets/images/ProductBanner.jpg';
import numberIcon123 from '../../../../assets/images/numberIcon123.png';
import greenPlayIcon from '../../../../assets/images/greenPlayIcon.png';
import bulkUploadIcon from '../../../../assets/images/bulkUploadIcon.png';
import bulkUploadThumbnail from '../../../../assets/images/bulkUploadThumbnail.png';
import singleUploadThumbnail from '../../../../assets/images/singleUploadThumbnail.png';

// ----------------------------------------------------------------------

export function OverviewCourseView() {
  return (
    <DashboardContent sx={{ p: 3 }} maxWidth={false} disablePadding>
      <CustomBreadcrumbs
        heading="How To Upload Product"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.tour.root },
          { name: 'How To Upload Product' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box>
        {/* Banner Section */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 180, sm: 220, md: 280 },
            borderRadius: 1,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <img
            src={productBanner}
            alt="Product Upload Center"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              color: 'common.white',
              textAlign: 'left',
              p: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Welcome to Product Upload Center
            </Typography>
            <Typography variant="body1">
              Choose your preferred method to add products to your store
            </Typography>
          </Box>
        </Box>

        {/* Upload Options Section (the two cards) */}
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Top content centered */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'success.light',
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="success.main">
                    +
                  </Typography>
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Single Product Upload
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Add one product at a time with detailed information
                </Typography>
              </Box>

              {/* Bottom content - unchanged */}
              <Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24, fontSize: 14 }}>
                        1
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Basic Information" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24, fontSize: 14 }}>
                        2
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Product Images" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24, fontSize: 14 }}>
                        3
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Pricing & Inventory" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24, fontSize: 14 }}>
                        4
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Shipping Details" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24, fontSize: 14 }}>
                        5
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Review & Publish" />
                  </ListItem>
                </List>
                <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                  Start Single Upload
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Top Centered Content */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    width: 64,
                    height: 64,
                    mb: 2,
                  }}
                >
                  <img src={bulkUploadIcon} alt="Bulk Upload Icon" style={{ bgcolor: 'pink' }} />
                </Avatar>

                <Typography variant="h6" gutterBottom>
                  Bulk Upload
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  Upload multiple products using CSV or Excel files
                </Typography>
              </Box>

              {/* List (still left-aligned) */}
              <Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Typography color="error.main">📄</Typography>
                    </ListItemIcon>
                    <ListItemText primary="CSV Format Support" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Typography color="error.main">📑</Typography>
                    </ListItemIcon>
                    <ListItemText primary="Excel (XLSX) Support" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Typography color="error.main">🚀</Typography>
                    </ListItemIcon>
                    <ListItemText primary="Upload up to 1000 products" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Typography color="error.main">⏱️</Typography>
                    </ListItemIcon>
                    <ListItemText primary="Process in minutes" />
                  </ListItem>
                </List>
              </Box>

              <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
                Start Bulk Upload
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} mb={4}>
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  textAlign: 'left',
                  mb: 3,
                }}
              >
                <Typography variant="h6">Upload Instructions</Typography>
              </Box>

              <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={numberIcon123} sx={{ width: 24, height: 24, mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 600 }}>
                      Single Product Upload Steps
                    </Typography>
                  </Box>

                  <List disablePadding>
                    {[
                      {
                        primary: 'Step 1: Basic Information',
                        secondary: 'Enter product name, description, category, and brand details',
                      },
                      {
                        primary: 'Step 2: Product Images',
                        secondary: 'Upload high-quality images (min 800x800px, max 5MB each)',
                      },
                      {
                        primary: 'Step 3: Pricing & Inventory',
                        secondary: 'Set price, discount, SKU, and stock quantity',
                      },
                      {
                        primary: 'Step 4: Shipping Details',
                        secondary: 'Configure weight, dimensions, and shipping options',
                      },
                      {
                        primary: 'Step 5: Review & Publish',
                        secondary: 'Preview your product and publish to store',
                      },
                    ].map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          alignItems: 'flex-start',
                          pl: 2,
                          borderLeft: '3px solid',
                          borderColor: 'success.main',
                          mb: 1,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, color: 'black' }}
                            >
                              {item.primary}
                            </Typography>
                          }
                          secondary={item.secondary}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={downloadIcon} sx={{ width: 24, height: 24, mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 600 }}>
                      Bulk Upload Process
                    </Typography>
                  </Box>

                  <List disablePadding>
                    <ListItem
                      sx={{
                        pl: 2,
                        borderLeft: '3px solid',
                        borderColor: 'error.main',
                        mb: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'black' }}>
                            Download Template
                          </Typography>
                        }
                        secondary="Get the CSV/Excel template with required columns"
                      />
                      <Box display="flex" gap={1} mt={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <Box
                              component="img"
                              src={fileIcon}
                              alt="CSV Icon"
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                        >
                          CSV Template
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <Box
                              component="img"
                              src={fileIcon}
                              alt="Excel Icon"
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                        >
                          Excel Template
                        </Button>
                      </Box>
                    </ListItem>

                    {[
                      {
                        primary: 'Fill Product Data',
                        secondary: 'Complete all required fields in the template',
                      },
                      {
                        primary: 'Upload File',
                        secondary: 'Select and upload your completed file (max 10MB)',
                      },
                      {
                        primary: 'Validation & Processing',
                        secondary: 'System validates data and processes products',
                      },
                      {
                        primary: 'Review Results',
                        secondary: 'Check upload status and fix any errors',
                      },
                    ].map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          pl: 2,
                          borderLeft: '3px solid',
                          borderColor: 'error.main',
                          mb: 1,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, color: 'black' }}
                            >
                              {item.primary}
                            </Typography>
                          }
                          secondary={item.secondary}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Box p={3} bgcolor="#fff" borderRadius={2}>
          {/* Header */}
          <Box display="flex" alignItems="center" mb={3}>
            <Box
              component="img"
              src={playIcon}
              alt="Play Icon"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Video Tutorials
            </Typography>
          </Box>

          {/* Thumbnails grid */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box p={2} bgcolor="#f9f9f9" borderRadius={2}>
                <Box
                  component="img"
                  src={singleUploadThumbnail}
                  alt="Single Product Upload"
                  sx={{ width: '100%', borderRadius: 2 }}
                />

                <Typography mt={2} variant="subtitle1" fontWeight={600} align="center">
                  Single Product Upload
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Learn how to add products one by one
                </Typography>

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 2,
                      bgcolor: '#22c55e', // green button
                      '&:hover': { bgcolor: '#16a34a' },
                      textTransform: 'none',
                    }}
                    startIcon={
                      <Box
                        component="img"
                        src={greenPlayIcon}
                        alt="Play"
                        sx={{ width: 16, height: 16 }}
                      />
                    }
                  >
                    Watch Tutorial
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={2} bgcolor="#f9f9f9" borderRadius={2}>
                <Box
                  component="img"
                  src={bulkUploadThumbnail}
                  alt="Bulk CSV Upload"
                  sx={{ width: '100%', borderRadius: 2 }}
                />

                <Typography mt={2} variant="subtitle1" fontWeight={600} align="center">
                  Bulk CSV Upload
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Master bulk uploading with CSV files
                </Typography>

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    align="center"
                    size="small"
                    sx={{
                      mt: 2,
                      bgcolor: '#000', // black button
                      '&:hover': { bgcolor: '#111' },
                      textTransform: 'none',
                    }}
                    startIcon={
                      <Box
                        component="img"
                        src={greenPlayIcon}
                        alt="Play"
                        sx={{ width: 16, height: 16 }}
                        align="center"
                      />
                    }
                  >
                    Watch Tutorial
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Box
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Hi, Frankie 👋
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >{`Let's learn something new today!`}</Typography>
          </Box>

          <Box
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
          </Box>

          <CourseHoursSpent
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
          />

          <Box
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
          </Box>

          <CourseFeatured title="Featured course" list={_coursesFeatured} />
        </Box>

        <Box
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
        </Box>
      </Box> */}
    </DashboardContent>
  );
}
