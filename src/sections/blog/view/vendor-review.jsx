import dayjs from 'dayjs';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Paper, Checkbox, FormControlLabel } from '@mui/material';

const pickupSlots = ['Morning', 'Afternoon'];

const timeLabels = {
  Morning: '09:00 – 12:30',
  Afternoon: '16:00 – 19:30',
};

// -------------------------------------------------------------------

export function VendorReview({ history }) {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [rejectReason, setRejectReason] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleActionClick = (type) => {
    setActionType(type);
    setOpenModal(true);
  };

  // const handleConfirm = () => {
  //   // For now, just close the modal and log the action
  //   console.log('Confirmed:', actionType);
  //   setOpenModal(false);
  //   setActionType(null);

  //   // In future: Trigger API here based on actionType
  // };

  const [availability, setAvailability] = useState({});
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const nextThreeDays = Array.from({ length: 4 }, (_, i) =>
    dayjs().add(i, 'day').format('YYYY-MM-DD')
  );

  const toggleSlot = (date, slot) => {
    setAvailability((prev) => {
      const current = prev[date] || [];
      const exists = current.includes(slot);
      const updated = exists ? current.filter((s) => s !== slot) : [...current, slot];
      return { ...prev, [date]: updated };
    });
  };

  const handleConfirm = () => {
    const hasSelection = Object.values(availability).some((slots) => slots.length > 0);
    if (!hasSelection) {
      alert('Please select at least one pickup slot.');
      return;
    }
    console.log('Confirmed availability:', availability);
    // Send to backend...
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please specify the reason for rejection.');
      return;
    }
    console.log('Order rejected. Reason:', rejectReason);
    // Send to backend...
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid #E0E0E0',
          boxShadow: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Pickup Scheduling 
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Please select available pickup slots for the next 3 days.
        </Typography>

        <Stack spacing={2} mb={3}>
          {nextThreeDays.map((date) => (
            <Paper key={date} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {dayjs(date).format('dddd, MMM D')}
              </Typography>
              <Stack direction="row" spacing={3}>
                {pickupSlots.map((slot) => (
                  <FormControlLabel
                    key={slot}
                    control={
                      <Checkbox
                        checked={availability[date]?.includes(slot) || false}
                        onChange={() => toggleSlot(date, slot)}
                      />
                    }
                    label={`${slot} (${timeLabels[slot]})`}
                  />
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>

        {/* {!rejectMode ? (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm Order 
            </Button>
            <Button variant="contained" color="error" onClick={() => setRejectMode(true)}>
              Reject Order
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <TextField
              label="Please specify the reason for rejection"
              multiline
              required
              rows={3}
              fullWidth
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => setRejectMode(false)}>
                Back
              </Button>
              <Button variant="contained" color="error" onClick={handleReject}>
                Submit Rejection
              </Button>
            </Stack>
          </Stack>
        )} */}
      </Box>
      <Card>
        <CardHeader title="Vendor Review Section" />
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Tracking Info */}

          {/* Upload + File Name */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              component="label"
              sx={{ bgcolor: 'black', color: 'white', textTransform: 'none', px: 3 }}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>

            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                {selectedFile.name}
              </Typography>
            )}
          </Stack>

          {/* Rejection Reason */}
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Why are you rejecting the order?"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <Button
              variant="contained"
              sx={{ bgcolor: 'green', color: 'white' }}
              onClick={() => handleActionClick('accept')}
            >
              Accept Return
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: 'red', color: 'white' }}
              onClick={() => handleActionClick('reject')}
            >
              Reject Return
            </Button>
          </Stack>

          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>
              {actionType === 'accept' ? 'Accept Return?' : 'Reject Return?'}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to {actionType === 'accept' ? 'accept' : 'reject'} this
                return?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                color={actionType === 'accept' ? 'success' : 'error'}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
    </>
  );
}
