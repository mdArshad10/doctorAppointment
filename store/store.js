import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from '@/lib/features/doctor/doctorSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      appointmentReducer: doctorReducer
    },
  });
};
