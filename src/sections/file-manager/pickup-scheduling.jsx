import dayjs from 'dayjs';
import { useState } from 'react';

import {
  Box,
  Paper,
  Stack,
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material';

const pickupSlots = ['Morning', 'Afternoon'];

const timeLabels = {
  Morning: '09:00 – 12:30',
  Afternoon: '16:00 – 19:30',
};

export function PickupScheduling() {
  const [availability, setAvailability] = useState({});
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const nextThreeDays = Array.from({ length: 3 }, (_, i) =>
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

      {!rejectMode ? (
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
      )}
    </Box>
  );
}
