import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAppId: 10,
  appointments: [
    {
      id: 1,
      title: "General Checkup",
      start: "2025-03-01T10:00:00",
      end: "2025-03-01T11:00:00",
    },
    {
      id: 2,
      title: "Cardilogy Checkup",
      start: "2025-03-03T13:00:00",
      end: "2025-03-03T14:00:00",
    },
  ],
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.totalAppId = state.totalAppId + 1;
      state.appointments.push({
        id: state.totalAppId,
        ...action.payload,
      });
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (event) => event.id !== action.payload
      );
      console.log(state.appointments);
    },
    updateAppointment: (state, action) => {
      state.appointments = state.appointments.map((item) => {
        if (item.id == action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAppointment, deleteAppointment, updateAppointment } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
