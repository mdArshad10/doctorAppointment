import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    {
      did: 1,
      startDate: "",
    },
  ],
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      console.log(action.payload);

      state.appointments.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
