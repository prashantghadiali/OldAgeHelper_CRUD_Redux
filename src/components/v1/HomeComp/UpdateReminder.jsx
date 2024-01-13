import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateReminder } from './actions/reminders';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const UpdateReminder = ({ reminder, updateReminder, onClose }) => {
  const [updatedText, setUpdatedText] = useState(reminder.text);
  const [selectedDate, setSelectedDate] = useState(dayjs(reminder.time));
  const [selectedTime, setSelectedTime] = useState(dayjs(reminder.time));

  const handleUpdate = () => {
    const dateTime = dayjs(`${selectedDate.format('YYYY-MM-DD')} ${selectedTime.format('HH:mm:ss')}`);
    updateReminder(reminder.id, { text: updatedText, time: dateTime.format('YYYY-MM-DD HH:mm:ss') });
    onClose();
    toast.success("Reminder Updated Succesfully...")
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update Reminder</DialogTitle>
      <DialogContent>
        <TextField
          label="Updated Activity"
          variant="outlined"
          style={{ marginBottom: 10, marginTop: 10 }}
          fullWidth
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Updated Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            disablePast
            renderInput={(params) => (
              <TextField {...params} variant="outlined" style={{ marginBottom: 10}} fullWidth />
            )}
          />
          <TimePicker
            label="Updated Time"
            value={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            disablePast
            renderInput={(params) => (
              <TextField {...params} variant="outlined" style={{ marginBottom: 10 }} fullWidth />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null, { updateReminder })(UpdateReminder);
