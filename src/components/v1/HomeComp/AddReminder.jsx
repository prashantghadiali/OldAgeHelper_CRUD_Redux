import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addReminder } from './actions/reminders';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { toast } from 'react-toastify';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

const AddReminder = ({ addReminder }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(yesterday);
  const [selectedTime, setSelectedTime] = React.useState(todayStartOfTheDay);
//   const [time, setTime] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddReminder = () => {
    const dateTime = dayjs(`${selectedDate.format('YYYY-MM-DD')} ${selectedTime.format('HH:mm:ss')}`);
    addReminder({ text, time: dateTime.format('YYYY-MM-DD HH:mm:ss') });
    toast.success("Reminder Added Succesfully...")
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Reminder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Reminder</DialogTitle>
        
      <DialogContent>
        <TextField
          label="Activity"
          variant="outlined"
          style={{ marginBottom: 10, marginTop:10 }}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            disablePast
            renderInput={(params) => <TextField {...params} variant="outlined" style={{ marginBottom: 10 }} fullWidth />}
          />
          <TimePicker
            label="Time"
            value={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            disablePast
            renderInput={(params) => <TextField {...params} variant="outlined" style={{ marginBottom: 10 }} fullWidth />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddReminder}>Add</Button>
      </DialogActions>
    </Dialog>
        
    </div>
  );
};

export default connect(null, { addReminder })(AddReminder);
