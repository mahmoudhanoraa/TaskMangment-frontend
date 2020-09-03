import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tasksReducer from '../features/tasks/tasksSlice'
import modalReducer from '../features/tasks/TaskModalSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
    modal: modalReducer
  },
});
