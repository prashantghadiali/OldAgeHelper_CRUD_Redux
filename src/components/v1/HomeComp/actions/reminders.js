import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from './types';

export const addReminder = (reminder) => ({
  type: ADD_REMINDER,
  payload: reminder,
});

export const updateReminder = (id, updatedReminder) => ({
  type: UPDATE_REMINDER,
  payload: { id, updatedReminder },
});

export const deleteReminder = (id, deleteReminder) => ({
  type: DELETE_REMINDER,
  payload:{ id, deleteReminder },
});