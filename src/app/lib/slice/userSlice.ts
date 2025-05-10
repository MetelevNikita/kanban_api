import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// types

import type { UserType } from '@/types/types'


interface initialUser {
  user: UserType[]
}


const initialState: initialUser = {
  user: []
}


// fetch single user

export const fetchSingleUser = createAsyncThunk(
  'user/getSingleUser',
  async (id: number | string) => {
    const responce = await fetch(`api/user/${id}`, {
      method: 'GET',
      headers: {
        'contentent-type': 'application/json'
      }
    })


    if(!responce.ok){
      return new Error('Failed to fetch single user');
    }

    const data = await responce.json()
    return data
  }
)

// fetch all users

export const fetchAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const responce = await fetch(`api/user`, {
      method: 'GET',
      headers: {
        'contentent-type': 'application/json'
      }
    })


    if (!responce.ok) {
      return new Error('Failed to fetch users');
    }


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

    // fetchSingleUser

    // builder.addCase(fetchSingleUser.pending, (state) => {
    //   state.user = []
    //   console.log('loading...')
    // })

    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.user = [action.payload]
    })

    // builder.addCase(fetchSingleUser.rejected, (state) => {
    //   state.user = []
    //   console.log('rejected...')
    // })

  }
    
})


export default userSlice

