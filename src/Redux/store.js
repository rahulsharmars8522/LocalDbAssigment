import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducers/itemReducer';  // Combine your reducers here
import rootSaga from './Saga/itemSaga';        // Combine your sagas here

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Ensure middleware is passed as a callback
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
