import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './components/v1/HomeComp/reducers';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This is to disable the serializableCheck middleware if needed
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
