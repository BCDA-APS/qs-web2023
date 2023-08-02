import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ServerCalls from "./serverCalls";

export const getPlans = createAsyncThunk('getPlans', async () => {
    const { data, error } = await ServerCalls.getPlans();
    if (error) {
      throw new Error('Failed to fetch plans'); // Throw an error if the request fails
    }
    return data;
});

export const getDevices = createAsyncThunk('getDevices', async () => {
    const { data, error } = await ServerCalls.getDevices();
    if (error) {
      throw new Error('Failed to fetch devices'); // Throw an error if the request fails
    }
    const newValue = Object.entries(data.devices.devices_allowed).map(([name, obj]) => ({ name, ...obj }));

    return {...data, deviceList: newValue};
});

export const getStatus = createAsyncThunk('getStatus', async () => {
    const { data, error } = await ServerCalls.getStatus();
    if (error) {
      throw new Error('Failed to fetch status'); // Throw an error if the request fails
    }
    return data;
});

export const getConsole = createAsyncThunk('getConsole', async () => {
    const { data, error } = await ServerCalls.getConsoleOutput();
    if (error) {
      throw new Error('Failed to fetch console'); // Throw an error if the request fails
    }
    return data;
});

export const getConsoleOutputUID = createAsyncThunk('getConsoleOutputUID', async () => {
    const { data, error } = await ServerCalls.getConsoleOutputUID();
    if (error) {
      throw new Error('Failed to fetch console uid'); // Throw an error if the request fails
    }
    return data;
});

export const getQueue = createAsyncThunk('getQueue', async () => {
    const { data, error } = await ServerCalls.getQueue();
    if (error) {
      throw new Error('Failed to fetch queue'); // Throw an error if the request fails
    }
    return data;
});

export const getHistory = createAsyncThunk('getHistory', async () => {
    const { data, error } = await ServerCalls.getHistory();
    if (error) {
      throw new Error('Failed to fetch history'); // Throw an error if the request fails
    }
    return data;
});

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        plans: [],
        devices: [],
        queue: [],
        consoleOutput: [],
        status: [],
        history: [],
    },
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getPlans.fulfilled, (state, action) => {
            state.plans = action.payload;
        });
        builder.addCase(getDevices.fulfilled, (state, action) => {
            state.devices = action.payload;
        });
        builder.addCase(getConsole.fulfilled, (state, action) => {
            state.consoleOutput = action.payload;
        });
        builder.addCase(getStatus.fulfilled, (state, action) => {
            state.status = action.payload;
        });
        builder.addCase(getHistory.fulfilled, (state, action) => {
            state.history = action.payload;
        });
        builder.addCase(getQueue.fulfilled, (state, action) => {
            state.queue = action.payload;
        });
    }
});

export default serverSlice.reducer;