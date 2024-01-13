import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteReminder, updateReminder } from './actions/reminders';
import UpdateReminder from './UpdateReminder';
import AddReminder from './AddReminder';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import { toast } from 'react-toastify';

const ReminderList = ({ reminders, deleteReminder, updateReminder }) => {
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [confirmationId, setConfirmationId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setConfirmationId(id);
  };

  const handleDelete = () => {
    if (confirmationId !== null) {
      toast.success('Reminder deleted successfully!');
      deleteReminder(confirmationId);
      setConfirmationId(null);
    }
  };

  useEffect(() => {
    // Check for reminders at regular intervals and show notifications
    const intervalId = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const checkReminders = () => {
    const currentTime = new Date();

    reminders.forEach((reminder) => {
      const reminderTime = new Date(reminder.time);

      if (currentTime >= reminderTime) {
        // Trigger notification for overdue reminders
        toast.info(`Reminder: ${reminder.text} start!`);
      }
    });
  };

  return (
    <>
      <div style={{ margin: 10, float: 'right' }}>
        <AddReminder />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell>{reminder.text}</TableCell>
                <TableCell>{reminder.time}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteConfirmation(reminder.id)}>Delete</Button>
                  <Button onClick={() => setSelectedReminder(reminder)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedReminder && (
          <UpdateReminder reminder={selectedReminder} onClose={() => setSelectedReminder(null)} />
        )}

        <ConfirmationDialog
          open={confirmationId !== null}
          onClose={() => setConfirmationId(null)}
          onConfirm={handleDelete(confirmationId)}
        />
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  reminders: state.reminders.reminders,
});

export default connect(mapStateToProps, { deleteReminder, updateReminder })(ReminderList);

