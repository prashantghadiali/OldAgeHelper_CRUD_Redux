import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from '../actions/types';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  reminders: [],
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      const newReminder = {
        id: uuidv4(),
        text: action.payload.text,
        time: action.payload.time,
      };

      return {
        ...state,
        reminders: [...state.reminders, newReminder],
      };

    case UPDATE_REMINDER:
      const updatedReminders = state.reminders.map((reminder) =>
        reminder.id === action.payload.id ? action.payload.updatedReminder : reminder
      );
      return {
        ...state,
        reminders: updatedReminders,
      };

    case DELETE_REMINDER:
      const filteredReminders = state.reminders.filter((reminder) => reminder.id !== action.payload.id);
      return {
        ...state,
        reminders: filteredReminders,
      };

    default:
      return state;
  }
};

export default reminderReducer;