import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// type

import { TaskType } from "@/types/types";

export interface taskInterface {
  task: TaskType[];
}


const initialState: taskInterface = {
  task: [],
}


// fetch

export const fetchAllTasks = createAsyncThunk(
  'task/fetchAllTasks',
  async () => {
    try {

      const responce = await fetch(`api/task`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!responce.ok) {
        return new Error('Failed to fetch Task');
      }

      const data = await responce.json();
      return data;

    } catch (error: Error | unknown) {
      console.log(error)
    }
  }
)




const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.task = [];
      console.log('loading...')
    })

    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.task = action.payload;
    })

    builder.addCase(fetchAllTasks.rejected, (state) => {
      state.task = [];
      console.log('rejected...')
    })

  }
})


export default taskSlice



