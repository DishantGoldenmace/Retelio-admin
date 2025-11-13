import { useState } from 'react';

import {
  Box,
  Grid,
  Card,
  Stack,
  Rating,
  Button,
  Select,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';

const reviewTrendData = [
  { year: '2016', good: 40, neutral: 30, bad: 20 },
  { year: '2017', good: 60, neutral: 40, bad: 25 },
  { year: '2018', good: 50, neutral: 35, bad: 15 },
  { year: '2019', good: 45, neutral: 30, bad: 20 },
  { year: '2020', good: 48, neutral: 20, bad: 10 },
  { year: '2021', good: 50, neutral: 30, bad: 0 },
];

const topProducts = [
  { name: 'T shirt printed', reviews: 142, image: '/assets/images/products/product_1.jpg' },
  { name: 'Nike Funky Shoes', reviews: 98, image: '/assets/images/products/product_2.jpg' },
  { name: 'Ladies Jeans', reviews: 87, image: '/assets/images/products/product_3.jpg' },
];

const allReviews = [
  {
    id: 1,
    product: 'T shirt printed',
    customer: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent sound quality and comfortable fit. Highly recommended!',
    date: 'Dec 15, 2023',
    image: '/assets/images/tshirt.png',
    status: 'pending',
  },
  {
    id: 2,
    product: 'shirt ',
    customer: 'Sarah Johnson',
    rating: 2,
    comment: 'Excellent sound quality and comfortable fit. Highly recommended!',
    date: 'Dec 15, 2023',
    image: '/assets/images/tshirt.png',
    status: 'pending',
  },
  {
    id: 3,
    product: 'Ladies Jeans',
    customer: 'Mike Chen',
    rating: 4,
    comment: 'Good protection but a bit bulky. Overall satisfied with purchase.',
    date: 'Dec 15, 2023',
    image: '/assets/images/jeans.png',
    status: 'published',
  },
];

export function FileManagerView() {
  const [reviews, setReviews] = useState(allReviews);
  const [productFilter, setProductFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'published' } : r)));
  };

  const handleRemove = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReview(null);
  };

  const filteredReviews = allReviews.filter((review) => {
    const productMatch = productFilter === 'all' || review.product === productFilter;
    const ratingMatch = ratingFilter === 'all' || review.rating === ratingFilter;
    return productMatch && ratingMatch;
  });
  const filtered = reviews.filter((r) => {
    const productMatch = productFilter === 'all' || r.product === productFilter;
    const ratingMatch = ratingFilter === 'all' || r.rating === ratingFilter;
    return productMatch && ratingMatch;
  });

  const pendingReviews = filtered.filter((r) => r.status === 'pending');
  const publishedReviews = filtered.filter((r) => r.status === 'published');

  return (
    <DashboardContent>
      <Typography variant="h4" mb={3}>
        Customer Review Management
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Select
          size="small"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <MenuItem value="all">All Products</MenuItem>
          {[...new Set(reviews.map((r) => r.product))].map((prod) => (
            <MenuItem key={prod} value={prod}>
              {prod}
            </MenuItem>
          ))}
        </Select>

        <Select size="small" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
          <MenuItem value="all">All Ratings</MenuItem>
          {[5, 4, 3, 2, 1].map((star) => (
            <MenuItem key={star} value={star}>
              {star} Stars
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {/* Pending Reviews */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              Pending Reviews
            </Typography>

            {pendingReviews.length === 0 ? (
              <EmptyContent title="No Pending Reviews" />
            ) : (
              pendingReviews.map((r) => (
                <Box key={r.id} mb={2}>
                  <Typography fontWeight={600}>Product: &quot;{r.product}&quot;</Typography>
                  <Typography>
                    <Rating value={r.rating} readOnly size="small" /> - {r.date}
                  </Typography>
                  <Typography variant="body2">Comment: &quot;{r.comment}&quot;</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(r.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(r.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))
            )}
          </Card>
        </Grid>

        {/* Published Reviews */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              🔹 Published Reviews
            </Typography>

            {publishedReviews.length === 0 ? (
              <EmptyContent title="No Published Reviews" />
            ) : (
              publishedReviews.map((r) => (
                <Box key={r.id} mb={2}>
                  <Typography fontWeight={600}>Product: &quot;{r.product}&quot;</Typography>
                  <Typography>
                    <Rating value={r.rating} readOnly size="small" /> - {r.date}
                  </Typography>
                  {r.seller && <Typography variant="body2">Seller: {r.seller}</Typography>}
                  <Typography variant="body2">Comment: &quot;{r.comment}&quot;</Typography>
                  <Stack direction="row" mt={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(r.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))
            )}
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
