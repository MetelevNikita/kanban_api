import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// types

import type { UserType } from '@/types/types'


interface initialUser {
  user: UserType[]
}


const initialState: initialUser = {
  user: []
}


// fetch

export const fetchAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const responce = await fetch(`api/user`, {
      method: 'GET',
      headers: {
        'contentent-type': 'application/json'
      }
    })


    const data = await responce.json()
    console.log(data)
    return data
  }
)



//



const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.user = []
      console.log('loading...')
    })

    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.user = action.payload
    })

    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.user = []
      console.log('rejected...')
    })

  }

})


export default userSlice

